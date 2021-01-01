// let userGuess = prompt('Guess a number!');
// console.log("BEFORE CONDITIONAL");
// if ((parseInt(userGuess) % 2) === 0) {
//     console.log("even")
// };
// console.log("AFTER CONDITIONAL");

let rando = Math.random();
console.log("Before the flip... ");
if (rando < 0.5) {
    console.log("HEADS")
} else {
    console.log("TAILS")
};
console.log(rando);

// let dayOfWeek = prompt('What day is it?');
// console.log(`Today is: ${dayOfWeek}`);

// if (dayOfWeek.toLowerCase() === 'monday') {
//     console.log("UGHHH!! I HATE Mondays... ")
// } else if (dayOfWeek.toLowerCase() === 'saturday') {
//     console.log("YAY... I love Saturdays... ")
// } else if (dayOfWeek.toLowerCase() === 'friday') {
//     console.log("LET THE WEEKEND BEGIN!")
// } else if (dayOfWeek.toLowerCase() === 'sunday') {
//     console.log("Get your God on...")
// } else {
//     console.log("this is a doring day.")
// }

const password = prompt("Please enter a password: ")

if (password.length >= 6) {
    console.log(`"${password}" PASSED Length check`)
    if (password.indexOf(' ') === -1) {
        console.log(`"${password}" PASSED Spaces check`)
    } else {
        console.log("PASSWORD MUST NOT CONTAIN SPACES")
    }
} else {
    console.log("PASSWORD TOO SHORT!!! Must be 6+ Characters")
}
