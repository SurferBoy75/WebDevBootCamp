let maximum = parseInt(prompt("Enter your maximum number!"));

while (!maximum) {
    maximum = parseInt(prompt(`${maximum}: Please... enter an ACTUAL number, dumb ass!`));
}

const targetNumber = Math.floor(Math.random() * maximum) + 1;
// console.log(targetNumber);

let guess = prompt('Enter your first guess...');
let attempts = 1;

while (parseInt(guess) !== targetNumber) {
    if (guess === 'Q') break;
    attempts++;
    if (guess > targetNumber) {
        guess = prompt('Too High!!...');
    } else {
        guess = prompt('Too Low!!...');
    }
}
if (guess === 'Q') {
    console.log('You PUSSY!!');
} else {
    console.log(`You Got It!! it took you ${attempts} guesses`);
}
