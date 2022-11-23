namespace TravelGuide.Models
{
    public class Placemark
    {
        public int PlacemarkId { get; set; }
        public string Name { get; set; }
        public double Longitude { get; set; }
        public double Latitude { get; set; }
        public string? Description { get; set; }
        public string Type { get; set; }
        public string? WorkSchedule { get; set; }
        public string? Images { get; set; }
        public double? Rating { get; set; }
        public decimal? Price { get; set; }
        public byte? Stars { get; set; }
        public List<Review>? Reviews { get; set; }  
        public string? Number { get; set; }
    }
}
