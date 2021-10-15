const express = require('express');
const app = express();
const path = require('path');
const { v4: uuid } = require('uuid');
const methodOverride = require('method-override');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

let comments = [
    {
        id: uuid(),
        username: 'Todd',
        comment: 'lol, that is so funny!'
    },
    {
        id: uuid(),
        username: 'SKyler',
        comment: 'I like to go birdwatching with my dog'
    },
    {
        id: uuid(),
        username: 'sk8erBoi',
        comment: 'Im a twelve year old... '
    },
    {
        id: uuid(),
        username: 'onlySAYSwoof',
        comment: 'woof woof woof'
    },
    {
        id: uuid(),
        username: 'dIrtybIrd',
        comment: 'I like to watch bird watchers... naked.'
    },
]

//Index:     GET    /comments          - list all comments
app.get('/comments', (req, res) => {
    res.render('comments/index', { comments });
})

//New:       GET    /comments/new      - Form to create a new comment
app.get('/comments/new', (req, res) => {
    res.render('comments/new');
})

//Create:    POST   /comments          - create a new comment 
app.post('/comments', (req, res) => {
    const { username, comment } = req.body;
    comments.push({ username, comment, id: uuid() });
    res.redirect('/comments');
})

//Show:      GET    /comments/:id      - Get ONE comment (using ID)
app.get('/comments/:id', (req, res) => {
    const { id } = req.params;
    const comment = comments.find(c => c.id === id);
    res.render('comments/show', { comment });
})

//Edit:      GET    /comments/:id/edit - Form to edit specifi comment
app.get('/comments/:id/edit', (req, res) => {
    const { id } = req.params;
    const comment = comments.find(c => c.id === id);
    res.render('comments/edit', { comment })
})

//Update:    PATCH  /comments/:id      - Update ONE comment (could also use PUT)
app.patch('/comments/:id/', (req, res) => {
    const { id } = req.params;
    const updatedCommentbody = req.body.comment;
    const targetComment = comments.find(c => c.id === id);
    targetComment.comment = updatedCommentbody;
    res.redirect('/comments');
})

//Destroy    DELETE /comments/:id      - Destroy one comment
app.delete('/comments/:id', (req, res) => {
    const { id } = req.params;
    comments = comments.filter(c => c.id !== id);
    console.log('I would have deleted this:', id);
    res.redirect('/comments');
})

app.get('/tacos', (req, res) => {
    res.send("GET /tacos response");
})

app.post('/tacos', (req, res) => {
    const { meat, qty } = req.body;
    res.send(`${qty} ${meat} tacos... coming up!`);
})

app.listen(3000, () => {
    console.info("REST demo now logging and listening on port 3000")
})
