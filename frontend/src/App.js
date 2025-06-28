import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import Login from './Login';
import AddBookForm from './AddBookForm';
import UpdateBookForm from './UpdateBookForm';

function App() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null); // { token, role, name }
  const [editingBookId, setEditingBookId] = useState(null);

  // Fetch books
  const refreshBooks = () => {
    setLoading(true);
    axios.get('http://localhost:5000/api/books')
      .then(response => {
        setBooks(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError('Could not fetch books');
        setLoading(false);
      });
  };

  useEffect(() => {
    if (user) {
      refreshBooks();
    }
  }, [user]);

  const handleLogout = () => setUser(null);

  // Delete book handler
  const handleDelete = async (bookId) => {
    try {
      await axios.delete(`http://localhost:5000/api/books/${bookId}`, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      refreshBooks();
    } catch (err) {
      alert('Failed to delete book');
    }
  };

  // Update book handler
  const handleStartEdit = (bookId) => setEditingBookId(bookId);
  const handleCancelEdit = () => setEditingBookId(null);
  const handleBookUpdated = () => {
    setEditingBookId(null);
    refreshBooks();
  };

  if (!user) {
    return <Login onLogin={setUser} />;
  }

  return (
    <div className="App">
      <h2>Welcome to the Library App!</h2>
      <h1>Library Management System</h1>
      <p>Welcome, {user.name} ({user.role}) <button onClick={handleLogout}>Logout</button></p>
      {/* Admin-only actions */}
      {user.role === 'admin' && (
        <div style={{marginBottom: 20}}>
          <h3>Add New Book</h3>
          <AddBookForm token={user.token} onBookAdded={refreshBooks} />
        </div>
      )}
      {loading && <p>Loading books...</p>}
      {error && <p style={{color: 'red'}}>{error}</p>}
      <ul>
        {books.map(book => (
          <li key={book._id}>
            {editingBookId === book._id ? (
              <UpdateBookForm
                book={book}
                token={user.token}
                onBookUpdated={handleBookUpdated}
                onCancel={handleCancelEdit}
              />
            ) : (
              <>
                <strong>{book.title}</strong> by {book.author} ({book.publishedYear})
                {user.role === 'admin' && (
                  <span>
                    <button onClick={() => handleStartEdit(book._id)}>Update</button>
                    <button onClick={() => handleDelete(book._id)}>Delete</button>
                  </span>
                )}
              </>
            )}
          </li>
        ))}
      </ul>
      <footer>Contact us at library@example.com</footer>
    </div>
  );
}

export default App;
