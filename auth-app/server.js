const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const app = express();
const cors = require('cors');
require('dotenv').config();

app.use(cors());

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/auth', authRoutes);

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
