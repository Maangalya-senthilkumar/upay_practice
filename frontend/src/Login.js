import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FaceCapture from './facecapture';
import Register from './Register';

function Login({ onLogin }) {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [faceImage, setFaceImage] = useState(null);
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [showRegister, setShowRegister] = useState(false);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => setLocation({ latitude: pos.coords.latitude, longitude: pos.coords.longitude }),
      (err) => alert('Location access denied')
    );
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!faceImage) {
      setError('Please capture your face before logging in.');
      return;
    }
    if (!location.latitude || !location.longitude) {
      setError('Location not available. Please allow location access.');
      return;
    }
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        userId,
        password,
        faceImage,
        latitude: location.latitude,
        longitude: location.longitude
      });
      onLogin(res.data); // Pass token, role, name to parent
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    }
  };

  if (showRegister) {
    return <Register onRegister={() => setShowRegister(false)} onSwitchToLogin={() => setShowRegister(false)} />;
  }

  return (
    <div style={{ maxWidth: 400, margin: '2rem auto', padding: 20, border: '1px solid #ccc', borderRadius: 8 }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>User ID:</label>
          <input value={userId} onChange={e => setUserId(e.target.value)} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        </div>
        <div style={{ margin: '1em 0' }}>
          <FaceCapture onCapture={setFaceImage} />
        </div>
        <button type="submit">Login</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
      {location.latitude && location.longitude && (
        <p style={{ fontSize: '0.8em', color: '#555' }}>
          Location: {location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}
        </p>
      )}
      <button onClick={() => setShowRegister(true)} style={{ marginTop: 10 }}>New user? Register</button>
    </div>
  );
}

export default Login;
