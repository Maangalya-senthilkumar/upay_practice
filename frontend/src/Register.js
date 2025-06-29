import React, { useState } from 'react';
import axios from 'axios';
import FaceCapture from './facecapture';

function Register({ onRegister, onSwitchToLogin }) {
  const [userId, setUserId] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const [faceImage, setFaceImage] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!faceImage) {
      setError('Please capture your face before registering.');
      return;
    }
    try {
      await axios.post('http://localhost:5000/api/auth/register', {
        userId,
        name,
        password,
        role,
        faceImage
      });
      setSuccess('Registration successful! You can now log in.');
      setUserId(''); setName(''); setPassword(''); setRole('student'); setFaceImage(null);
      if (onRegister) onRegister();
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '2rem auto', padding: 20, border: '1px solid #ccc', borderRadius: 8, boxSizing: 'border-box', width: '100%' }}>
      <h2>Register</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <label>User ID:</label>
          <input value={userId} onChange={e => setUserId(e.target.value)} required style={{ width: '100%' }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <label>Name:</label>
          <input value={name} onChange={e => setName(e.target.value)} required style={{ width: '100%' }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <label>Password:</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required style={{ width: '100%' }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <label>Role:</label>
          <select value={role} onChange={e => setRole(e.target.value)} style={{ width: '100%' }}>
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
          </select>
        </div>
        <div>
          <FaceCapture onCapture={setFaceImage} />
        </div>
        {error && <div style={{ color: 'red', marginBottom: 8 }}>{error}</div>}
        {success && <div style={{ color: 'green', marginBottom: 8 }}>{success}</div>}
        <button type="submit" style={{ width: '100%' }}>Register</button>
      </form>
      <div style={{ marginTop: 10 }}>
        <button style={{ width: '100%' }} onClick={onSwitchToLogin}>Back to Login</button>
      </div>
    </div>
  );
}

export default Register;
