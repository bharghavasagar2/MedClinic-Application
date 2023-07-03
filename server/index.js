const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const routes = require('./routes');
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('dev'));

// Routes
app.use('/metclinic', require('../server/routes/patientRoutes.js'));
app.use('/metclinic', require('../server/routes/appointmentRoutes.js'));
app.use('/metclinic', require('../server/routes/authRoutes.js'));
app.use('/metclinic', require('../server/routes/doctorRoutes.js'));
app.use('/metclinic', require('../server/routes/videoRoutes.js'));
app.use('/metclinic', require('../server/routes/prescriptionRoutes.js'));
app.use('/metclinic', require('../server/routes/paymentsRoutes.js'));

// app.use('/metclinic', (req, res, next) => {
//   console.log('Request Type:', req.method)
// });

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build/index.html'));
  });
}

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
