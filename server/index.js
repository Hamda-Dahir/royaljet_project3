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
// const loginRoute = require('./routes/login.js');

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());
// app.use(
//   cors({
//     origin: ['http://localhost:5173'],
//     methods: ['GET', 'POST'],
//     credentials: true,
//   })
// );

// const varifyUser = (req, res, next) => {
//   const token = req.cookies.token;
//   if (!token) {
//     return res.json('Token is missing');
//   } else {
//     jwt.verify(token, 'jwt-secret-key', (err, decoded) => {
//       if (err) {
//         return res.json('Error with token');
//       } else {
//         if (decoded.role === 'admin') {
//           next();
//         } else {
//           return res.json('not admin');
//         }
//       }
//     });
//   }
// };

// app.get('/dashboard', varifyUser, (req, res) => {
//   res.json('Success');
// });

app.get('/', (req, res) => {
  res.status(200).json('This is the main page of the api');
});

app.post('/auth', (req, res) => {
  AuthModel.create(req.body)
    .then((auth) => res.json(auth))
    .catch((err) => res.json(err));
});

// app.post('/login', (req, res) => {
//   const { email, password } = req.body;
//   UserModel.findOne({ email: email }).then((user) => {
//     if (user) {
//       bcrypt.compare(password, user.password, (err, response) => {
//         if (response) {
//           const token = jwt.sign(
//             { email: user.email, role: user.role },
//             'jwt-secret-key',
//             { expiresIn: '1d' }
//           );
//           res.cookie('token', token);
//           return res.json({ Status: 'Success', role: user.role });
//         } else {
//           return res.json('The password is incorrect');
//         }
//       });
//     } else {
//       return res.json('No record existed');
//     }
//   });
// });

// routes
app.use('/users', usersRoutes);
app.use('/expenses', expensesRoutes);
app.use('/orders', ordersRoutes);
// app.use('/login', loginRoute);

app.listen(process.env.PORT, () => {
  connectDB();
  console.log('App is running at port ' + process.env.PORT);
});
