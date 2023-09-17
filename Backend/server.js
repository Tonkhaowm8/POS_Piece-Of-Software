const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 4000;
const cors = require('cors');

const items = require('./routes.js')

app.use(express.json())

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

app.use(cors());

//app.get('/api', (req, res) => {
//  res.json({ message: 'Hello from the backend!' });
//});

app.use('/api', items)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
