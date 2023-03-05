/**
 * File name: books.js
 * Author's name: Sirada Thoungvitayasutee
 * Student ID: 301292632
 * Web App name: COMP229-F2020-MidTerm-301292632
 */
let mongoose = require('mongoose');

// create a model class
let Book = mongoose.Schema({
    Title: String,
    Description: String,
    Price: Number,
    Author: String,
    Genre: String
},
{
  collection: "books"
});

module.exports = mongoose.model('Book', Book);
