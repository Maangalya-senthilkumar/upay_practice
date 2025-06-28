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
    <div style={{ maxWidth: 400, margin: '2rem auto', padding: 20, border: '1px solid #ccc', borderRadius: 8 }}>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>User ID:</label>
          <input value={userId} onChange={e => setUserId(e.target.value)} required />
        </div>
        <div>
          <label>Name:</label>
          <input value={name} onChange={e => setName(e.target.value)} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        </div>
        <div>
          <label>Role:</label>
          <select value={role} onChange={e => setRole(e.target.value)}>
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
          </select>
        </div>
        <div style={{ margin: '1em 0' }}>
          <FaceCapture onCapture={setFaceImage} />
        </div>
        <button type="submit">Register</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {success && <p style={{ color: 'green' }}>{success}</p>}
      </form>
      <button onClick={onSwitchToLogin} style={{ marginTop: 10 }}>Already have an account? Login</button>
    </div>
  );
}

export default Register;
