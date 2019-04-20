"use strict"; 
const express = require("express");
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

// Connect To Database  
mongoose.connect(config.database);

// On Connection Successful
mongoose.connection.on('connected',() =>{
    console.log('Connected to database ' +config.database);
});

// On Error Connection 
mongoose.connection.on('error',(err) =>{
    console.log('Error to database connection ' +err);
});

const app = express();
const users = require('./routes/users');

// port Number
const port = process.env.PORT || 8080;

// CORS Middleware
app.use(cors());

// Set Static Public folder
app.use(express.static(path.join(__dirname, 'public')));

// Body parser Middleware
app.use(bodyParser.json());

// Passport Middleware 
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users',users);

// Index Route
app.get('/',(req,res)=>{
    res.send('Invalid Endpoint breakdown hell');
});

// Server starting format
app.listen(port, () => {
    console.log('server started on part ' +port);
});