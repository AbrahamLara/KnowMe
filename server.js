const express = require('express');
const mongoose = require('mongoose');

const users = require('./routes/api/users');

const app = express();

const port = 3001;

app.use(express.json());

// MongoDB setup
mongoose
  .connect('mongodb://admin:admin@localhost:27017/knowme', {
    useNewUrlParser: true,
    useCreateIndex: true
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch(e => console.log(e));

app.use('/api/users', users);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});