let mapBtns = document.querySelectorAll(".card__about__map");
let mapDiv = document.getElementById("map");
let blur = document.getElementById("blur");
let longitude = 0;
let latitude = 0;


const map = new mapgl.Map('map', {
    center: [0, 0],
    zoom: 17,
    key: "d31240ac-6937-4994-9e2e-a9a3678b6807",
    zoomControl: 'bottomLeft'
});

const directions = new mapgl.Directions(map, {
    directionsApiKey: 'd31240ac-6937-4994-9e2e-a9a3678b6807',
});

// построение маршрута
const controlContent = `
                <div class="buttonRoot" id="find-me">
                    <button class="button">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="32"
                            height="32"
                            viewBox="0 0 32 32"
                        >
                            <path
                                fill="currentColor"
                                d="M17.89 26.27l-2.7-9.46-9.46-2.7 18.92-6.76zm-5.62-12.38l4.54 1.3 1.3 4.54 3.24-9.08z"
                            />
                        </svg>
                    </button>
                </div>
                <p id="status"></p>
            `;

const control = new mapgl.Control(map, controlContent, {
    position: 'topLeft',
});

const status = control.getContainer().querySelector('#status');
let circle;

function success(pos) {
    const center = [pos.coords.longitude, pos.coords.latitude];

    status.textContent = '';
    if (circle) {
        circle.destroy();
    }

    circle = new mapgl.CircleMarker(map, {
        coordinates: center,
        radius: 14,
        color: '#0088ff',
        strokeWidth: 4,
        strokeColor: '#ffffff',
        stroke2Width: 6,
        stroke2Color: '#0088ff55',
    });
    map.setCenter(center);
    map.setZoom(14);
    console.log([longitude, latitude], [pos.coords.longitude, pos.coords.latitude])
    directions.carRoute({
        points: [
            [longitude, latitude],
            [pos.coords.longitude, pos.coords.latitude]
        ]
    });
}

function error() {
    status.textContent = 'Unable to retrieve your location';
}

function geoFindMe() {
    if (!navigator.geolocation) {
        status.textContent = 'Geolocation is not supported by your browser';
    } else {
        status.textContent = 'Locating…';
        navigator.geolocation.getCurrentPosition(success, error);
    }
}

control
    .getContainer()
    .querySelector('#find-me')
    .addEventListener('click', geoFindMe);


// кнопка выход
const exit = new mapgl.Control(map, '<button>Exit</button>', {
    position: 'topRight',
});

exit
    .getContainer()
    .querySelector('button')
    .addEventListener('click', () => {
        mapDiv.style.visibility = "hidden";
        blur.style.visibility = "hidden";
    });



// на карте
mapBtns.forEach(item => {
    item.addEventListener("click", () => {
        longitude = parseFloat(item.getAttribute("data-placemark-longitude").replace(",", "."));
        latitude = parseFloat(item.getAttribute("data-placemark-latitude").replace(",", "."));

        directions.clear();

        mapDiv.style.visibility = "visible";
        blur.style.visibility = "visible";

        map.setCenter([longitude, latitude]);
        map.setZoom(17);

        let marker = new mapgl.Marker(map, {
            coordinates: [longitude, latitude],
        
        });
    });
});


// Range
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



//combobox
const comboBox = document.querySelector('.combobox__title');
const comboBoxList = document.querySelector(".combobox__list");
const comboBoxItems = document.querySelectorAll('.combobox__list__item');
const sort = document.getElementById("sort");

comboBox.addEventListener('click', function () {
    comboBoxList.classList.toggle('active');

});

comboBoxItems.forEach(item => {
    item.addEventListener("click", () => {
        console.log(item.innerHTML)
        comboBoxList.classList.toggle('active');
        let sortView = item.getAttribute("data-value")
        sort.value = sortView;
        comboBox.innerHTML = item.innerHTML;
    });
});