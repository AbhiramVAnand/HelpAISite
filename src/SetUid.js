import React from 'react';
import Cookies from 'js-cookie';

const SetUid = (uid) =>{
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate()+300);
  Cookies.set('Uid',uid,{expires: expirationDate});
  return true;
};

export default SetUid;