const express = require('express');
const router = express.Router();

router.use((req, res, next) => {
    if (req.query.isAdmin) {
        return next();
    }
    res.send("Admin Access DENIED.")
})

router.get('/', (req, res) => {
    res.send('Display all Users');
})

//C
router.get('/new', (req, res) => {
    res.send(`Create new User`);
})

router.post('/', (req, res) => {
    res.send('Make a new User');
})

//R
router.get('/:id/topsecret', (req, res) => {
    res.send(`User ${req.params.id}'s password is: FUCKSP3C|ALCH@R$`);
})

//U
router.get('/:id/edit', (req, res) => {
    res.send(`Edit User with ID: ${req.params.id}`);
})

router.put('/:id', (req, res) => {
    res.send(`Update User with ID: ${req.params.id}`);
})

//D
router.delete('/:id', (req, res) => {
    res.send(`Delete User with ID: ${req.params.id}`);
})

router.delete('/firesale/now', (req, res) => {
    res.send('YOU JUST DELETED THE ENTIRE APP!');
})

module.exports = router;
