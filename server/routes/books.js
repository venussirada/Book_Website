// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// define the book model
let book = require('../models/books');

/* GET books List page. READ */
router.get('/', (req, res, next) => {
  // find all books in the books collection
  book.find( (err, books) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('books/index', {
        title: 'Books',
        books: books
      });
    }
  });
});

//  GET the Book Details page in order to add a new Book
router.get('/add', (req, res, next) => {
  res.render('books/details', {
    title: 'Add a new Book',
    books: {}
  });
});

// POST process the Book Details page and create a new Book - CREATE
router.post('/add', (req, res, next) => {

      // Create a new book object
  let newBook = new book({
    "Title": req.body.Title,
    "Price": req.body.Price,
    "Author": req.body.Author,
    "Genre": req.body.Genre
  });

  // Save the new book to the database
  book.create(newBook, (err, book) => {
    if(err) {
      console.log(err);
      res.end(err);
    } else {
      // Redirect the user back to the books list page
      res.redirect('/books');
    }
  });

});

// GET the Book Details page in order to edit an existing Book
router.get('/:id', (req, res, next) => {

  let id = req.params.id;
  book.findById(id, (err, book) => {
  if (err) {
  console.error(err);
  res.end(error);
  } else {
  res.render('books/details', {
  title: "Edit Book",
  books: book
  });
  }
  });
});

// POST - process the information passed from the details form and update the document
router.post('/:id', (req, res, next) => {

  let id = req.params.id;

  let updatedBook = book({
    "_id": id,
    "Title": req.body.Title,
    "Price": req.body.Price,
    "Author": req.body.Author,
    "Genre": req.body.Genre
  });

  book.update({_id: id}, updatedBook, (err) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      res.redirect('/books');
    }
  });

});

// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {

  let id = req.params.id;
  book.remove({_id: id}, (err) => {
  if(err) {
  console.log(err);
  res.end(err);
  }
  else {
  res.redirect('/books');
  }
  });
});

module.exports = router;