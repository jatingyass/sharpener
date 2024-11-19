const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');
const path = require('path');
const expenseRoutes = require('./routes/expenseRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Serve static files from the frontend folder
app.use(express.static(path.join(__dirname, '../frontend')));

// Routes for API
app.use('/api', expenseRoutes);

// Default route to handle '/' (if you need to send back index.html for root route)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// Create a connection to MySQL database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',  // Your MySQL username
    password: 'Jatin@1234',  // Your MySQL password
    database: 'expense_tracker',
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

// Set up the backend to listen on the desired port
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
