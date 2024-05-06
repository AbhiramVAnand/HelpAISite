import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import isLoggedIn from '../Auth';
import SignUp from './SignUp';
import Home from './Home';


const LandingPage = () => {
  return (
    <BrowserRouter>
      <Routes>
      isLoggedIn()?(<Route path='/user' element={<SignUp/>}/>):(<Route path="/home" element={<Home />} /> )
      </Routes>
    </BrowserRouter>
  );
};

export default LandingPage;
