const { createDBTables } = require('./dbTables');

const sqlite3 = require('sqlite3').verbose();

// Connect to the SQLite database
const db = new sqlite3.Database('./metclinicDB.db', (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log('Connected to the SQLite database.');
  }
});

db.serialize(() => {
  // Create the tables if they are empty
  createDBTables(db)
});

// Function to get a user by their username
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


module.exports = db;
