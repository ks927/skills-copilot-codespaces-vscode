// Create web server with express
const express = require('express');
const app = express();
const port = 3000;

// Create body-parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Create mongoose
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/express-demo', {useNewUrlParser: true});

// Create Schema
const commentSchema = new mongoose.Schema({
    name: String,
    content: String
});

// Create Model
const Comment = mongoose.model('Comment', commentSchema);

// Set view engine
app.set('view engine', 'pug');
app.set('views', './views');

// Get all comments
app.get('/comments', (req, res) => {
    Comment.find().then(comments => {
        res.render('comments/index', {
            comments: comments
        });
    });
});

// Create new comment
app.get('/comments/create', (req, res) => {
    res.render('comments/create');
});

app.post('/comments/create', (req, res) => {
    Comment.create(req.body, (err, comment) => {
        if(err) console.log(err);
        else {
            res.redirect('/comments');
        }
    });
});

// Start server
app.listen(port, () => console.log('Server listening on port ' + port));