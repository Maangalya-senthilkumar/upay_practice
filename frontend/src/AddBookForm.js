import React, { useState } from 'react';
import axios from 'axios';

function AddBookForm({ token, onBookAdded }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishedYear, setPublishedYear] = useState('');
  const [genre, setGenre] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await axios.post('http://localhost:5000/api/books', {
        title, author, publishedYear, genre
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTitle(''); setAuthor(''); setPublishedYear(''); setGenre('');
      onBookAdded();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to add book');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{marginBottom: 20}}>
      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" required />
      <input value={author} onChange={e => setAuthor(e.target.value)} placeholder="Author" required />
      <input value={publishedYear} onChange={e => setPublishedYear(e.target.value)} placeholder="Year" type="number" />
      <input value={genre} onChange={e => setGenre(e.target.value)} placeholder="Genre" />
      <button type="submit">Add Book</button>
      {error && <span style={{color:'red'}}> {error}</span>}
    </form>
  );
}

export default AddBookForm;
