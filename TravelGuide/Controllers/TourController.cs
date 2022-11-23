using Microsoft.AspNetCore.Mvc;
using ShopGame.Models;

namespace TravelGuide.Controllers
{
    public class TourController : Controller
    {
        private TravelGuideContext db;
        public TourController(TravelGuideContext context)
        {
            db = context;
        }

        public IActionResult ListTours()
        {
            return View();
        }

        public IActionResult Tour(int tourId)
        {
            return View();
        }

        public IActionResult Route()
        {
            return View();
        }
        public IActionResult TouristPlaces()
        {
            return View();
        }
    }
}
