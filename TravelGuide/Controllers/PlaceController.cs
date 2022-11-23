using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using ShopGame.Models;
using System.Linq;
using System.Numerics;
using TravelGuide.Models;

namespace TravelGuide.Controllers
{
    public class PlaceController : Controller
    {
        private TravelGuideContext db;
        private Dictionary<string, string> placeTypes = new Dictionary<string, string>();
        // Количество игра на 1-ой странце
        private int pageSize = 4;
        private PlaceFilter _filter;
        private ILogger<PlaceController> logger;

        public PlaceController(TravelGuideContext context, PlaceFilter filter, ILogger<PlaceController> logger)
        {
            db = context;
            _filter = filter;
            TypesDictInitialize(placeTypes);
            this.logger = logger;
        }

        [HttpGet]
        public IActionResult ListPlaces(string type, int page = 1)
        {
            ViewData["PlaceType"] = placeTypes[type];
            var places = db.Placemarks.Where(x => x.Type == type);

            var viewModel = new ListItemViewModel
            {
                Placemarks = places
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToList(),
                PagingInfo = new PagingInfo
                {
                    CurrentPage = page,
                    ItemsPerPage = pageSize,
                    TotalItems = places.Count()
                },
                CurrentPlaceType = type,
                CurrentFilter = _filter
            };
            
            return View(viewModel);
        }

        [HttpPost]
        public IActionResult ListPlaces(string? sort, int[]? budget, int[]? stars, int rating, int page = 1)
        {
            string path = HttpContext.Request.Path;
            string type = path.Split('/').Last();
            var places = db.Placemarks.ToList();

            ViewData["PlaceType"] = placeTypes[type];
            places = BudgetFilter(places, budget);
            places = StarFilter(places, stars);
            places = SortPlace(places, sort);

            _filter.Rating.FilterValue = rating.ToString();

            places = places.Where(x => (x.Rating > rating) && (x.Type == type)).ToList();

            var viewModel = new ListItemViewModel
            {
                Placemarks = places
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToList(),
                PagingInfo = new PagingInfo
                {
                    CurrentPage = page,
                    ItemsPerPage = pageSize,
                    TotalItems = places.Count()
                },
                CurrentPlaceType = type,
                CurrentFilter = _filter
            };

            return View(viewModel);
        }

        public IActionResult ResetFilters(string type)
        {
            _filter.ResetFilters();
            return RedirectToAction("ListPlaces", new { type = type });
        }

        [HttpGet]
        public IActionResult Place(int id)
        {
            var place = db.Placemarks.Find(id);
            var reviews = db.Reviews.Where(r => r.PlacemarkId == id).ToList();
            var users = db.Users.ToList();
            var model = new PlaceViewModel() { Reviews = reviews, Placemark = place, Users = users };
            return View(model);
        }

        [HttpPost]
        public IActionResult Place(int rating, string text, int placeId)
        {
            AddRatingToDb(rating, text, placeId);
            return RedirectToAction("Place", "Main", new { id = placeId });

        }

        private List<Placemark> StarFilter(List<Placemark> oldPlaces, int[]? stars)
        {
            if (stars != null)
                foreach (var item in _filter.Stars)
                {
                    if (stars.Contains(int.Parse(item.FilterValue)))
                    {
                        item.IsCheckedOrSelected = true;
                    }
                    else
                    {
                        item.IsCheckedOrSelected = false;
                    }
                }
            var newPlaces = new List<Placemark>();
            if (stars?.Length == 0)
            {
                newPlaces.AddRange(oldPlaces);
            }
            for (int i = 0; i < stars?.Length; i++)
            {
                newPlaces.AddRange(oldPlaces.Where(x => x.Stars == stars[i]));
            }
            return newPlaces;
        }

        private List<Placemark> BudgetFilter(List<Placemark> oldPlaces, int[]? budget)
        {
            if(budget != null)
                foreach(var item in _filter.Budget)
                {
                    if (budget.Contains(int.Parse(item.FilterValue)))
                    {
                        item.IsCheckedOrSelected = true;
                    }
                    else
                    {
                        item.IsCheckedOrSelected = false;
                    }
                }

            var newPlaces = new List<Placemark>();
            if (budget?.Length == 0)
            {
                newPlaces.AddRange(oldPlaces);
            }
            for (int i = 0; i < budget?.Length; i++)
            {
                if (budget[i] > 11000)
                    newPlaces.AddRange(oldPlaces.Where(x => x.Price > 10000));
                else
                    newPlaces.AddRange(oldPlaces.Where(x => (x.Price < budget[i]) && (x.Price > budget[i] - 2000)));
            }
            return newPlaces;
        }

        private void AddRatingToDb(int rating, string text, int placeId)
        {
            if (User.Identity.IsAuthenticated)
            {
                User? user = db.Users.FirstOrDefault(u => u.Email == User.Identity.Name);
                var place = db.Placemarks.Find(placeId);
                if (user != null)
                {
                    DateTime now = DateTime.Now;
                    var review = new Review();
                    review.Text = text;
                    review.User = user;
                    review.Date = now;
                    review.Rating = rating;
                    review.Placemark = place;
                    db.Reviews.Add(review);
                    db.SaveChanges();
                }
            }
        }

        private List<Placemark> SortPlace(List<Placemark> places, string? sortValue)
        {
            switch (sortValue)
            {
                case "expensive":
                    return places.OrderByDescending(x => x.Price).ToList();
                case "cheap":
                    return places.OrderBy(x => x.Price).ToList();
                case "rating":
                    return places.OrderBy(x => x.Rating).ToList();
            }
            return places;

        }

        private void TypesDictInitialize(Dictionary<string, string> dict)
        {
            dict.Add("hotel", "Отель");
            dict.Add("attraction", "Достопримечательность");
            dict.Add("entertainment", "Развлечение");
            dict.Add("business", "Бизнес");
            dict.Add("catering", "Общепит");
        }

        

    }
}
