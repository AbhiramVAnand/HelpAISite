import React from 'react';
import Cookies from 'js-cookie';

const GetUName = () => {
  return Cookies.get('helpaiUid');
};

export default GetUName;


