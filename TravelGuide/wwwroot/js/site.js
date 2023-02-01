/*		burger		*/


let burger = document.querySelector('.burger');
let navLinks = document.querySelectorAll('.nav__links');



burger.addEventListener('click', function () {
	if (document.querySelector('.burger__block').classList.contains('burger__block__active')) {
		document.querySelector('.burger__block').classList.remove('burger__block__active');
		for (let i = 0; i < navLinks.length; i++) {
			navLinks[i].classList.remove('nav__links__active');
		}
	} else {
		document.querySelector('.burger__block').classList.add('burger__block__active')
		setTimeout(function () {
			for (let i = 0; i < navLinks.length; i++ ) {
				navLinks[i].classList.add('nav__links__active');
			}
		}, 500)
			
	}
})






/*		cheito cod		*/



let images = Array.from(document.querySelectorAll('.slider__img'));
const leftSlide = document.getElementById('left__slide');
const rightSlide = document.getElementById('right__slide');
let imgWidth = document.querySelector('.slider__img').getBoundingClientRect().width;
console.log(imgWidth)

ArrangePositionSlider(images);
ArrangeOrderSlider(images);
DisplaySliderObjects(images);

sliderInterval = setInterval(() => { SliderRight(images); }, 5000);


leftSlide.addEventListener("click", function () {
	clearInterval(sliderInterval)
	SlideLeft(images);
	sliderInterval = setInterval(() => { SliderRight(images); }, 5000);
});


rightSlide.addEventListener("click", function () {
	clearInterval(sliderInterval)
	SliderRight(images);
	sliderInterval = setInterval(() => { SliderRight(images); }, 5000);
});




function ArrangeOrderSlider(sliderList) {
	sliderList[sliderList.length - 1].style.order = 0;
	sliderList[0].style.order = 1;
	sliderList[1].style.order = 2;
}

function ArrangePositionSlider(sliderList) {
	sliderList[sliderList.length - 1].style.marginRight = (imgWidth*2).toString() + "px";
	sliderList[1].style.marginLeft = (imgWidth * 2).toString() + "px";
}

function SliderRight(sliderList) {
	leftSlide.setAttribute('disabled', true);
	rightSlide.setAttribute('disabled', true);
	sliderList[sliderList.length - 1].style.display = "none";
	ShiftList(sliderList, sliderList.length - 1);
	sliderList[1].style.cssText = "margin-left: " + (imgWidth * 2).toString() + "px;";
	sliderList[0].style.cssText = "margin-left: 0px; transition: margin-left .8s;";
	sliderList[sliderList.length - 1].style.cssText = "margin-right:" + (imgWidth * 2).toString() + "px" + "; transition: margin-right .8s;";
	ArrangeOrderSlider(sliderList);
	setTimeout(EnabledSliderButtons, 900);
}

function SlideLeft(sliderList) {
	leftSlide.setAttribute('disabled', true);
	rightSlide.setAttribute('disabled', true);
	sliderList[1].style.display = "none";
	ShiftList(sliderList, 1);
	sliderList[sliderList.length - 1].style.cssText = "margin-right: " + (imgWidth * 2).toString() + "px;";
	sliderList[1].style.cssText = "margin-left: " + (imgWidth * 2).toString() + "px" + "; transition: margin-left .8s;";
	sliderList[0].style.cssText = "margin-right: 0px; transition: margin-right .8s;";
	ArrangeOrderSlider(sliderList);
	setTimeout(EnabledSliderButtons, 900);
}

function DisplaySliderObjects(sliderList) {
	sliderList.forEach(item => item.style.display = "none");
	sliderList[sliderList.length - 1].style.display = "block";
	sliderList[0].style.display = "block";
	sliderList[1].style.display = "block";
}

function ShiftList(list, shift) {
	for (let i = 0; i < shift; i++)
		list.unshift(list.pop());
}

function EnabledSliderButtons() {
	leftSlide.removeAttribute('disabled');
	rightSlide.removeAttribute('disabled');
}


const map = new mapgl.Map('map', {
	center: [47.504771, 42.98283],
	zoom: 13,
	key: "d31240ac-6937-4994-9e2e-a9a3678b6807"
});


const curseList = document.querySelectorAll('.curse');
const desc = document.querySelector('.choose__desc');
const comm = document.querySelector('.choose__comm');



console.log(desc);


desc.addEventListener('click', function () {
	curseList[1].classList.remove('curse__active');
	curseList[0].classList.add('curse__active');
	document.querySelector('.hotel__comm').classList.remove('animation__comm');
	document.querySelector('.hotel__comm').classList.remove('active__comm');

	document.querySelector('.hotel__about').classList.add('animation');
	document.querySelector('.hotel__about').classList.add('active');
});


comm.addEventListener('click', function () {
	curseList[0].classList.remove('curse__active')
	curseList[1].classList.add('curse__active')
	document.querySelector('.hotel__about').classList.remove('animation');
	document.querySelector('.hotel__about').classList.remove('active');
	document.querySelector('.hotel__comm').classList.add('animation__comm');
	document.querySelector('.hotel__comm').classList.add('active__comm');

});




