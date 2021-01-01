const express = require('express');

const app = express();

// app.use((req, res) => {
//     console.log("request recieved");
//     res.send('<h1>This is my header</h1>');
// })

app.get('/', (req, res) => {
    console.log("HOME REQUEST");
    res.send('<h1>Welcome Home</h1>');
})

app.get('/r/:subreddit', (req, res) => {
    const { subreddit } = req.params;
    res.send(`<h1>NOW BROWSING ${subreddit} SUBREDDIT</H1>`);
})

app.get('/r/:subreddit/:postId', (req, res) => {
    const { subreddit, postId } = req.params;
    res.send(`<h1>Now Browsing -> "${subreddit}" subreddit by: ${postId}</H1>`);
})

app.post('/cats', (req, res) => {
    console.log("cats POST... THIS IS NOT A GET!!");
    res.send('<h1>OOWWWWW... FUCKER!!</h1>');
})

app.get('/cats', (req, res) => {
    console.log("CAT REQUEST");
    res.send('<h1>MEOOOW!!!</h1>');
})

app.get('/dogs', (req, res) => {
    console.log("DOG REQUEST");
    res.send('<h1>WOOOFFFF!!!</h1>');
})

app.get('/search', (req, res) => {
    const { q } = req.query;
    if (!q) {
        res.send("Nothing found if nothing searched...")
    }
    res.send(`<h1>Search results for ${q} are now being displayed</h1>`);
})

app.get('*', (req, res) => {
    res.send(`I don't know that route`);
})


// /cats => 'meow'
// /dogs => 'woof'
// '/'

app.listen(3000, () => {
    console.log("now listening on port 3000.")
})


