const mongoose = require('mongoose');

const uri = "mongodb+srv://root:groot@kantordesign.ybqhf.mongodb.net/moviesApp?retryWrites=true&w=majority";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("mongoDB connection open!");
    })
    .catch(err => {
        console.error("mongoDB connection failure:");
        console.log(err);
    })

console.log("Now logging and listening in Mongoose Practise index... ")

const movieSchema = new mongoose.Schema({
    title: String,
    year: Number,
    score: Number,
    rating: String,
    isBlackandWhite: Boolean
})

const Movie = mongoose.model('Movie', movieSchema);

// const amadeus = new Movie({ title: 'Amadeus', year: 1986, score: 9.2, rating: 'R', isBlackandWhite: false });

// Movie.insertMany([
//     { title: 'Amelie', year: 2001, score: 8.3, rating: 'R', isBlackandWhite: false },
//     { title: 'Alien', year: 1979, score: 8.1, rating: 'R', isBlackandWhite: false },
//     { title: 'The Iron Giant', year: 1999, score: 7.5, rating: 'PG', isBlackandWhite: false },
//     { title: 'Stand By Me', year: 1986, score: 8.6, rating: 'R', isBlackandWhite: false },
//     { title: 'Moonrise Kingdom', year: 2012, score: 7.3, rating: 'PG-13', isBlackandWhite: false },
//     { title: 'Its a Wonderful Life', year: 1946, score: 8.6, rating: 'PG', isBlackandWhite: true },
//     { title: 'Clerks', year: 1994, score: 7.7, rating: 'R', isBlackandWhite: true }
// ])
//     .then(data => {
//         console.log("movies loaded successfully.");
//         console.log(data);
//     })

