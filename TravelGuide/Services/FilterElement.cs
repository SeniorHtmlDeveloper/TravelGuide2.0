namespace TravelGuide.Models
{
    public class FilterElement
    {
        public string FilterElementId { get; set; }
        public string FilterName { get; set; }
        public string FilterType { get; set; }
        public string FilterValue { get; set; }
        public string FilterText { get; set; }
        public bool IsCheckedOrSelected { get; set; }
    }
}
