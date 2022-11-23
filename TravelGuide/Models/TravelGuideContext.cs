using Microsoft.EntityFrameworkCore;
using TravelGuide.Models;

namespace ShopGame.Models
{
    public class TravelGuideContext : DbContext
    {
        public DbSet<Placemark> Placemarks { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Review> Reviews { get; set; }

        public TravelGuideContext(DbContextOptions<TravelGuideContext> options) : base(options)
        {
            Database.EnsureCreated();
        }

    }
}