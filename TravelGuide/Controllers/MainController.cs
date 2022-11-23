using Microsoft.AspNetCore.Mvc;
using ShopGame.Models;
using TravelGuide.Models;
using System.Text.Json;
using Microsoft.AspNetCore.Authorization;

namespace TravelGuide.Controllers
{
    public class MainController : Controller
    {
        private TravelGuideContext db;
        public MainController(TravelGuideContext context)
        {
            db = context;
            PlacemarksToJsonAsync(db.Placemarks);
        }

        [Authorize]
        public IActionResult Test()
        {
            return Content(User.Identity.Name);
        }

        public IActionResult Main()
        {
            var mainViewModel = new MainViewModel();
            var hotels = db.Placemarks.Where(x => x.Type == "hotel").Take(9).ToList();
            var attractions = db.Placemarks.Where(x => x.Type == "attraction").Take(4).ToList();
            mainViewModel.Hotels = hotels;
            mainViewModel.Attractions = attractions;
            return View(mainViewModel);
        }

        

        public IActionResult Map()
        {
            return View();
        }

        public IActionResult GetJson()
        {
            string rootDirectory = AppContext.BaseDirectory;
            string placemarksPath = rootDirectory.Substring(0, rootDirectory.IndexOf("bin")) + "wwwroot\\js\\json\\Placemarks.json";
            string fileType = "application/json";
            string fileName = "Placemarks.json";
            return PhysicalFile(placemarksPath, fileType, fileName);
        }

        

        

        private async void PlacemarksToJsonAsync(IEnumerable<Placemark> placemarks)
        {
            string rootDirectory = AppContext.BaseDirectory;
            string placemarksPath = rootDirectory.Substring(0, rootDirectory.IndexOf("bin")) + "wwwroot\\js\\json\\Placemarks.json";
            var info = new FileInfo(placemarksPath);
            if (info.Exists && info.Length == 0)
            {
                using (FileStream fileStream = new FileStream(placemarksPath, FileMode.OpenOrCreate))
                {
                    await JsonSerializer.SerializeAsync(fileStream, placemarks);
                }
            }
        }
    }
}
