const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./database/database.js');
const cors = require('cors');
// const bcrypt = require('bcrypt');

const AuthModel = require('./models/Auth');

// import the routes
const usersRoutes = require('./routes/users.js');
const expensesRoutes = require('./routes/expenses.js');
const ordersRoutes = require('./routes/order.js');
const employeeRoutes = require('./routes/employee.js');
const loginRoutes = require('./routes/login.js');

const app = express();
dotenv.config();

// app.use(cors());
// Allow requests from 'http://localhost:5173'
const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json('This is the main page of the api');
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  AuthModel.findOne({ email: email }).then((user) => {
    if (user) {
      if (user.password === password) {
        res.json('Success');
      } else {
        res.json('the password is incorrect');
      }
    } else {
      res.json('No record existed');
    }
  });
});

app.post('/auth', (req, res) => {
  AuthModel.create(req.body)
    .then((auth) => res.json(auth))
    .catch((err) => res.json(err));
});

// routes
app.use('/users', usersRoutes);
app.use('/expenses', expensesRoutes);
app.use('/orders', ordersRoutes);
app.use('/employees', employeeRoutes);
app.use('/login', loginRoutes);

app.listen(process.env.PORT, () => {
  connectDB();
  console.log('App is running at port ' + process.env.PORT);
});
