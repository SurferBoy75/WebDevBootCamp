// async function hello() {
// }

// const sing = async () => {
//     throw "oh on, problem.."
//     return 'LA LA LA LA'
// }

// sing()
//     .then(data => {
//         console.log("promise resolved with:", data)
//     })
//     .catch(err => {
//         console.log("shit... ")
//         console.log(err)
//     })

// const login = async (username, password) => {
//     if (!username || !password) throw 'Missing Credentials'
//     if (password === 'corgifeetarecute') return 'WELCOME...'
//     throw 'Invalid Password'
// }

// let username = prompt("enter your username");
// let password = prompt("enter your password");

// login(username, password)
//     .then(msg => {
//         console.log("LOGGED IN!")
//         console.log(msg)
//     })
//     .catch(err => {
//         console.error("ERROR!")
//         console.log(err)
//     })

const fakeRequest = (url) => {
    return new Promise((resolve, reject) => {
        const delay = Math.floor(Math.random() * (4500)) + 500;
        setTimeout(() => {
            if (delay > 4000) {
                reject('connection timeout.');
            } else {
                resolve(`Here is your fake data from ${url}`);
            }
        }, delay)
    })
}

async function makeTwoRequests() {
    try {
        let data1 = await fakeRequest('/page1');
        console.log(data1);
        let data2 = await fakeRequest('/page2');
        console.log(data2);
    } catch (e) {
        console.error("caught one!")
        console.log("error is:", e);
    }

}