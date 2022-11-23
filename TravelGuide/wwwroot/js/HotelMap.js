




let mapBtns = document.querySelectorAll(".card__about__map");
let mapDiv = document.getElementById("map");
let blur = document.getElementById("blur");

mapBtns.forEach(item => {
    item.addEventListener("click", () => {
        let longitude = parseFloat(item.getAttribute("data-placemark-longitude").replace(",", "."));
        let latitude = parseFloat(item.getAttribute("data-placemark-latitude").replace(",", "."));

        mapDiv.style.visibility = "visible";
        blur.style.visibility = "visible";

        const map = new mapgl.Map('map', {
            center: [longitude, latitude],
            zoom: 17,
            key: "d31240ac-6937-4994-9e2e-a9a3678b6807"
        });
        const marker = new mapgl.Marker(map, {
            coordinates: [longitude, latitude],
        
        });
    });
});



function rangeOnload() {
    console.log("onload")
    const target = document.getElementById("rating");
    const min = target.min
    const max = target.max
    const val = target.value

    target.style.backgroundSize = (val - min) * 100 / (max - min) + '% 100%'
}

function handleInputChange() {
    const target = document.getElementById("rating");
    const min = target.min
    const max = target.max
    const val = target.value

    target.style.backgroundSize = (val - min) * 100 / (max - min) + '% 100%'
}
document.addEventListener("DOMContentLoaded", rangeOnload);


const comboBox = document.querySelector('.combobox__title');

comboBox.addEventListener('click', function () {
    document.querySelector(".combobox__list").classList.toggle('active')

});