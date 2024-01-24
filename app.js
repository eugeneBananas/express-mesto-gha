const express = require('express');
const { MongoClient } = require('mongodb');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');

const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;

const app = express();


mongoose.connect(DB_URL);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
    req.user = {
      _id: '65aefc6a48155116a73b503b'
    };
  
    next();
  }); 

app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));
  
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
});
