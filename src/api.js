import axios from 'axios';

export default axios.create({
    baseURL: 'http://localhost:3000/'/*'https://doctorcalendar-b8115.firebaseio.com/'*/
});
