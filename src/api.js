import axios from 'axios';

export default axios.create({
    baseURL: 'https://doctorcalendar.eu-gb.mybluemix.net/'
});
