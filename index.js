const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors({
    origin: 'https://udirect.rf.gd' // Specify your origin
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// In-memory database
let database = {};

// POST endpoint to add a new value
app.post('/values', (req, res) => {
  const { value, id } = req.body;
  if (!value || !id) {
    return res.status(400).json({ error: 'Value and id are required.' });
  }
  database[id] = value;
  res.status(201).json({ id });
});

// GET endpoint to retrieve all values
app.get('/values', (req, res) => {
  res.json(database);
});

// Clear the database
app.get('/db/clear', (req, res) => {
  database = {};
  res.send("DB cleared.");
});

// Set the entire database
app.post('/db/set', (req, res) => {
  const newDatabase = req.body; // Expecting a JSON object
  if (typeof newDatabase !== 'object' || Array.isArray(newDatabase)) {
    return res.status(400).json({ error: 'Database must be an object.' });
  }
  database = newDatabase; // Set the entire database
  res.send("DB set.");
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
