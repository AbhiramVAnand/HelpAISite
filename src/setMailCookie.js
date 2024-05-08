import React from 'react';
import Cookies from 'js-cookie';

const setMailCookie = (mail) =>{
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate()+300);
  Cookies.set('mail',mail,{expires: expirationDate});
};
export default setMailCookie;


