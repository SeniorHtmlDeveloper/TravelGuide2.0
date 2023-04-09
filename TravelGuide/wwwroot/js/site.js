

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





