import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import '../App.css'
import logo from '../img/icon.svg'
import setMailCookie from '../setMailCookie'

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

  // const handleSubmit = async () => {
  //   // if (!userInput) {
  //   //   return alert('Please enter a link');
  //   // }
  //   setIsLoading(true); // Show loading indicator
  //   try {
  //     const response = await fetch('http://127.0.0.1:5000/init?url=' + encodeURIComponent(userInput), {
  //       method: 'GET', 
  //       headers: {
  //         'Content-Type': 'application/json' // Set content type for JSON data
  //         }// Assuming GET request for simplicity (see note below)
  //     });
  //     const data = await response.json();
  //     console.log('API response:', data);
  //     if(!!data){
  //       setIsLoading(false);
  //     }
  //     navigate('/deploy')
  //      // Hide loading indicator after receiving response
  //     // Handle response data (e.g., display message)
  //   } catch (error) {
  //     console.error(error);
  //     setIsLoading(false); // Hide loading indicator in case of error
  //     alert('Error: Something went wrong!'); // Informative error message
  //   }
  // };

  return (
    <div className='home-container'>
        <div className='navbar'>
            <img id="logo" src={logo}/>
            <div className='navs'>
                <nav className='pages'>
                    <ul>
                        <li>
                            <a href="#">Home</a>
                        </li>
                        <li>
                            <a href="/signup">Documentation</a>
                        </li>
                        <li>
                          <a href="#">About Us</a>
                        </li>
                    </ul>
                </nav>
                <nav className='loginsignup'>
                  <ul>
                    <li>
                      <a href="login" id="login">Log in</a>
                    </li>
                    <li>
                      <a href="signup" id="signup">Sign Up</a>
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
