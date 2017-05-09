var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var app = express();
app.use(bodyParser.json());

Genre = require('./models/genre');
Book = require('./models/book');


//Connect Mongoose
mongoose.connect('mongodb://127.0.0.1:27017/bookstore');
var db = mongoose.connection;

app.get('/', function (req, res) {
    res.send('Hello World');
});

//genre route
app.get('/api/genres', function (req, res) {
    Genre.getGenres(function (err, genres) {
        if (err) {
            throw err;
        }
        res.json(genres);
    });
});

//add genre route
app.post('/api/genres', function (req, res) {
    var genre = req.body;
    Genre.addGenre(function (err, genre) {
        if (err) {
            throw err;
        }
        res.json(genre);
    });
});

app.get('/api/books', function (req, res) {
    Book.getBooks(function (err, books) {
        if (err) {
            throw err;
        }
        res.json(books);
    });
});

app.get('/api/books/:_id', function (req, res) {
    Book.getBookById(req.params._id, function (err, book) {
        if (err) {
            throw err;
        }
        res.json(book);
    });
});

app.listen(3000);
console.log('App Running on port 3000...');