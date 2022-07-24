require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

const app = express();

mongoose.connect(process.env.CONNECTION_STRING);
const dbConnection = mongoose.connection;
dbConnection.on('error', (error) => console.error(error));
dbConnection.once('open', () => console.log('DB connection was successful'));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
