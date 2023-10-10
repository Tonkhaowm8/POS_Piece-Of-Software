const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 4000;

const items = require('./routes.js');

app.use(cors({ origin: 'http://siraphop.com' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.json());

app.use('/api', items);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
