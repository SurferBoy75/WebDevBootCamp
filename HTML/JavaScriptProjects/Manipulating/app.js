const allLinks = document.querySelectorAll('a');

// for (let link of allLinks) {
//     link.innerText = ' I AM A LINK!'
// }

for (let link of allLinks) {
    link.style.color = 'rgb(0, 108, 134)';
    link.style.textDecorationColor = 'magenta';
    link.style.textDecorationStyle = 'wavy';
}

// const newImg = document.createElement('img')
// newImg.src = 'https://images.unsplash.com/photo-1506038634487-60a69ae4b7b1?ixid=MXwxMjA3fDB8MHxzZWFyY2h8M3x8ZnJlZXxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=60'
// document.body.appendChild(newImg)
const container = document.querySelector('#container');

for (let i = 0; i < 100; i++) {
    const newButton = document.createElement('button');
    newButton.textContent = "Hey!";
    container.appendChild(newButton);
}

// https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png
