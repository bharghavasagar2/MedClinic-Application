const jwt = require('jsonwebtoken');
const config = require('../config');
const db = require('../db/db.js');

// Controller function to authenticate user and generate JWT token
const login = async (req, res) => {
  console.log(req.body)
  const { username, password } = req.body;

  // Perform user authentication logic
  const user = await getUserByUsername(username);

  if (!user || user.password !== password) {
    // Invalid credentials
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = jwt.sign({ username }, config.jwtSecret, { expiresIn: '1h' });
  res.json({ token });
};

// Middleware function to verify JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, config.jwtSecret, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }
    req.user = user;
    next();
  });
};

// Controller function to handle user logout
const logout = (req, res) => {
  // In a stateless JWT authentication setup, the client-side is responsible for managing the token.
  // To "logout" a user, the client-side can simply discard or delete the token.
  // There is no need to perform any server-side action.

  res.sendStatus(200);
};

// Function to get a user by their username from database
const getUserByUsername = (username) => {
  return new Promise((resolve, reject) => {
    // Query the database for the user with the given username
    db.get(
      'SELECT * FROM AuthenticationUsers WHERE username = ?',
      [username],
      (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      }
    );
  });
};

module.exports = {
  login,
  authenticateToken, logout
};
