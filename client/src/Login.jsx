import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getAllUsers, login } from './api';

function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  const handleSubmit = (e) => {
    e.preventDefault();
    // handleLogin();
    axios
      .post('http://localhost:5000/login', { email, password })
      .then((res) => {
        console.log('login: ' + res.data);
        if (res.data === 'Success') {
          navigate('/');
          // if (res.data.role === 'admin') {
          //   navigate('/');
        }
      })
      .catch((err) => console.log(err));
  };

  // const handleLogin = async () => {
  //   try {
  //     const data = await login({ email, password });

  //     if (data) {
  //       navigate('/');
  //     } else {
  //       navigate('/');
  //     }
  //   } catch (error) {
  //     console.error('Error fetching users:', error);
  //   }
  // };

  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-100 vw-100">
      <div className="bg-white p-3 rounded w-25">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email">
              <strong>Email</strong>
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              autoComplete="off"
              name="email"
              // value={'jama@gmail.com'}
              className="form-control rounded-0 w-100"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email">
              <strong>Password</strong>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              name="password"
              // value={'1234'}
              className="form-control rounded-0 w-100"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-success w-100 rounded-0">
            Login
          </button>
        </form>
        {/* <p>Already Have an Account</p>
        <Link
          to="/signup"
          className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none"
        >
          Sign Up
        </Link> */}
      </div>
    </div>
  );
}

export default Login;
