const express = require('express');
const router = express.Router();

//C
router.get('/', (req, res) => {
    res.send('Display all shelters');
})

router.get('/new', (req, res) => {
    res.send(`Create new shelter`);
})

router.post('/', (req, res) => {
    res.send('Make a new shelter');
})

//R
router.get('/:id', (req, res) => {
    res.send(`View shelter with ID: ${req.params.id}`);
})

//U
router.get('/:id/edit', (req, res) => {
    res.send(`Edit shelter with ID: ${req.params.id}`);
})

router.put('/:id', (req, res) => {
    res.send(`Update shelter with ID: ${req.params.id}`);
})

//D
router.delete('/:id', (req, res) => {
    res.send(`Delete shelter with ID: ${req.params.id}`);
})

module.exports = router;
