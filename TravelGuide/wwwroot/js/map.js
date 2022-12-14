places = {
    hotel: [],
    attraction: [],
    entertainment: [],
    business: [],
    catering: [],
};


function AddAllMarkers() {
    fetch("https://localhost:7201/Main/GetJson")
        .then(response => response.json())
        .then(placemarks => {
            placemarks.forEach(place => {
                places[place.Type].push(
                    new mapgl.CircleMarker(map, {
                        coordinates: [place.Longitude, place.Latitude],
                        radius: 14,
                        color: GetPlaceColor(place.Type),
                        strokeWidth: 4,
                        strokeColor: '#ffffff',
                        stroke2Width: 6,
                        stroke2Color: GetPlaceColor(place.Type) + "55",
                        name: place.Name,
                    })
                );
            });
        });
}

const map = new mapgl.Map('map', {
    center: [47.504771, 42.98283],
    zoom: 13,
    key: "d31240ac-6937-4994-9e2e-a9a3678b6807"
});
        
function GetPlaceColor(type) {
    switch (type) {
        case "hotel":
            return "#c21515";
        case "attraction":
            return "#0088ff";
        case "entertainment":
            return "#05ab1b";
        case "business":
            return "#e5f018";
        case "catering":
            return "#bf16e0";
    }
}



AddAllMarkers();

 

let menuList = document.querySelector(".menu__list");


let menuOn = document.querySelector(".menu__on")
let menuOff = document.querySelector(".menu__off")
let menuBtn = document.querySelector(".menu__btn");
let menu = document.querySelector(".menu");

menuBtn.addEventListener("click", function () {
  if (menu.classList.contains("active")) {
      menu.classList.remove("active")
      
      menuBtn.style.left = '55px'

    } else  {
       menu.classList.add("active")
      menuBtn.style.left = '410px'
       
  }
})

//MENU
const placesBlock = document.querySelectorAll(".place__block");
const 

placesBlock.forEach(item => {
    item.addEventListener("click", () => {
        if (!item.classList.contains("active__block")) {

            item.classList.add("active__block");
            let type = item.getAttribute("data-type");
            for (let key in places) {
                if (key != type) {
                    console.log(places[key])
                    for (let i = 0; i < places[key].length; i++) {

                        places[key][i].destroy();
                    }
                }
            }
        } else {
            for (let key in places) {
                for (let i = 0; i < places[key].length; i++) {
                    places[key][i].destroy();
                }
                places[key] = [];
            }
            AddAllMarkers();
            item.classList.remove("active__block")
        }
        
        
    });
    
});

const myInput = document.querySelector(".menu__input");
const search = document.getElementById("search");
search.addEventListener("click", () => {
    for (let key in places) {

        for (let i = 0; i < places[key].length; i++) {
            
            if (myInput.value == places[key][i].options.name) {
                for (let k = 0; k < places[key].length; k++) {
                    if (places[key][k].options.name != myInput.value) {
                        places[key][k].destroy();
                    }
                        
                }
                break     
            } else {
                console.log(false)
                break
            } 
        }
        break
        
       
    }
});

//hotelCheckbox.addEventListener("click", () => {
//    let type = hotelCheckbox.value;
//    for (let key in places) {
//        if (key != type) {
//            console.log(places[key])
//            for (let i = 0; i < places[key].length; i++) {
//                console.log(places[key][i])
//                places[key][i].destroy();
//            }
//        }
//    }
//});