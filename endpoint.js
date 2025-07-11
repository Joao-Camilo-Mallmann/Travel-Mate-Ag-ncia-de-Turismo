const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const db = require('./database.js');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint para obter todos os destinos
app.get('/api/destinos', (req, res) => {
  const sql = "SELECT * FROM destinos";
  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(400).json({ "error": err.message });
      return;
    }
    // Parse the tags string back to an array
    const destinations = rows.map(row => ({
        ...row,
        tags: JSON.parse(row.tags)
    }));
    res.json({
      "message": "success",
      "data": destinations
    });
  });
});

// Endpoint para obter todos os pacotes
app.get('/api/pacotes', (req, res) => {
  const sql = "SELECT * FROM pacotes";
  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(400).json({ "error": err.message });
      return;
    }
     // Parse the includes string back to an array
     const packages = rows.map(row => ({
        ...row,
        includes: JSON.parse(row.includes)
    }));
    res.json({
      "message": "success",
      "data": packages
    });
  });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});