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
			for (let i = 0; i < navLinks.length; i++) {
				navLinks[i].classList.add('nav__links__active');
			}
		}, 500)

	}
})