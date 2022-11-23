namespace TravelGuide.Models
{
    public class User
    {
        public int UserId { get; set; }
        public string Lastname { get; set; }
        public string Name { get; set; }
        public string FullName { get
            {
                return $"{Lastname} {Name}";
            } }
        public string Email { get; set; }
        public string Password { get; set; }
        public List<Review>? Reviews { get; set; }
    }
}
