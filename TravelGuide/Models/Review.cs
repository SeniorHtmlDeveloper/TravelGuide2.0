namespace TravelGuide.Models
{
    public class Review
    {
        public int ReviewId { get; set; }
        public string Text { get; set; }
        public double Rating { get; set; }
        public DateTime? Date { get; set; }
        public int PlacemarkId { get; set; }
        public Placemark Placemark { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
    }
}
