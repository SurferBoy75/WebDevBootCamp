const restaurant = {
    name: 'Ichiran Ramen',
    address: `${Math.floor(Math.random() * 100) + 1} Johnson Ave`,
    city: 'Brooklyn',
    state: 'NY',
    zipcode: '11206',
};
let fullAddress = `${restaurant.address}, ${restaurant.city}, ${restaurant.state} ${restaurant.zipcode}`;
console.log(fullAddress);

// console.log('The dumb way... ');

// console.log(1);
// console.log(2);
// console.log(3);
// console.log(4);
// console.log(5);
// console.log(6);
// console.log(7);
// console.log(8);
// console.log(9);
// console.log(10);

// console.log('The smart way... ');

// for (let i = 1; i <= 10; i++) {
//     console.log(i);
// };

// for (let i = 0; i <= 20; i++) {
//     if (i % 2 === 0) {
//         console.log(i)
//     }
// };

// for (let i = 0; i <= 20; i += 2) {
//     console.log(i)
// }

// for (let i = 100; i >= 0; i -= 10) {
//     console.log(i)
// }

// const firstName = prompt('Enter your first name');
// console.log(firstName);

// for (i = 0; i < firstName.length; i++) {
//     console.log(firstName[i])
// }

// for (i = 25; i >= 0; i -= 5) {
//     console.log(i)
// }

// const secretCode = 'BabyHippo';

// let passCode = prompt('Enter the passcode');
// while (passCode !== secretCode) {
//     console.error("PASSCODE INVALID!");
//     console.log(`You entered: ${passCode}`);
//     passCode = prompt('Please Try again...');
// }
// console.log('you won!')

const subReddits = ['cringe', 'books', 'chickens', 'funny', 'pics', 'soccer', 'gunners'];
// const testScores = {
//     keenan: 80,
//     damon: 67,
//     kim: 89,
//     shawn: 91,
//     marlon: 72,
//     dwayne: 77,
//     nadia: 83,
//     elvira: 97,
//     diedre: 81,
//     vonnie: 60
// };

// let i
// let tag
// let person
// let score
// let avg = 0
// let total = 0
// let scores = Object.values(testScores);

// console.log("For:");

// for (i = 0; i < subReddits.length; i++) {
//     console.log(`Visit - reddit.com/r/${subReddits[i]}`);
// }


// console.log("For of:");

// for (tag of subReddits) {
//     console.log(`Visit - reddit.com/r/${tag}`);
// }

// console.log("For in:");
// for (person in testScores) {
//     console.log(`${person} scored ${testScores[person]}`);
// }

// console.log("For of with Object. :");
// for (score of Object.values(testScores)) {
//     avg++;
//     total += score;
//     console.log(`Someone scored ${score}`);
// }
// console.log(`The average score was: ${total / avg}`)
// console.log('-- OR --')
// console.log(`The average score was: ${total / scores.length}`)
function grumpus() {
    console.log('ugh... you again...');
    console.log('for the last time... ');
    console.log('LEAVE ME ALONE!');

}

function repeat(message, count) {
    let result = '';
    for (let i = 0; i < count; i++) {
        result += message;
    };
    console.log(result);
}

function isSnakeEyes(first, second) {
    if (first === 1 && second === 1) {
        console.log('Snake Eyes!');
    } else {
        console.log('Not Snake Eyes!');
    }
}

function multiply(x, y) {
    return x * y;
}

function tempConvert(degrees, measurement) {
    let result = 0;
    if (measurement === 'C') {
        result = (degrees * 1.8) + 32;
        console.log(`Fahrenheit Measurement is: ${result}.`);
        return result;
    }
    result = (degrees - 32) / 1.8;
    console.log(`Celcius Measurement is: ${result}.`);
    return result;
}

function lastElement(array) {
    if (array.length > 0) {
        return array[array.length - 1];
    }
    return null;
}

function capitalize(str) {
    let result = str[0].toUpperCase() + str.slice(1);
    console.log(result);
    return result;
}

function sumArray(addThisShit) {
    let total = 0;
    for (let i = 0; i < addThisShit.length; i++) {
        total += addThisShit[i];
    }
    return total;
}

function returnDay(index) {
    let week = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    if (index >= 1 && index <= 7) {
        return week[index - 1];
    }
    return null;
}

// const square = function (x) { return x * x };


function runMultiple(f, rep) {
    for (let i = 0; i < rep; i++) {
        console.log(`${f()}`);
    };
}

function makeBetweenFunc(min, max) {
    return function (num) {
        return num >= min && num <= max;
    }
}

// makeBetweenFunc(5,10)

// function isBetween(num) {
//     return num >= 50 && num <= 100;
// }

// const myMath = {
//     PI: 3.1459,
//     square(num) { return num * num },
//     cube(num) { return num ** 3 },
// }

const square = {
    area(side) { return side * side },
    perimeter(side) { return side * 4 }
}

const cat = {
    name: 'Blue Steele',
    color: 'grey',
    breed: 'scottish fold',
    meow(rep) {
        let speech = 'meow ';
        for (let i = 0; i < rep; i++) {
            speech += speech;
        }
        console.log(`${this.name} says: ${speech}`);
    }
}

