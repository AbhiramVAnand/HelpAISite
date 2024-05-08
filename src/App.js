import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import isLoggedIn from './IsLoggedIn';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import UserHome from './pages/UserHome';
import Login from './pages/Login';
import CreateCB from './pages/CreateCB';
import Deploy from './pages/Deploy';
import Documentation from './pages/Documentation'
import AboutUs from './pages/AboutUs'


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={isLoggedIn()?(<UserHome />):(<Home />)}/>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path='/userhome' element={<UserHome/>}/>\
        <Route path='/home' element={<Home/>}/>
        <Route path='/createcb' element={<CreateCB/>}/>
        <Route path='/deploy' element={<Deploy/>}/>
        <Route path='/documentation' element={<Documentation/>}/>
        <Route path='/aboutus' element={<AboutUs/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
