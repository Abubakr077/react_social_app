
import axios     from 'axios'
import endpoints from 'constants/endpoints.json'
import { toast } from 'react-toastify';
import React from "react";
import {Message, optionsError, optionsSuccess} from "../constants/constants";



/**
 * Create an Axios Client with defaults
 */
const client = axios.create({
    baseURL: endpoints.host
});



/**
 * Request Wrapper with default success/error actions
 */
const request = function(options) {
    const onSuccess = function(response) {
        console.debug('Request Successful!', response);
        // toast.success(<Message name={'Request Successful'}/>, optionsSuccess);
        // console.log(response.data);
        return response.data;
    }

    const onError = function(error) {
        console.error('Request Failed:', error.config);

        if (error.response) {
            // Request was made but server responded with something
            // other than 2xx
            console.error('Status:',  error.response.status);
            console.error('Data:',    error.response.data);

            if (error.response.status === 500){
                error.response.data = 'Error Message:' + ' Internal server error'
            }
            // toast.error(<Message name={error.response.data}/>, optionsError);
            console.error('Headers:', error.response.headers);

        } else {
            // Something else happened while setting up the request
            // triggered the error
            console.error('Error Message:', error.message);
            toast.error(<Message name={error.message}/>, optionsError);

        }

        return Promise.reject(error.response || error.message);
    }

    return client(options)
        .then(onSuccess)
        .catch(onError);
}

export default request;