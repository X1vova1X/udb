const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors({
    origin: 'https://udirect.rf.gd' // Specify your origin
}));

// Use express.json() to parse JSON request bodies
app.use(express.json());

// In-memory database
let database = {};

// POST endpoint to add a new value
app.post('/values', (req, res) => {
  const { value } = req.body;
  const { id } = req.body;
  const id2 = String({ id });
  database[id] = value;
  res.status(201).json({ id2 });
});

// GET endpoint to retrieve all values
app.get('/values', (req, res) => {
  res.json(database);
});

app.get('/db/clear', (req, res) => {
  database = {};
  res.send("DB cleared.")
});

app.post('/db/set', (req, res) => {
  const body = JSON.stringify(req.body);
  database = { body };
  res.send("DB set.")
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
