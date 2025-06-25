const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  publishedYear: { type: Number },
  genre: { type: String },
  available: { type: Boolean, default: true }
});

module.exports = mongoose.model('Book', bookSchema);
