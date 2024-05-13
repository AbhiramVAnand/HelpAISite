import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import isLoggedIn from './IsLoggedIn';
import SignUp from './SignUp';
import Home from './Home';
import UserHome from './UserHome';
import Login from './Login';
import CreateCB from './CreateCB';
import Deploy from './Deploy';
import Documentation from './Documentation'
import AboutUs from './AboutUs'


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
