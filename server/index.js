const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./database/database.js');
const cors = require('cors');

// import the routes
const usersRoutes = require('./routes/users.js');
const expensesRoutes = require('./routes/expenses.js');
const ordersRoutes = require('./routes/order.js');
const loginRoute = require('./routes/login.js');

const app = express();
dotenv.config();

// app.use(cors());
app.use(express.json());
app.use(cors({ credentials: true, origin: true }));

app.get('/', (req, res) => {
  res.status(200).json('This is the main page of the api');
});

// routes
app.use('/users', usersRoutes);
app.use('/expenses', expensesRoutes);
app.use('/orders', ordersRoutes);
app.use('/login', loginRoute);

app.listen(process.env.PORT, () => {
  connectDB();
  console.log('App is running at port ' + process.env.PORT);
});
