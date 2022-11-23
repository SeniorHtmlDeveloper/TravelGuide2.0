namespace TravelGuide.Models
{
    public class PlaceViewModel
    {
        public Placemark Placemark { get; set; }
        public IEnumerable<Review> Reviews { get; set; }
        public IEnumerable<User> Users { get; set; }
    }
}
