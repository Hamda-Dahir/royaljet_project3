const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./database/database.js');
// const userRouter = require('./routes/users.js');
const cors = require('cors');
// const mongoose = require('mongoose');
// const UserModel = require('./models/Users');

// import the routes
const usersRoutes = require('./routes/users.js');

const app = express();
dotenv.config();

// app.use(cors());
app.use(express.json());
app.use(cors({ credentials: true, origin: true }));

// mongoose.connect('mongodb+srv://crud:crud1234@cluster0.ssciyey.mongodb.net/');

app.get('/', (req, res) => {
  res.status(200).json('This is the main page of the api');
});

// app.get('/', (req, res) => {
//   UserModel.find({})
//     .then((users) => res.json(users))
//     .catch((err) => res.json(err));
// });

// app.get('/getUser/:id', (req, res) => {
//   const id = req.params.id;
//   UserModel.findById({ _id: id })
//     .then((users) => res.json(users))
//     .catch((err) => res.json(err));
// });

// app.post('/createUser', (req, res) => {
//   UserModel.create(req.body)
//     .then((users) => res.json(users))
//     .catch((err) => res.json(err));
// });

// app.put('/updateUser/:id', (req, res) => {
//   const id = req.params.id;
//   UserModel.findByIdAndUpdate(
//     { _id: id },
//     {
//       name: req.body.name,
//       email: req.body.email,
//       age: req.body.age,
//     }
//   )
//     .then((users) => res.json(users))
//     .catch((err) => res.json(err));
// });

// app.delete('/delete/:id', (req, res) => {
//   const id = req.params.id;
//   UserModel.findByIdAndRemove({ _id: id })
//     .then((users) => res.json(users))
//     .catch((err) => res.json(err));
// });

// routes
app.use('/users', usersRoutes);

app.listen(process.env.PORT, () => {
  connectDB();
  console.log('App is running at port ' + process.env.PORT);
});
