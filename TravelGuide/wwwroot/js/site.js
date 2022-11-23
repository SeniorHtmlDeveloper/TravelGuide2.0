let images = Array.from(document.querySelectorAll('.slider__img'));
const leftSlide = document.getElementById('left__slide');
const rightSlide = document.getElementById('right__slide');

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
	sliderList[sliderList.length - 1].style.marginRight = "1200px";
	sliderList[1].style.marginLeft = "1200px";
}

function SliderRight(sliderList) {
	leftSlide.setAttribute('disabled', true);
	rightSlide.setAttribute('disabled', true);
	sliderList[sliderList.length - 1].style.display = "none";
	ShiftList(sliderList, sliderList.length - 1);
	sliderList[1].style.cssText = "margin-left: 1200px;";
	sliderList[0].style.cssText = "margin-left: 0px; transition: margin-left .8s;";
	sliderList[sliderList.length - 1].style.cssText = "margin-right:1200px; transition: margin-right .8s;";
	ArrangeOrderSlider(sliderList);
	setTimeout(EnabledSliderButtons, 900);
}

function SlideLeft(sliderList) {
	leftSlide.setAttribute('disabled', true);
	rightSlide.setAttribute('disabled', true);
	sliderList[1].style.display = "none";
	ShiftList(sliderList, 1);
	sliderList[sliderList.length - 1].style.cssText = "margin-right:1200px;";
	sliderList[1].style.cssText = "margin-left: 1200px; transition: margin-left .8s;";
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



