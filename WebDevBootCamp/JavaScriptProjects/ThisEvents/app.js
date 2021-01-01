const buttons = document.querySelectorAll('button');
const headers = document.querySelectorAll('h1');

const genScale = range => (Math.floor(Math.random() * range) + 1)

const changeColor = () => {
    // title.classList.remove('lightText');
    let rgb = [genScale(255), genScale(255), genScale(255)];
    return `rgb(${rgb})`;
    // document.body.style.backgroundColor = newColor;
    // title.innerText = newColor;
    // if (rgb.reduce((lightFactor, el) => (lightFactor + el)) <= 200) {
    //     title.classList.add('lightText')
}

const colorize = function () {
    this.style.backgroundColor = changeColor();
    this.style.color = changeColor();
}


for (let butt of buttons) { butt.addEventListener('click', colorize) }

for (let head of headers) { head.addEventListener('click', colorize) }