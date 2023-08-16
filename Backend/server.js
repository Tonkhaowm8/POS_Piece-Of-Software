const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;
const cors = require('cors');

app.use(cors());

app.get('/api', (req, res) => {
  res.json({ message: 'Hello from the backend!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
