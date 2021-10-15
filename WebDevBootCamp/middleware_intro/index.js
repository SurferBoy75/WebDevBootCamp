const express = require('express');
const app = express();
const morgan = require('morgan');
const AppError = require('./AppError');

app.use(morgan('dev'));

app.use((req, res, next) => {
    req.requestTime = Date.now();
    console.log(req.method, req.path);
    next();
})

const verifyPassword = (req, res, next) => {
    const { password } = req.query;
    if (password === 'chickennugget') {
        next();
    } else {
        // res.send('SORRY, YOU NEED A PASSWORD');
        throw new AppError('Password required', 401);
    }
}


// app.use((req, res, next) => {
//     console.log("this is my first middleware");
//     return next();
// })
// app.use((req, res, next) => {
//     console.log("this is my second middleware");
//     return next();
// })
// app.use((req, res, next) => {
//     console.log("this is my third middleware");
//     return next();
// })

app.get('/', (req, res) => {
    console.log(`request date: ${req.requestTime}`);
    res.send('HOME');
})

app.get('/error', (req, res) => {
    chicken.fly();
})

app.get('/dogs', (req, res) => {
    console.log(`request date: ${req.requestTime}`);
    res.send('WOOF WOOF');
})

app.get('/secret', verifyPassword, (req, res) => {
    res.send('Shhhh... dont tell a soul!');
})

app.get('/admin', (req, res) => {
    throw new AppError('YOU DO NOT HAVE THE POWER...', 403);
})

app.use((req, res) => {
    res.status(404).send('PAGE NOT FOUND')
});

// app.use((err, req, res, next) => {
//     console.log("*******************************************************");
//     console.log("***************** ERROR *******************************");
//     console.log(`*************** ${err} ************************`);
//     console.log("*******************************************************");
//     next(err);
// })

app.use((err, req, res, next) => {
    const { status = 500 } = err;
    const { message = 'WHAT THE FUCK!' } = err;
    res.status(status).send(message);
})

app.listen(3000, () => { console.info("middleware_intro now serving on port 3000") });