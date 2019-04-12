const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

const port = 3001;

const corsOptions = {
  origin: 'http://localhost:3000',
  optionSuccessStatus: 200
}

app.use(bodyParser.json());
app.use(cors(corsOptions));

mongoose
  .connect('mongodb://admin:admin@localhost:27017/knowme')
  .then(() => console.log('Connected to MongoDB'))
  .catch(e => console.log(e));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});