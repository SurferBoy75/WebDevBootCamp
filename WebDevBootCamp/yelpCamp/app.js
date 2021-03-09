if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const session = require('express-session');
const flash = require('connect-flash');
const ExpressError = require('./utils/ExpressError');
const morgan = require('morgan');
const helmet = require('helmet');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const mongoSanitize = require('express-mongo-sanitize');
const MongoStore = require('connect-mongo').default;

const userRoutes = require('./routes/users');
const campgroundRoutes = require('./routes/campgrounds');
const reviewsRoutes = require('./routes/reviews');

const User = require('./models/user');

const mongoose = require('mongoose');

const uri = `${process.env.DB_URL}?retryWrites=true&w=majority`;
mongoose.connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'yelp-camp mongoDB connection error:'));
db.once('open', () => {
    console.log('yelp-camp mongoDB connection open.')
})

const secret = process.env.SECRET || 'devSecret'

const miliSecondsInAWeek = 1000 * 60 * 60 * 24 * 7;
const secondsInADay = 24 * 60 * 60;

const store = new MongoStore({
    mongoUrl: process.env.DB_URL,
    secret,
    touchAfter: secondsInADay
})

store.on("error", function (e) {
    console.log("SESSION STORE ERROR", e);
})

const sessionConfig = {
    store,
    name: 'FudgeStripes',
    secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        // secure: true,
        expires: Date.now() + miliSecondsInAWeek,
        maxAge: miliSecondsInAWeek
    }
}

const app = express();

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(morgan('dev'));
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());
app.use(helmet());
//security policy data... move to external file.. 
const scriptSrcUrls = [
    "https://stackpath.bootsrapcdn.com/",
    "https://api.tiles.mapbox.com/",
    "https://api.mapbox.com/",
    "https://kit.fontawesome.com/",
    "https://cdnjs.cloudflare.com/",
    "https://cdn.jsdelivr.net/",
];
const styleSrcUrls = [
    "https://kit-free.fontawesome.com/",
    "https://stackpath.bootsrapcdn.com/",
    "https://api.mapbox.com/",
    "https://api.tiles.mapbox.com/",
    "https://fonts.googleapis.com/",
    "https://use.fontawesome.com/",
    "https://cdn.jsdelivr.net/",
];
const connectSrcUrls = [
    "https://api.mapbox.com/",
    "https://a.tiles.mapbox.com/",
    "https://b.tiles.mapbox.com/",
    "https://events.mapbox.com/",
];
const fontSrcUrls = [];
app.use(
    helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: [],
            connectSrc: ["'self'", ...connectSrcUrls],
            scriptSrc: ["'unsafe-inline'", "'self'", ...scriptSrcUrls],
            styleSrc: ["'self'", "'unsafe-inline'", ...styleSrcUrls],
            workerSrc: ["'self'", "blob:"],
            objectSrc: [],
            imgSrc: [
                "'self'",
                "blob:",
                "data:",
                "https://res.cloudinary.com/dq1c9f7fj/",
            ],
            fontSrc: ["'self'", ...fontSrcUrls],
        },
    })
);
app.use(mongoSanitize());
app.use(session(sessionConfig));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})

app.get('/', (req, res) => {
    res.render('home');
})

//routes
app.use('/', userRoutes);
app.use('/campgrounds', campgroundRoutes);
app.use('/campgrounds/:id/reviews', reviewsRoutes);

//error handling routes

app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404));
})

app.use((err, req, res, next) => {
    console.log(req.body.campground);
    const { statusCode = 500 } = err;
    if (!err.message) err.message = 'Oh Fuck!';
    res.status(statusCode).render('error', { err });
})

//shhhhhhh..... I'm ALWAYS listening!

app.listen(3000, () => { console.info("yelpCamp now serving on port 3000") });