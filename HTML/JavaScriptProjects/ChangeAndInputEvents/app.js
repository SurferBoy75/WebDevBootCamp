const input = document.querySelector('input');
const h1 = document.querySelector('h1');

// input.addEventListener('change', function (e) {
//     h1.innerText = "Welcome";
// })

input.addEventListener('input', function (e) {
    h1.innerText = input.value;
    // console.log('INPUT EVENT!');
    // console.log(e);
    if (h1.innerText === '') {
        h1.innerText = 'Type Below';
    }
})
