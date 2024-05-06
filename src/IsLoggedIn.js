import React from 'react';
import Cookies from 'js-cookie';

const isLoggedIn = () => {
  if(Cookies.get('helpaiUid')!=null){
    return true;
  }
  return false;
};

export default isLoggedIn;


