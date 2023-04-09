
places = {
    hotel: [],
    attraction: [],
    entertainment: [],
    business: [],
    catering: [],
};

let popup = null;
let index = 0;

closePopup = () => popup?.destroy();

function OpenPopup(place) {

    popup?.destroy();

    popup = new mapgl.HtmlMarker(map, {
        coordinates: [place.Longitude - 0.015, place.Latitude + 0.042],
        html: `
            <div class="popup" style="background: #fff; cursor:pointer;">
                <div class="popup-content">
                    <p>${place.Name}</p>
                    <img src="${place.Images.split('||')[0]}" style="height: 300px;" />
                </div>
                <div class="popup-tip"></div>
            </div>
            `,
    });
}


function AddAllMarkers() {
    fetch("https://localhost:7201/Main/GetJson")
        .then(response => response.json())
        .then(placemarks => {
            placemarks.forEach(place => {
                places[place.Type].push(
                    new mapgl.HtmlMarker(map, {
                        coordinates: [place.Longitude, place.Latitude],
                        html: `<div class="marker" id="find-me">
                                        <?xml version="1.0" encoding="utf-8"?>
                                        <!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
                                        <svg width="40px"
                                            height="40px"
                                            viewBox="0 0 1024 1024"
                                            class="icon"
                                            version="1.1"
                                            xmlns="http://www.w3.org/2000/svg"><path d="M512 85.333333c-164.949333 0-298.666667 133.738667-298.666667 298.666667 0 164.949333 298.666667 554.666667 298.666667 554.666667s298.666667-389.717333 298.666667-554.666667c0-164.928-133.717333-298.666667-298.666667-298.666667z m0 448a149.333333 149.333333 0 1 1 0-298.666666 149.333333 149.333333 0 0 1 0 298.666666z" fill="${GetPlaceColor(place.Type)}" />
                                        </svg>
                                </div>
                                <p id="status"></p>`,
                    })
                );

                console.log(places[place.Type][places[place.Type].length - 1])

                places[place.Type][places[place.Type].length - 1]
                    .getContent()
                    .querySelector('#find-me')
                    .addEventListener('mouseover', () => OpenPopup(place));

                places[place.Type][places[place.Type].length - 1]
                    .getContent()
                    .querySelector('#find-me')
                    .addEventListener('mouseout', () => popup?.destroy());

            });
        });
}


   
function GetPlaceColor(type) {
    switch (type) {
        case "hotel":
            return "#FF0000";
        case "attraction":
            return "#0088ff";
        case "entertainment":
            return "#05ab1b";
        case "business":
            return "#008080";
        case "catering":
            return "#bf16e0";
    }
}

const map = new mapgl.Map('map', {
    center: [47.504771, 42.98283],
    zoom: 13,
    key: "fb8d0d9f-3bc8-4879-bed5-da64787286d7"
});

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
