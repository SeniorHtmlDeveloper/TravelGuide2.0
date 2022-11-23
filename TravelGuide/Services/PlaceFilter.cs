
namespace TravelGuide.Models
{
    public class PlaceFilter 
    {
        public PlaceFilter()
        {
            CreateFilters();
        }
        public FilterElement Sort { get; set; }
        public List<FilterElement> Budget { get; set; }
        public List<FilterElement> Stars { get; set; }
        public FilterElement Rating { get; set; }

        public void ResetFilters()
        {
            
            foreach(var filter in Budget)
                filter.IsCheckedOrSelected = false;
            foreach (var filter in Stars)
                filter.IsCheckedOrSelected = false;
            Rating.FilterValue = "0";
            Sort.IsCheckedOrSelected = false;
        }

        public void CreateFilters()
        {
            Sort = new FilterElement()
            {
                FilterElementId = "sort",
                FilterName = "sort",
                FilterType = "hidden",
                FilterValue = "",
                FilterText = "По рекомендации",
                IsCheckedOrSelected = false
            };
            Budget = new List<FilterElement>
            {
                new FilterElement()
                {
                    FilterElementId = "budget",
                    FilterName = "budget",
                    FilterType = "checkbox",
                    FilterValue = "2000",
                    FilterText = "до 2 000 ₽",
                    IsCheckedOrSelected = false
                },
                new FilterElement()
                {
                    FilterElementId = "budget",
                    FilterName = "budget",
                    FilterType = "checkbox",
                    FilterValue = "4000",
                    FilterText = "2 000 - 4 000 ₽",
                    IsCheckedOrSelected = false
                },
                new FilterElement()
                {
                    FilterElementId = "budget",
                    FilterName = "budget",
                    FilterType = "checkbox",
                    FilterValue = "6000",
                    FilterText = "4 000 - 6 000 ₽",
                    IsCheckedOrSelected = false
                },
                new FilterElement()
                {
                    FilterElementId = "budget",
                    FilterName = "budget",
                    FilterType = "checkbox",
                    FilterValue = "8000",
                    FilterText = "6 000 - 8 000 ₽",
                    IsCheckedOrSelected = false
                },
                new FilterElement()
                {
                    FilterElementId = "budget",
                    FilterName = "budget",
                    FilterType = "checkbox",
                    FilterValue = "11000",
                    FilterText = "8 000 - 11 000 ₽",
                    IsCheckedOrSelected = false
                },
                new FilterElement()
                {
                    FilterElementId = "budget",
                    FilterName = "budget",
                    FilterType = "checkbox",
                    FilterValue = "100000",
                    FilterText = "более 11 000 ₽",
                    IsCheckedOrSelected = false
                },
            };
            Stars = new List<FilterElement>();
            for (int i = 1; i <= 5; i++)
            {
                Stars.Add(new FilterElement()
                {
                    FilterElementId = "stars",
                    FilterName = "stars",
                    FilterType = "checkbox",
                    FilterValue = i.ToString(),
                    FilterText = i.ToString(),
                    IsCheckedOrSelected = false
                });
            }
            Rating = new FilterElement
            {
                FilterElementId = "rating",
                FilterName = "rating",
                FilterType = "range",
                FilterValue = "0",
                FilterText = "",
                IsCheckedOrSelected = false
            };

        }
    }
}
