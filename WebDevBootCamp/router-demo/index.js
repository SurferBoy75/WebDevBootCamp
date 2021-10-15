const express = require('express');
const app = express();

const secret = 'thisisaterriblesecret';

const cookieParser = require('cookie-parser');
app.use(cookieParser(secret));

const sessionOptions = {
    secret: secret,
    resave: false,
    saveUninitialized: false
};

const session = require('express-session');
app.use(session(sessionOptions));

const shelterRoutes = require('./routes/shelters');
const dogRoutes = require('./routes/dogs');
const adminRoutes = require('./routes/admin');
const cookieRoutes = require('./routes/cookies');

app.use('/shelters', shelterRoutes);
app.use('/dogs', dogRoutes);
app.use('/admin', adminRoutes);
app.use('/cookies', cookieRoutes);

app.get('/viewcount', (req, res) => {
    if (req.session.count) {
        req.session.count += 1;
    } else {
        req.session.count = 1;
    };
    res.send(`Page Views: ${req.session.count}`);
})

app.get('/register', (req, res) => {
    const { username = '3rdjoker' } = req.query;
    req.session.username = username;
    res.send(`user ${username} registered successfully`)
})

app.get('/accountinfo', (req, res, next) => {
    if (!req.session.username) {
        return next();
    }
    res.send(`${req.session.username} currently logged in!`);
})

app.listen(3000, () => { console.info("router-demo(PLUS COOKIES and SESSIONS!) now serving on port 3000") });