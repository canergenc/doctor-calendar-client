import axios from "axios";
import { constants } from "../../variables/constants";


const request = async function (options, isHeader = true) {
  let authHeader = null;
  let header = null;
  if (isHeader) {
    authHeader = localStorage.getItem(constants.TOKEN);
    header = {
      Authorization: `Bearer ${authHeader} `,
    }
  }

  const client = axios.create({
    baseURL: constants.BASE_URL,
    headers: header
  });

  const onSuccess = function (response) {
    return response.data;
  };

  const onError = function (error) {

    if (error.response) {
      // Request was made but server responded with something
      // other than 2xx
      //console.log('Status:', error.response.status);
      //console.log('Data:', error.response.data);
      //console.log('Headers:', error.response.headers);
    } else {
      // Something else happened while setting up the request
      // triggered the error
      //console.log('Error Message:', error.message);
    }

    return Promise.reject(error.response || error.message);
  };

  return client(options)
    .then(onSuccess)
    .catch(onError);
};

export default request;
