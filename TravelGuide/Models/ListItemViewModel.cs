namespace TravelGuide.Models
{
    public class ListItemViewModel
    {
        public List<Placemark> Placemarks { get; set; }
        public PagingInfo PagingInfo { get; set; }
        public string CurrentPlaceType { get; set; }
        public PlaceFilter CurrentFilter { get; set; }
    }
}
