import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login({ login }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      
      if (response.ok) {
        const data = await response.json();
        login(data.user); // Assuming the backend returns user data
        navigate('/');
      } else {
        throw new Error('Invalid username or password');
      }
    } catch (err) {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="login-form">
      <h2>Login</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;