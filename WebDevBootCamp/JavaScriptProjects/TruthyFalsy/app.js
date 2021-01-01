//this code should be refactored as a function!!

const userInput = prompt("Enter Something");

let testType = "User Input";
let conData = userInput;

if (conData) {
    console.warn(`${testType}: ${conData} --> TRUTHY!`)
} else {
    console.warn(`${testType}: ${conData} --> FALSEY!`)
};

testType = "Zero";
conData = 0;

if (conData) {
    console.error(`${testType}: ${conData} --> TRUTHY!`)
} else {
    console.error(`${testType}: ${conData} --> FALSEY!`)
};

testType = "Boolean";
conData = false;

if (conData) {
    console.warn(`${testType}: ${conData} --> TRUTHY!`)
} else {
    console.warn(`${testType}: ${conData} --> FALSEY!`)
};

testType = "Null";
conData = null;

if (conData) {
    console.error(`${testType}: ${conData} --> TRUTHY!`)
} else {
    console.error(`${testType}: ${conData} --> FALSEY!`)
};

testType = "Undefined Values";
conData = undefined;

if (conData) {
    console.warn(`${testType}: ${conData} --> TRUTHY!`)
} else {
    console.warn(`${testType}: ${conData} --> FALSEY!`)
};

testType = "Not a Number";
conData = NaN;

if (conData) {
    console.error(`${testType}: ${conData} --> TRUTHY!`)
} else {
    console.error(`${testType}: ${conData} --> FALSEY!`)
};