import Cookies from 'js-cookie';

function GetMail() {
    const mail = Cookies.get('mail');
    return mail;
};
export default GetMail;

