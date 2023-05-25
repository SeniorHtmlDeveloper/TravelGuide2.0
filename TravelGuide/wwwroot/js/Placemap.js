let loc = document.querySelector(".loc");
console.log(loc.getAttribute("data-place-longitude"))
let longitude = parseFloat(loc.getAttribute("data-place-longitude").replace(",", "."));
let latitude = parseFloat(loc.getAttribute("data-place-latitude").replace(",", "."));

const map = new mapgl.Map('map', {
    center: [longitude, latitude],
    zoom: 17,
    key: "bd639b66-3cf2-4ed6-91a1-48f5d7d6bee1",
    zoomControl: 'bottomLeft',
    disableZoomOnScroll: true,
});

let marker = new mapgl.Marker(map, {
    coordinates: [longitude, latitude],

});

const directions = new mapgl.Directions(map, {
    directionsApiKey: 'bd639b66-3cf2-4ed6-91a1-48f5d7d6bee1',
});

const exit = new mapgl.Control(map, '<button style="font-size: 20px; font-weight: 600; font-family: Arial; background: transparent; cursor: pointer; " >X</button>', {
    position: 'topRight',

});

exit
    .getContainer()
    .querySelector('button')
    .addEventListener('click', () => {
        directions.clear();
        map.setCenter([longitude, latitude]);
        marker.destroy();
        circle.destroy();
        map.setZoom(17);
        marker = new mapgl.Marker(map, {
            coordinates: [longitude, latitude],

        });
    });


// построение маршрута
const controlContent = `
                <div class="buttonRoot" id="find-me">
                    <button class="button">
                        <svg  
                            xmlns="http://www.w3.org/2000/svg"
                            width="37"
                            height="37"
                            cursor="pointer"
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
    const center = [(pos.coords.longitude + longitude) / 2, (pos.coords.latitude + latitude) / 2];

    status.textContent = '';
    if (circle) {
        circle.destroy();
    }

    circle = new mapgl.CircleMarker(map, {
        coordinates: [pos.coords.longitude, pos.coords.latitude],
        radius: 14,
        color: '#0088ff',
        strokeWidth: 4,
        strokeColor: '#ffffff',
        stroke2Width: 6,
        stroke2Color: '#0088ff55',
    });
    map.setCenter(center);
    map.setZoom(13);
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
        status.textContent = 'LocatingЕ';
        navigator.geolocation.getCurrentPosition(success, error);
    }
}

control
    .getContainer()
    .querySelector('#find-me')
    .addEventListener('click', geoFindMe);
