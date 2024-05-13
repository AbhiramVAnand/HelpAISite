import React, { useState, useEffect } from 'react';
import GetUName from './GetUName';
import logo from './img/logowhite.svg'
import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/database"
import { getDatabase, ref, set, onValue} from 'firebase/database';
import {getAuth} from 'firebase/auth'
import GetUId from './GetUId';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus, faPlayCircle, faNoteSticky } from '@fortawesome/free-solid-svg-icons';


const app = firebase.initializeApp({
    apiKey: "AIzaSyCDRAoBX79TlG3bj5vrE4ozvB2unbIgq7w",
    authDomain: "helpai-e27bd.firebaseapp.com",
    projectId: "helpai-e27bd",
    storageBucket: "helpai-e27bd.appspot.com",
    messagingSenderId: "855494177900",
    appId: "1:855494177900:web:32d7cacdb819d6f62a5449",
    measurementId: "G-XM26DYX86J"
});
  


const UserHome = () =>{
    const db = getDatabase(app);
    const user = GetUId();
    const dataRef = ref(db,`chatbotdata/${user}`);
    const [dataList, setDataList] = useState([]);

    try{
        useEffect(() => {
            const unsubscribe = onValue(dataRef, (snapshot) => {
            const data = snapshot.val();
            const formattedList = Object.values(data);
            setDataList(formattedList);        
            });
            return () => unsubscribe(); 
        }, [dataRef]);
    }catch (error) {
        console.error('Error: ', error);
    }
    const name = GetUName();
    return (
        <div className='userhome-container'>
            <div className='navbar'>
                <a href='/userhome'><img id="logo" src={logo}/></a>
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
            <div className='userhome-content-container'>
                <div id='welcome'>
                    <h1>Hey {name}!</h1>
                </div>
                <div id='chatbots'>
                    <h1 id='heading'>Chatbots</h1>
                    <div className='chatbot-list'>
                        <div className='items'  id='add'>
                            <a href='/createcb' id='add-chatbot'>
                                <span id='item'>
                                    <FontAwesomeIcon icon={faCirclePlus}  id='add-icon' />
                                    <div id='title'>Add new</div>
                                </span>
                            </a>
                        </div>                    
                        {dataList.map((item) => (
                            <div className='items'>
                                <a href='#' id='chatbot-items'>
                                    <span id='item'>
                                        <div id='title'>{item.businessName}</div>
                                        <div id='url'>{item.urlValue}</div>
                                    </span>
                                </a>
                            </div>
                         ))}
                        
                    </div>
                </div>
                <div id='get-started'>
                    <h1 id='heading'>Get Started</h1>
                    <div className='docs-list'>
                        <div className='items'>
                            <a href='#' id='items'>
                                <span id='item'>
                                    <FontAwesomeIcon icon={faPlayCircle}  id='icon' />
                                    <div id='title'>Watch</div>
                                </span>
                            </a>
                        </div>
                        <div className='items'>
                            <a href='#' id='items'>
                                <span id='item'>
                                    <FontAwesomeIcon icon={faNoteSticky}  id='icon'/>
                                    <div id='title'>Documentation</div>
                                </span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      );
};

export default UserHome;