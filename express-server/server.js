const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

let isAuthenticated = false;

const credentials = {
  username: 'admin',
  password: 'password' 
};

"test"


app.post('/login', (req, res) => {
  const { username, pass } = req.body;
  if (username === 'admin' && pass === credentials.password) {
    isAuthenticated = true;
    return res.status(200).json({ message: 'Logged in' });
  }
  res.status(401).json({ message: 'Invalid credentials' });
});

app.post('/logout', (req, res) => {
  isAuthenticated = false;
  res.status(200).json({ message: 'Logged out' });
});

app.get('/status', (req, res) => {
  res.status(200).json({ authenticated: isAuthenticated });
});

app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});

