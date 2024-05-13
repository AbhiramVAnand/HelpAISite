import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/database"
import { getDatabase, ref, set } from 'firebase/database';
import GetMail from './GetMail.js';
import logo from './img/icon.svg'
import setLoginCookie from './setLoginCookie.js';

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

function SignUp(props) {
  const navigate = useNavigate();
  const [nameValue, setNameValue] = useState('');
  const [mailValue, setMailValue] = useState(GetMail());
  const [passwordValue, setPasswordValue] = useState('');

  const handleNameChange = (event) => {
    setNameValue(event.target.value);
  };
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
  const storeUsername = async (user) => {
    const userRef = ref(db, `users/${user.uid}`);
    try {
      await set(userRef, { nameValue });
      console.log('Username stored successfully');
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
      if(passwordValue != null  && mailValue !=null &&  nameValue !=null && validatePassword(passwordValue) && validateEmail(mailValue))
      {

        const auth = await firebase.auth().createUserWithEmailAndPassword(mailValue, passwordValue);
        if(auth.user){
          storeUsername(auth.user);
          setLoginCookie(nameValue);
          alert("Sign Up Successfull");
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
    <div className='signup-container'>
      <div className='navbar'>
        <a href='/'><img id="logo" src={logo}/></a>
        <div className='login'>          
            <span>Already have an account?</span>&nbsp;
            <Link to = "/login"  id="login"><a>Log in</a></Link>
        </div>
      </div>

      <div className='signup-content-container'>
        <h1>Create your account</h1>
        <form>
        <div id='name'>
          <span>Full name</span><br/>
          <input
            id="textBox"
            type="mail"
            value={nameValue}
            onChange={handleNameChange}
            placeholder="Ryan Reynolds"
          />
        </div>
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
        <button onClick={handleLogin}>Create account</button>
        </form>
        </div>
    </div>
  );
}

export default SignUp;

