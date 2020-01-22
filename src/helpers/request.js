import axios from 'axios';
import endpoints from 'constants/endpoints.json';


const client = axios.create({
  baseURL: endpoints.host
});

const request = function(options) {
  const onSuccess = function(response) {
    console.debug('Request Successful!', response);
    // toast.success(<Message name={'Request Successful'}/>, optionsSuccess);
    console.log(response.data);
    return response.data;
  };

  const onError = function(error) {
    console.error('Request Failed:', error.config);

    if (error.response) {
      // Request was made but server responded with something
      // other than 2xx
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);

      if (localStorage.getItem('user') !== null) {
        if (error.response.data === 'AUTHENTICATION FAILED!') {
          localStorage.removeItem('user');
          window.location.reload();
        }
      }
      if (error.response.status === 500) {
        error.response.data = 'Error Message:' + ' Something went wrong!';
      }
      // toast.error(<Message name={error.response.data}/>, optionsError);
      console.error('Headers:', error.response.headers);

    } else {
      // Something else happened while setting up the request
      // triggered the error
      error.response = {};
      error.response.data = 'Error Message:' + ' Something went wrong!';
      console.error('Error Message:', error.message);
      // toast.error(<Message name={error.message}/>, optionsError);

    }

    return Promise.reject(error.response || error.message);
  };


  return client(options)
    .then(onSuccess)
    .catch(onError);
};
export default request;