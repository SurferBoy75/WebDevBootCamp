const password = prompt("Enter Your password");

console.log("And conditions... ");
if (password) {
    if (password.length >= 6 && password.indexOf(' ') === -1) {
        console.log("password IS VALID!")
    } else {
        console.error(`password: ${password} is INVALID! All passwords must be greater than 6 characters and not contain spaces.`)
    }
} else {
    console.warn("No data entered, you must enter a password for this to work!")
};


let age = prompt("Enter Your age");
age = parseInt(age);

console.log("Ands and ORs... ");
if (Number.isInteger(age)) {
    if ((age >= 0 && age < 5) || age >= 65) {
        console.log("Admission is FREE!")
    } else if (age >= 5 && age < 10) {
        console.log("Admission is $10!")
    } else if (age >= 10 && age < 65) {
        console.log("Admission is $20!")
    } else {
        console.error(`age: ${age} is INVALID! Age must be a positive nunmber`)
    }
} else {
    console.warn("INVALID data entered, you must enter a number for this to work!")
};

let firstName = prompt("Enter Your First Name");

console.log("!complicated");
if (!firstName) {
    firstName = prompt("[TRY AGAIN!] Enter Your First Name")
    if (!firstName) {
        console.error("YOU SUCK!!")
    } else {
        console.log(`Hello ${firstName}`)
    }
} else {
    console.log(`Hello ${firstName}`)
};