const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const db = require("./database.js");
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// CORS middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// API routes prefix
const API_PREFIX = '/api/v1';

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'API is running',
    timestamp: new Date().toISOString()
  });
});

// Serve static files only for non-API routes
app.use(express.static(path.join(__dirname, 'public')));

// GET all destinations
app.get(`${API_PREFIX}/destinos`, (req, res) => {
  try {
    const sql = "SELECT * FROM destinos";
    db.all(sql, [], (err, rows) => {
      if (err) {
        console.error('Database error:', err.message);
        res.status(500).json({ 
          error: 'Internal server error',
          message: 'Failed to retrieve destinations'
        });
        return;
      }
      
      // Parse the tags string back to an array
      const destinations = rows.map((row) => ({
        ...row,
        tags: JSON.parse(row.tags),
      }));
      
      res.status(200).json({
        success: true,
        message: "Destinations retrieved successfully",
        data: destinations,
        count: destinations.length
      });
    });
  } catch (error) {
    console.error('Server error:', error.message);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Unexpected error occurred'
    });
  }
});

// GET all packages
app.get(`${API_PREFIX}/pacotes`, (req, res) => {
  try {
    const sql = "SELECT * FROM pacotes";
    db.all(sql, [], (err, rows) => {
      if (err) {
        console.error('Database error:', err.message);
        res.status(500).json({ 
          error: 'Internal server error',
          message: 'Failed to retrieve packages'
        });
        return;
      }
      
      // Parse the includes string back to an array
      const packages = rows.map((row) => ({
        ...row,
        includes: JSON.parse(row.includes),
      }));
      
      res.status(200).json({
        success: true,
        message: "Packages retrieved successfully",
        data: packages,
        count: packages.length
      });
    });
  } catch (error) {
    console.error('Server error:', error.message);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Unexpected error occurred'
    });
  }
});

// GET specific destination by ID
app.get(`${API_PREFIX}/destinos/:id`, (req, res) => {
  try {
    const id = req.params.id;
    const sql = "SELECT * FROM destinos WHERE id = ?";
    
    db.get(sql, [id], (err, row) => {
      if (err) {
        console.error('Database error:', err.message);
        res.status(500).json({ 
          error: 'Internal server error',
          message: 'Failed to retrieve destination'
        });
        return;
      }
      
      if (!row) {
        res.status(404).json({
          success: false,
          message: "Destination not found"
        });
        return;
      }
      
      const destination = {
        ...row,
        tags: JSON.parse(row.tags),
      };
      
      res.status(200).json({
        success: true,
        message: "Destination retrieved successfully",
        data: destination
      });
    });
  } catch (error) {
    console.error('Server error:', error.message);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Unexpected error occurred'
    });
  }
});

// GET specific package by ID
app.get(`${API_PREFIX}/pacotes/:id`, (req, res) => {
  try {
    const id = req.params.id;
    const sql = "SELECT * FROM pacotes WHERE id = ?";
    
    db.get(sql, [id], (err, row) => {
      if (err) {
        console.error('Database error:', err.message);
        res.status(500).json({ 
          error: 'Internal server error',
          message: 'Failed to retrieve package'
        });
        return;
      }
      
      if (!row) {
        res.status(404).json({
          success: false,
          message: "Package not found"
        });
        return;
      }
      
      const packageData = {
        ...row,
        includes: JSON.parse(row.includes),
      };
      
      res.status(200).json({
        success: true,
        message: "Package retrieved successfully",
        data: packageData
      });
    });
  } catch (error) {
    console.error('Server error:', error.message);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Unexpected error occurred'
    });
  }
});

// Handle 404 for API routes
app.use(`${API_PREFIX}/*`, (req, res) => {
  res.status(404).json({
    success: false,
    message: "API endpoint not found",
    error: "The requested resource was not found"
  });
});

// Handle all other routes for SPA
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Travel API Server running at http://localhost:${PORT}`);
  console.log(`📊 API Documentation available at:`);
  console.log(`   GET  ${API_PREFIX}/destinos - Get all destinations`);
  console.log(`   GET  ${API_PREFIX}/destinos/:id - Get destination by ID`);
  console.log(`   GET  ${API_PREFIX}/pacotes - Get all packages`);
  console.log(`   GET  ${API_PREFIX}/pacotes/:id - Get package by ID`);
  console.log(`   GET  /health - Health check`);
});
