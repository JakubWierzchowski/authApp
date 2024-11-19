import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Fake login for demo
    if (username === 'admin' && password === 'password') {
      onLogin();
    } else {
      alert('Invalid credentials');
    }
  };
  return (
    <form onSubmit={handleSubmit}>
    <h2>Login</h2>
    <input
      type="text"
      placeholder="Username"
      value={username}
      onChange={(e) => setUsername(e.target.value)}
    />
    <input
      type="password"
      placeholder="Password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
    />
    <button type="submit">Login</button>
  </form>
  );
}

export default Login;
