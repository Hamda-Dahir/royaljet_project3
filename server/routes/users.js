const express = require('express');
const UserModel = require('../models/User.js');

const router = express.Router();

const app = express();

// get all users
// app.get('/', (req, res) => {
//   UserModel.find({})
//     .then((users) => res.json(users))
//     .catch((err) => res.json(err));
//   console.log(users);
// });

// new api
router.get('/', (req, res) => {
  UserModel.find({})
    .then((users) => res.json(users))
    .catch((err) => res.status(500).json(err));
});

// get single user
app.get('/getUser/:id', (req, res) => {
  const id = req.params.id;
  UserModel.findById({ _id: id })
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

// create user
app.post('/createUser', (req, res) => {
  UserModel.create(req.body)
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

// update user
app.put('/updateUser/:id', (req, res) => {
  const id = req.params.id;
  UserModel.findByIdAndUpdate(
    { _id: id },
    {
      name: req.body.name,
      email: req.body.email,
      age: req.body.age,
    }
  )
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

// delete user
app.delete('/delete/:id', (req, res) => {
  const id = req.params.id;
  UserModel.findByIdAndRemove({ _id: id })
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

module.exports = router;
