const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.status(200).send('Hello from the server side!');
});

app.post('/', (req, res) => {
  res.send('You can post now');
});
const port = 8000;
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on port ${port}....👩🏻‍💻`);
});
