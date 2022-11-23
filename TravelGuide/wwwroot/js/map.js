let markers = [];

let names = [];
let descriptions = [];

fetch("https://localhost:7201/Main/GetJson")
    .then(response => response.json())
    .then(placemarks => {
        const map = new mapgl.Map('map', {
            center: [55.35266, 25.24382],
        zoom: 15,
        key: "d31240ac-6937-4994-9e2e-a9a3678b6807"
        });
        var group;
            
        const clusterer = new mapgl.Clusterer(map);
        
        const htmlMarker = document.createElement('div');
        htmlMarker.classList.add('marker');
        htmlMarker.innerText = 'HTML Marker 2';

        const markers = [
            {
                type: 'html',
                coordinates: [55.35266, 25.24382],
                html: '<div class="marker">HTML Marker 1</div>',
            },
            {
                type: 'html',
                coordinates: [55.27887, 25.21001],
                html: htmlMarker,
            },
            {
                type: 'webgl',
                coordinates: [55.55459, 25.156798],
            },
            {
                type: 'webgl',
                coordinates: [55.30771, 25.20314],
            },
        ];

        clusterer.load(markers);


        const marker = new mapgl.Marker(map, {
            type: "html",
            coordinates: [42.952454, 47.539158],
            html: '<div>123</div>',

           
        });

        

        let coords = [];

            /*var myIcon = DG.icon({
                iconUrl: '~/icons/Hotel.png',
                iconRetinaUrl: '~/icons/Hotel.png',
                iconSize: [38, 95],
                iconAnchor: [22, 94],
                popupAnchor: [-3, -76],
              
            });*/

            /*DG.marker([50.505, 30.57], { icon: myIcon }).addTo(map);*/

        //map.addIcon('newIconName', { url: 'icons/hotel.svg' });
        //const data = {
        //    type: 'FeatureCollection',
        //    features: [
        //        {
        //            type: 'Feature',
        //            properties: {},
        //            geometry: {
        //                type: 'Point',
        //                coordinates: map.getCenter(),
        //            },
        //        },
        //    ],
        //};


        //const source = new mapgl.GeoJsonSource(map, {
        //    data,
        //    attributes: {
        //        purpose: 'icon',
        //    },
        //});

        //const layer = {
        //    id: 'my-point-layer',
        //    filter: [
        //        'match',
        //        ['sourceAttr', 'purpose'],
        //        ['icon'],
        //        true,
        //        false,
        //    ],
        //    type: 'point',
        //    style: {
        //        iconImage: 'custom',
        //        iconWidth: 30,
        //        iconPriority: 1000
        //    },
        //};

        //map.on('styleload', () => {
        //    map.addIcon('custom', { url: 'https://docs.2gis.com/img/mapgl/point-red.svg' });
        //    map.addLayer(layer);
        //});

        for (let i = 0; i < placemarks.length; i++) {
            coords.push([placemarks[i].Longitude, placemarks[i].Latitude])
                
        }
        console.log(coords)
        

        coords.forEach((coord) => {
            const marker = new mapgl.Marker(map, {
                coordinates: coord,
            });
        });
            //console.log(coords) 

            //group = DG.featureGroup([markers]);
            //group.addTo(map);
            //group.on('click', function (e) {
            //    map.setView([e.latlng.lat, e.latlng.lng]);
            //});
            
            
              
            
    });

        





 

let menuList = document.querySelector(".menu__list");


let menuOn = document.querySelector(".menu__on")
let menuOff = document.querySelector(".menu__off")
let menuBtn = document.querySelector(".menu__btn");
let menu = document.querySelector(".menu");
let map = document.getElementById("map");

//menuBtn.addEventListener("click", function () {
//   if (menu.classList.contains("menu__on")) {
//       menu.classList.replace("menu__on", "menu__off")
//       map.style.width = '100vw'
//       menuBtn.style.left = '55px'

//    } else if (menu.classList.contains("menu__off")) {
//        menu.classList.replace("menu__off", "menu__on")
//       menuBtn.style.left = '23.5%'
//        map.style.width = '80vw'
//  }
//})

menuBtn.addEventListener("click", function () {
    console.log('click')
  if (menu.classList.contains("active")) {
      menu.classList.remove("active")
      
      menuBtn.style.left = '55px'

    } else  {
       menu.classList.add("active")
      menuBtn.style.left = '310px'
       
  }
})