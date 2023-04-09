//combobox
const comboBox = document.querySelector('.combobox__title');
comboBox.addEventListener('click', () => {
    console.log("test")
})
console.log(comboBox.innerHTML)
const comboBoxList = document.querySelector(".combobox__list");

console.log(comboBoxList.outerHTML)
const comboBoxItems = document.querySelectorAll('.combobox__list__item');
const sort = document.getElementById("sort");


comboBox.addEventListener('click', function () {
    console.log("test")
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

const test = document.querySelector(".card__img");
test.addEventListener("click", function () {
    test.classList.toggle("test")
    console.log("test img");
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



