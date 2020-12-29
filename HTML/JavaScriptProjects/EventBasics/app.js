const btn = document.querySelector('#v2');

btn.onclick = function () {
    console.log('YOU CLICKED ME 2');
    console.log('I HOPE IT WORKED!!');
}

function scream() {
    console.log("AAAGGGHHHHHH!!");
    console.log("STOP TOUCHING ME!");
}

btn.onmouseenter = scream;

document.querySelector('h1').onmouseenter = () => { console.log('You found the H1') }

const btn3 = document.querySelector('#v3');
btn3.addEventListener('click', () => {
    alert("CLICKED3!");
})

btn3.addEventListener('mouseup', () => {
    btn3.style.backgroundColor = 'black';
    btn3.style.color = 'white';
})

function twist() {
    console.log('TWIST');
}
function shout() {
    console.log('SHOUT');
}

const tasButton = document.querySelector('#tas');

// This doesn't work.. 
// tasButton.onclick = twist;
// tasButton.onclick = shout;

tasButton.addEventListener('click', twist, { once: true });
tasButton.addEventListener('click', shout);

const helloBtn = document.querySelector('#hello');
const byeBtn = document.querySelector('#goodbye');

helloBtn.addEventListener('click', () => { console.log('hello') });
byeBtn.addEventListener('click', () => { console.log('goodbye') });