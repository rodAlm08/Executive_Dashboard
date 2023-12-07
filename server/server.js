const express = require('express');
const cors = require('cors');

const mysql = require('mysql2');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;


// Use the cors middleware
app.use(cors());

// MySQL database connection configuration
const db = mysql.createConnection({
  host: 'db-statistics.cck8oxxnv9u0.us-east-1.rds.amazonaws.com',
  user: 'root',
  password: 'rootroot',
  database: 'information_schema',
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL');
  }
});

// Middleware to parse JSON in the request body
app.use(bodyParser.json());

// API endpoint to get data
app.get('/api/data', (req, res) => {
  const query = 'SHOW TABLES';
  db.query(query, (error, results) => {
    if (error) {
      console.error('Error executing MySQL query:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(results);
    }
  });
});

// API endpoint to add data
app.post('/api/data', (req, res) => {
  const newData = req.body;
  const query = 'INSERT INTO your_table_name SET ?';
  db.query(query, newData, (error, results) => {
    if (error) {
      console.error('Error executing MySQL query:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(results);
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
