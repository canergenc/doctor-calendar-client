import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://doctorcalendar-b8115.firebaseio.com/'
});


export default instance;