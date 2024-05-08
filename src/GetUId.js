import React from 'react';
import Cookies from 'js-cookie';

const GetUId = () => {
  return Cookies.get('Uid');
};

export default GetUId;


