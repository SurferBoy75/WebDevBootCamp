const express = require('express');
const router = express.Router();

//C
router.get('/', (req, res) => {
    res.send("cookies!!")
})

router.get('/greet', (req, res) => {
    const { name = 'he who shall not be named', animal = 'Tardegrade' } = req.cookies;
    if (req.session.count) {
        req.session.count += 1;
    } else {
        req.session.count = 1;
    };
    res.send(`Hey ${name}! How is your ${animal}?`);
})

router.get('/setname', (req, res) => {
    res.cookie('name', 'Tino Morelli');
    res.cookie('animal', 'harlequin shrimp');
    res.send('C is for Cookie... MMMMMMM!');
})

router.get('/getsignedcookie', (req, res) => {
    res.cookie('fruit', 'grape', { signed: true });
    res.send('making signed cookies');
})

router.get('/verifyfruit', (req, res) => {
    console.log(req.cookies);
    console.log(req.signedCookies);
    const { fruit = 'apple' } = req.signedCookies;
    res.send(`Hey ${fruit} nutz! Sup?`);
})

router.post('/', (req, res) => {
    res.send('Make a new cookie');
})

//R
router.get('/:id', (req, res) => {
    res.send(`View cookie with ID: ${req.params.id}`);
})

//U
router.get('/:id/edit', (req, res) => {
    res.send(`Edit cookie with ID: ${req.params.id}`);
})

router.put('/:id', (req, res) => {
    res.send(`Update cookie with ID: ${req.params.id}`);
})

//D
router.delete('/:id', (req, res) => {
    res.send(`Delete cookie with ID: ${req.params.id}`);
})

module.exports = router;
