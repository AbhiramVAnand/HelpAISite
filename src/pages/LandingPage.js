import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import isLoggedIn from '../Auth';
import UserHome from './UserHome';
import Home from './Home';


const LandingPage = () => {
  return (
    <BrowserRouter>
      <Routes>
      isLoggedIn()?(<Route path='/userhome' element={<UserHome/>}/>):(<Route path="/home" element={<Home />} /> )
      </Routes>
    </BrowserRouter>
  );
};

export default LandingPage;
