require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoute = require('./routes/user');

const app = express();

// Middleware
app.use(express.json({ extended: false }))
app.use(cors())

mongoose.connect(process.env.CONNECTION_STRING);
const dbConnection = mongoose.connection;
dbConnection.on('error', (error) => console.error(error));
dbConnection.once('open', () => console.log('DB connection was successful'));

// Routes
app.use('/api/user', userRoute);


const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
