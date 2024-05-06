import React from 'react';
import Cookies from 'js-cookie';

const setLoginCookie = (userName) =>{
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate()+30);
  Cookies.set('helpaiUid',userName,{expires: expirationDate});
  return true;
};

export default setLoginCookie;