const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://crud:crud1234@cluster0.ssciyey.mongodb.net/');

app.listen(3001, () => {
  console.log('Server is Running');
});
