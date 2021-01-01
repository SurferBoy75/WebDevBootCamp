const jokes = document.querySelector('#jokes');
const button = document.querySelector('button');

const addNewJoke = async () => {
    const jokeText = await getDadJoke();
    const newLi = document.createElement('li');
    newLi.append(jokeText);
    jokes.append(newLi);
}

button.addEventListener('click', addNewJoke);

const getDadJoke = async () => {
    const config = { headers: { Accept: 'application/json' } };
    try {
        const res = await axios.get('https://icanhazdadjoke.com/', config);
        return res.data.joke;
    } catch (e) {
        throw ("Error retrieving joke!")
    }
}