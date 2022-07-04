import React from 'react';
import './App.css';

import SignUp from './Components/signup';
import Login from './Components/login';
import Dashboard from './Components/Dashboard';

import {BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/Dashboard' element={<Dashboard/>} />
      </Routes>

    </BrowserRouter>
  );
}


export default App;