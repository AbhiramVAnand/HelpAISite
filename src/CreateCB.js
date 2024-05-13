import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GetUName from './GetUName';
import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/database"
import { getDatabase, ref, set, onValue} from 'firebase/database';
import {getAuth} from 'firebase/auth'
import logo from './img/icon.svg'
import logowhite from './img/logowhite.svg'
import { Link } from 'react-router-dom';


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
const auth = getAuth();


const CreateCB = () =>{
    const [isLoading, setIsLoading] = useState(false); // State for loading indicator
    const navigate = useNavigate();
    const [urlValue, setUrlValue] = useState(''); 
    const [businessName, setbusinessName] = useState(''); 
    const [dataCount, setDataCount] = useState(0);
  
    const handleUrlChange = (event) => {
        setUrlValue(event.target.value);
    };
    const handleBusinessChange = (event) => {
        setbusinessName(event.target.value);
    };
  
    const handleSubmit = async() => {
      if(urlValue!=""){
        setIsLoading(true);
        try {
            
            const response = await fetch('https://f13e-103-179-196-164.ngrok-free.app/init?url=' + encodeURIComponent(urlValue), {
                method: 'GET', 
                headers: {
                  'Content-Type': 'application/json' 
                  }
              });
            const response2 = await fetch('https://f13e-103-179-196-164.ngrok-free.app/create', {
                method: 'GET', 
                headers: {
                  'Content-Type': 'application/json' 
                  }
              });
            const data = response.json();
            console.log('API response:', data);
            storeChatbotData();
             // Hide loading indicator after receiving response
            // Handle response data (e.g., display message)
          } catch (error) {
            console.error(error);
            setIsLoading(false); // Hide loading indicator in case of error
            alert('Error: Something went wrong!'); // Informative error message
          }
      }else{
        alert("Enter url first");
      }
    };
    const storeChatbotData = async () => {
        try{
            const userRef = ref(db, `chatbotdata/${auth.currentUser.uid}`);
            onValue(userRef, (snapshot) => {
                const count = snapshot.size;
                setDataCount(count+1);
            });
            const dataRef = ref(db, `chatbotdata/${auth.currentUser.uid}/${dataCount+1}`);
            await set(dataRef, { businessName, urlValue });
            console.log('Username stored successfully');
            setIsLoading(false);
            navigate('/deploy')
        }catch (error) {
            console.error(error);
            setIsLoading(false); // Hide loading indicator in case of error
            alert("Error in Store"); // Informative error message
          }
    };
    const name = GetUName();
    return (
        <div>
            {isLoading?(
                <div className="loading-screen">
                    <img id="logo" src={logo}/><br/>
                    <span className="loading-circle">
                        <div className="inner"></div>
                    </span>
                    <p>Loading...</p>
                </div>
            ):(
                <div className='userhome-container'>
                    <div className='navbar'>
                        <a href='/userhome'><img id="logo" src={logowhite}/></a>
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
                    </div>
                    <div className='create-content-container'>
                        <center>
                          <div id='motto'>Create Your Chatbot Now!</div> <br/>
                          <div id='descp'>
                          Enter the URL of the website you want to add as the Knowledge Base for your chatbot.
                          </div><br/>
                          <div id='input'>
                            <input
                              id="textBox"
                              type="text"
                              value={businessName}
                              onChange={handleBusinessChange}
                              placeholder="Enter your business name here"
                            /><br/>
                            <br/>
                            <input
                              id="textBox"
                              type="text"
                              value={urlValue}
                              onChange={handleUrlChange}
                              placeholder="Enter your url here"
                            /><br/>
                            <button onClick={handleSubmit} type='submit'>Create</button>
                          </div>
                        </center>
                </div>
                </div>
            )}
        </div>
      );
};

export default CreateCB;