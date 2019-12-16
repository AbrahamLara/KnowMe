const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const PORT = 5000;

const app = express();

app.use(express.json());

// MongoDB setup
mongoose
  .connect(config.get('mongoURI'), {
    useNewUrlParser: true,
    useCreateIndex: true
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch(() => console.log('Failed to connect to MongoDB'));

// To keep routes organized specific api calls
// will be handled by their respective routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});