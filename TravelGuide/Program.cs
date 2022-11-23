using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.EntityFrameworkCore;
using ShopGame.Models;
using TravelGuide.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
string connection = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<TravelGuideContext>(options => options.UseSqlServer(connection));
builder.Services.AddControllersWithViews();
builder.Services.AddSingleton<PlaceFilter>();
builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
    .AddCookie(option =>
    {
        option.LoginPath = new Microsoft.AspNetCore.Http.PathString("/Account/Login");
    });

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();
app.UseAuthentication();

// Main/ListItems/{type}
app.MapControllerRoute(
    name: "ListItemsTypeRoute",
    pattern: "{controller=Main}/{action=ListItems}/{type}");

// Main/ListItems/{type}/{page}
app.MapControllerRoute(
    name: "ListItemsTypeRoute",
    pattern: "{controller=Main}/{action=ListItems}/{type}/{page}");

// Main/Place/{PlaceId}
app.MapControllerRoute(
    name: "PlaceRoute",
    pattern: "{controller=Main}/{action=Place}/{PlaceId}");

// /
app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Main}/{action=Main}");




app.Run();