const hen = {
    name: 'Helen',
    eggCount: 0,
    layAnEgg() {
        this.eggCount++;
        return "EGG";
    }
}

try {
    hello.toUpperCase;
} catch {
    console.error("ERROR!!");
}
console.log("after the error...")

function yell(msg) {
    try {
        console.log(msg.toUpperCase().repeat(3));
    } catch (e) {
        console.log("Please pass a string")
    }

}

const movies = [
    {
        title: 'Amadeus',
        score: 99
    },
    {
        title: 'Stand By Me',
        score: 85
    },
    {
        title: 'Parasite',
        score: 95
    },
    {
        title: 'Alien',
        score: 90
    }
]

movies.forEach(function (movie) {
    console.log(`${movie.title} - ${movie.score}/100`)
})

const titles = movies.map(function (movie) {
    return movie.title;
})

console.log(titles);

function cleanNames(dirtyArray) {
    return dirtyArray.map(function (element) { return element.trim() })
}

// const add = function (x, y) {
//     return x + y;
// }

// intstead... 
const add = (x, y) => {
    return x + y;
}

// const rollDie = function () { return Math.floor(Math.random() * 6) + 1 };

// const rollDie = () => { return Math.floor(Math.random() * 6) + 1 }

// const rollDie = () => (Math.floor(Math.random() * 6) + 1)

// const greet = firstName => { return `Hey ${firstName}` }

//super shorthand!

const isEven = num => num % 2 === 0;

// const newMovies = movies.map(function (movie) {
//     return `${movie.title} - ${movie.score / 10}`
// })

const newMovies = movies.map(movie => `${movie.title} - ${movie.score / 10}`)

const filtered = subReddits.filter(n => (n[0] !== 'c'))

const validUserNames = array => (array.filter(usr => (usr.length < 10)))

const exams = [80, 98, 92, 78, 77, 90, 89, 84, 81, 77]

const areAllPassing = passing => (exams.every(score => score >= passing))

const areAnyPassing = passing => (exams.some(score => score >= passing))

const pizzaParty = passLine => {
    if (areAllPassing(passLine)) {
        console.log("WOO HOO, everyone passed!  Pizza Party time!!!")
    } else if (areAnyPassing(passLine)) {
        console.log("sorry, no party today... ");
        console.log(`${exams.filter(score => (score < passLine)).length} of you failed`)
    } else {
        console.log("Holy shit... NONE of you passed!  I quit.")
    }
}

const allEvens = arrayNums => (arrayNums.every(x => x % 2 === 0))

//Reduce
console.warn("Reduce practice!")

const prices = [9.99, 1.50, 19.99, 49.99, 30.50, 0.99];

console.log("First using a 'forof' loop... ")
let total = 0;
for (let price of prices) { total += price }

console.log(`total spend: ${total}`)

console.log("then with reduce... ")

let reduceTotal = prices.reduce((total, price) => (total + price))
console.log(`total spend: ${reduceTotal}`)

let minValue = prices.reduce((min, price) => {
    if (price < min) { return price }
    return min;
})
console.log(`Lowest Purchase: ${minValue}`)

let maxValue = prices.reduce((max, price) => {
    if (price > max) { return price }
    return max;
})
console.log(`Highest Purchase: ${maxValue}`)

//"this" in arrow-functions:

const person = {
    fName: 'Viggo',
    lName: 'Mortensen',
    fullName: function () { return `${this.fName} ${this.lName}` },
    shoutName: function () {
        setTimeout(() => {
            console.log(this);
            console.log(this.fullName())
        }, 3000)
    }
}

const rollDie = (sides = 6) => (Math.floor(Math.random() * sides) + 1)

const greet = (person, msg = "hi", punc = "!") => (`${msg}, ${person}${punc}`)

const spreadStuffOut = value => {
    console.log(value)
    console.log(...value)
}

//rest

// const sum = () => (arguments.reduce((total, el) => total + el))
// ^-- "arguments" doesn't work in arrow functions


const sum = (...nums) => (nums.reduce((total, el) => total + el))

//destructuring

const scores = [929321, 899341, 888336, 772739, 543671, 243567, 111934];

const highScore = scores[0];
const secondHighScore = scores[1];

const [gold, silver, bronze, ...theRest] = scores;

const user = {
    email: 'harvey@gmail.com',
    password: 'sCoTt1948sMiTh',
    firstName: 'Harvey',
    lastName: 'Milk',
    born: 1930,
    died: 1978,
    bio: 'Harvey Bernard Milk was an American politician and the first openly gay elected official in the history of California.',
    city: 'San Francisco',
    state: 'California'
}

// const firstName = user.firstName;
// const lastName = user.lastName;

const { email, city, state, firstName, lastName } = user;
const { born: birthyear, died: deathyear, facebook = 'N/A' } = user;

// const fullName = (user) => (`${user.firstName} ${user.lastName}`);

const fullName = ({ firstName = 'Tino', lastName = 'Morelli' }) => (`${firstName} ${lastName}`);

