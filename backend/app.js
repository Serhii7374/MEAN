const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const postRoutes = require('./routes/posts');
const path = require('path')

const app = express();

mongoose.connect('mongodb+srv://Olmer:L9wjyfKe7JPW5uIM@cluster0.yhdrtei.mongodb.net/?retryWrites=true&w=majority')
    .then(() => {
      console.log('Connections works!')
    })
    .catch(() => {
      console.log('something went wrong')
    });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/images', express.static(path.join('backend/images')));

app.use((req, res, next) => {
  console.log('first middleware 2');
  next();
});


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
  next();
});

app.use('/api/posts', postRoutes);

module.exports = app;
