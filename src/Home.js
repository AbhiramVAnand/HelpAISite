import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './App.css'
import logo from './img/icon.svg'
import setMailCookie from './setMailCookie'
import { Link } from 'react-router-dom';

const Home = () => {
  const [isLoading, setIsLoading] = useState(false); // State for loading indicator
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState(''); // State to hold the input value

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };
  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  const handleSignup = () => {
    if(inputValue!=""){
      if(validateEmail(inputValue)){
        setMailCookie(inputValue);
        navigate('/signup');
      }else{
        alert("Enter a valid email!")
      }
      
    }else{
      alert("Enter mail first");
    }
  };
  return (
    <div className='home-container'>
        <div className='navbar'>
            <img id="logo" src={logo}/>
            <div className='navs'>
                <nav className='pages'>
                    <ul>
                        <li>
                          <Link to="#"><a>Home</a></Link>
                        </li>
                        <li>
                          <Link to="/documentation"><a>Documentation</a></Link>
                        </li>
                        <li>
                          <Link to="/aboutus"><a>About Us</a></Link>
                        </li>
                    </ul>
                </nav>
                <nav className='loginsignup'>
                  <ul>
                    <li>
                      <Link to = "/login"  id="login"><a>Log in</a></Link>
                    </li>
                    <li>
                      <Link to="/signup" id="signup"><a>Sign Up</a></Link>
                    </li>
                  </ul>
                </nav>
            </div>
            
        </div>

        <div className='home-content-container'>
          <center>
            <div id='motto'>The Future of Customer Service<br/>Fast, Friendly, AI-Driven.</div> <br/>
            <div id='descp'>
            Build an AI-powered chatbot that intelligently retrieves answers<br/>
            from your website, help center, and other resources.
            </div><br/>
            <div id='input'>
              <input
                id="textBox"
                type="email"
                value={inputValue}
                onChange={handleChange}
                placeholder="Enter your email here"
              />
              <button onClick={handleSignup} type='submit'>Sign Up</button>
            </div>
          </center>
        </div>
    </div>
  );
};

export default Home;
