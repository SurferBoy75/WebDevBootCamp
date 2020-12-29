const title = document.querySelector('h1');
const clicker = document.querySelector('#colorChg');

const genScale = range => (Math.floor(Math.random() * range) + 1)

const changeColor = () => {
    title.classList.remove('lightText');
    let rgb = [genScale(255), genScale(255), genScale(255)];
    let newColor = `rgb(${rgb})`;
    document.body.style.backgroundColor = newColor;
    title.innerText = newColor;
    if (rgb.reduce((lightFactor, el) => (lightFactor + el)) <= 200) {
        title.classList.add('lightText')
    }
}

clicker.addEventListener('click', changeColor);