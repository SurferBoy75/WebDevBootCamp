const button = document.querySelector('#changeColor');
const container = document.querySelector('#container');

button.addEventListener('click', function (e) {
    container.style.backgroundColor = changeColor();
    e.stopPropagation();
})

container.addEventListener('click', function (e) {
    container.classList.toggle('hide');
})

const changeColor = () => {
    let rgb = [genScale(255), genScale(255), genScale(255)];
    return `rgb(${rgb})`;
}

const genScale = range => (Math.floor(Math.random() * range) + 1)
