const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const config = require('config');
const cors = require('cors');

const db = config.get("mongoURI");

const app = express();
app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, './client')));

const tasks = require('./routes/task');
const users = require('./routes/user');

app.use('/users', users);
app.use('/tasks', tasks);

mongoose.connect(db, { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
 }).then(() => {
     console.log("MongoDB connection succesfully made.");
    })
    .catch(err => {
        console.log(err);
    });
    

const PORTNO = 8000 || process.env.PORT;

app.listen(PORTNO, () => {
    console.log(`Server listening on port: ${PORTNO}`)
})