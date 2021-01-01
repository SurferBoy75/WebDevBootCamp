// console.log("Hello")
// setTimeout(() => { console.log("...are you still there??") }, 3000)

// console.log("Good Bye")

const id = setInterval(() => { console.log(Math.random()) }, 2000);

const clr = () => { clearInterval(id) }