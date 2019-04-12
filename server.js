const express = require('express');
const mongoose = require('mongoose');
const config = require('config');

const app = express();

const port = 3001;

app.use(express.json());

// MongoDB setup
mongoose
  .connect(config.get('mongoURI'), {
    useNewUrlParser: true,
    useCreateIndex: true
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch(e => console.log(e));

app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});