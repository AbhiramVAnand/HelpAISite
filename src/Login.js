import React, { useState } from 'react';
import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import { useNavigate } from 'react-router-dom'; // For navigation
import { getDatabase, ref, get, onValue } from 'firebase/database';
import logo from '../img/icon.svg'
import setLoginCookie from './setLoginCookie.js';
import SetUid from './SetUid.js';

const app = firebase.initializeApp({
  apiKey: "AIzaSyCDRAoBX79TlG3bj5vrE4ozvB2unbIgq7w",
  authDomain: "helpai-e27bd.firebaseapp.com",
  projectId: "helpai-e27bd",
  storageBucket: "helpai-e27bd.appspot.com",
  messagingSenderId: "855494177900",
  appId: "1:855494177900:web:32d7cacdb819d6f62a5449",
  measurementId: "G-XM26DYX86J"
});

const db = getDatabase(app);

const Login = () => {
  const navigate = useNavigate();
  const [mailValue, setMailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');

  const handleMailChange = (event) => {
    setMailValue(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPasswordValue(event.target.value);
  };

  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(emailRegex.test(email)){
      return true;
    }else{
      alert("Enter a valid mail id!");
      return false;
    }
  }

  const getUsername = async (user) => {
    const userRef = ref(db, `users/${user.uid}`);
    try {
      SetUid(user.uid);
      const username = onValue(userRef, (snapshot) => {
        const data = snapshot.val();
        setLoginCookie(data.nameValue); 
      });
    } catch (error) {
      console.error('Error storing username:', error);
      // Handle storage errors (e.g., display error message)
    }
  };

  function validatePassword(password) {
    const minLength = 8; // Minimum password length
    if (password.length < minLength) {
      alert("Password must be at least 8 characters long.");
      return false;
    }
    return true; // Password is valid
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      if(passwordValue != null  && mailValue !=null && validatePassword(passwordValue) && validateEmail(mailValue))
      {

        const auth = await firebase.auth().signInWithEmailAndPassword(mailValue, passwordValue);
        if(auth.user){
          getUsername(auth.user);
          alert("Log in Successfull");
          navigate('/userhome');
        }
      }
    } catch (error) {
      console.error(error.code);
      if(error.code=="auth/email-already-in-use"){
        alert("An account already exists with the entered mail. Please try logging in.");
      }else{
        alert("Invalid credentials");
      }
    }
  };

  return (
    <div className='login-container'>
      <div className='navbar'>
        <a href='/'><img id="logo" src={logo}/></a>
        <div className='login'>          
            <span>New to HelpAI?</span>&nbsp;
            <a href='/signup'>Sign Up</a>
        </div>
      </div>

      <div className='login-content-container'>
        <h1>Log in</h1>
        <form>
        <div id='mail'>
          <span>Mail id</span><br/>
          <input
            id="textBox"
            type="email"
            value={mailValue}
            onChange={handleMailChange}
            placeholder="ryanrey@comp.com"
          />
        </div>
        <div id='password'>
          <span>Password</span><br/>
          <input
            id="textBox"
            type="password"
            value={passwordValue}
            onChange={handlePasswordChange}
            placeholder="8 characters or more"
          />
        </div>
        <button onClick={handleLogin}>Log in</button>
        </form>
        </div>
    </div>
  );
};

export default Login;
