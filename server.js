const express = require('express');
const app = express();
const port = 3001;

const cors = require('cors');

const corsOptions = {
  origin: 'http://localhost:3000',
  optionSuccessStatus: 200
}

app.use(cors(corsOptions));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(3001, () => {
  console.log(`Listening on port ${port}`);
});