import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../Login';
import Dashboard from '../Dashboard';
import AddDataScreen from '../Dashboard/Add';
import { cekValidToken } from '../../api';
import { useNavigate } from 'react-router-dom';
import EditDataScreen from '../Dashboard/Edit';

const App = () => {

  const navigate = useNavigate();
  
  async function isAuthenticated(){
    try {
      const valid = await cekValidToken();
      console.log("this valid?", valid);
      if (valid) {
        navigate('/dashboard');
      }
      navigate('/login');
    } catch (error) {
      console.log("error", error);
      navigate('/login');
    }
  }


  return (
      <Routes>
        <Route path="/" element={<Navigate replace to={isAuthenticated ? "/dashboard" : "/login"} />} />
        <Route path="/crud-app" element={isAuthenticated ? <Navigate replace to="/dashboard" /> : <Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path='/add' element={<AddDataScreen />} />
        <Route path='/edit/:id' element={<EditDataScreen />} />
        {/* Optionally, handle redirection for users accessing the root path */}
      </Routes>
  )
};

export default App;
