const db = require('../db/db.js');

// Get all notifications
exports.getAllNotifications = (req, res) => {
  const query = 'SELECT * FROM Notifications';
  db.all(query, (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(500).json({ error: 'Error retrieving notifications from the database' });
    } else {
      res.json(rows);
    }
  });
};

// Get a specific notification by ID
exports.getNotificationById = (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM Notifications WHERE notification_id = ?';
  db.get(query, [id], (err, row) => {
    if (err) {
      console.error(err.message);
      res.status(500).json({ error: 'Error retrieving notification from the database' });
    } else if (!row) {
      res.status(404).json({ error: 'Notification not found' });
    } else {
      res.json(row);
    }
  });
};

// Create a new notification
exports.createNotification = (req, res) => {
  const { user_id, message } = req.body;
  const query = 'INSERT INTO Notifications (user_id, message) VALUES (?, ?)';
  db.run(query, [user_id, message], function (err) {
    if (err) {
      console.error(err.message);
      res.status(500).json({ error: 'Error creating notification in the database' });
    } else {
      res.json({ id: this.lastID });
    }
  });
};

// Update an existing notification
exports.updateNotification = (req, res) => {
  const { id } = req.params;
  const { message } = req.body;
  const query = 'UPDATE Notifications SET message = ? WHERE notification_id = ?';
  db.run(query, [message, id], function (err) {
    if (err) {
      console.error(err.message);
      res.status(500).json({ error: 'Error updating notification in the database' });
    } else if (this.changes === 0) {
      res.status(404).json({ error: 'Notification not found' });
    } else {
      res.json({ message: 'Notification updated successfully' });
    }
  });
};

// Delete a notification
exports.deleteNotification = (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM Notifications WHERE notification_id = ?';
  db.run(query, [id], function (err) {
    if (err) {
      console.error(err.message);
      res.status(500).json({ error: 'Error deleting notification from the database' });
    } else if (this.changes === 0) {
      res.status(404).json({ error: 'Notification not found' });
    } else {
      res.json({ message: 'Notification deleted successfully' });
    }
  });
};
