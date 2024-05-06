import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import isLoggedIn from './IsLoggedIn';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import UserHome from './pages/UserHome';
import Login from './pages/Login';


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={isLoggedIn()?(<UserHome />):(<Home />)}/>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path='/userhome' element={<UserHome/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
