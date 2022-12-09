const inputList = document.querySelectorAll(".form__field")
const labelList = document.querySelectorAll(".form__lab")
const inputTags = document.getElementsByTagName("input");
const textboxs = document.querySelectorAll(".textbox");


document.addEventListener("click", (e) => {
    textboxs.forEach(item => {
        let box = e.composedPath().includes(item);
        let i = parseInt(item.getAttribute("data-index"));
        if (!box && !inputTags[i].value) {
            labelList[i].classList.remove('form__lab__active');
        }
    });
});

for (let i = 0; i < inputList.length; i++) {
    inputList[i].addEventListener('click', function () {
        labelList[i].classList.add('form__lab__active');
        console.log('add');
    })
}