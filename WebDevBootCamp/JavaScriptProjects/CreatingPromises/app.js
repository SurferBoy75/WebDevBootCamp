const fakeRequest = (url) => {
    return new Promise((resolve, reject) => {
        const delay = Math.floor(Math.random() * (4500)) + 500;
        setTimeout(() => {
            if (delay > 4000) {
                reject('connection timeout.');
            } else {
                resolve(`Here is your fake data from ${url}`);
            }

        }, 1000)
    })
}

fakeRequest('/dogs/1')
    .then((data) => {
        console.log("done:")
        console.log(data);
    })
    .catch((err) => {
        console.error("connection time out!");
        console.log(err);
    })