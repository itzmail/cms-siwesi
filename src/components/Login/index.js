import React, { useState } from 'react';
import Swal from 'sweetalert2';

import { login } from '../../api';
import StorageUtil from '../../utils/storage';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleLogin = e => {
    e.preventDefault();
    if (email && password) {
      Swal.showLoading();

      login(email, password).then(response => {
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Login success',
          showConfirmButton: false,
          timer: 1500,
          willClose: () => {
            StorageUtil.setToken(response['accessToken']);
            StorageUtil.setIsAuthenticated(true);
            navigate('/dashboard', { replace: true })
          }
        });
      }).catch(error => {
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Error login ' + error,
          showConfirmButton: false,
          timer: 1500,
        });
      });

      Swal.close();
    } else {
      Swal.fire({
        timer: 1500,
        showConfirmButton: false,
        willOpen: () => {
          Swal.showLoading();
        },
        willClose: () => {
          Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'Incorrect email or password.',
            showConfirmButton: true,
          });
        },
      });
    }
  };

  return (
    <div className="small-container">
      <form onSubmit={handleLogin}>
        <h1>Admin Login</h1>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          placeholder="admin@example.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          name="password"
          placeholder="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <input style={{ marginTop: '12px' }} type="submit" value="Login" />
      </form>
    </div>
  );
};

export default Login;
