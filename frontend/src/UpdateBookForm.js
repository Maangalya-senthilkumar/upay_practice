import React, { useState } from 'react';
import axios from 'axios';

function UpdateBookForm({ book, token, onBookUpdated, onCancel }) {
  const [title, setTitle] = useState(book.title);
  const [author, setAuthor] = useState(book.author);
  const [publishedYear, setPublishedYear] = useState(book.publishedYear);
  const [genre, setGenre] = useState(book.genre);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await axios.put(`http://localhost:5000/api/books/${book._id}`, {
        title, author, publishedYear, genre
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      onBookUpdated();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update book');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{marginBottom: 10}}>
      <input value={title} onChange={e => setTitle(e.target.value)} required />
      <input value={author} onChange={e => setAuthor(e.target.value)} required />
      <input value={publishedYear} onChange={e => setPublishedYear(e.target.value)} type="number" />
      <input value={genre} onChange={e => setGenre(e.target.value)} />
      <button type="submit">Save</button>
      <button type="button" onClick={onCancel}>Cancel</button>
      {error && <span style={{color:'red'}}> {error}</span>}
    </form>
  );
}

export default UpdateBookForm;
