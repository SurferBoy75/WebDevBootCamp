const mongoose = require('mongoose');
// const cities = require('./cities');
// const liveCamps = require('./liveCampgrounds');
// const { places, descriptors, images } = require('./seedHelpers');
const Campground = require('../models/campground');

const uri = process.env.DB_URL;
mongoose.connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'yelp-camp mongoDB connection error:'));
db.once('open', () => {
    console.log('yelp-camp mongoDB connection open.')
})

const seedDB = async () => {
    // await Campground.deleteMany({});

    Campground.find()
   .then((allCamps) => {
       allCamps.forEach((camp) => {
           //create new field in each schema
           camp.campedHere = true;
           //save the schema we updated
           camp.save();
       })
   })
   .catch((errors) => {
       console.log(errors);
   })
}

seedDB().then(() => {
    console.log("done");
    // mongoose.connection.close();
});
