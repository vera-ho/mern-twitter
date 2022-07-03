import axios from 'axios';

export const setAuthToken = token => {
    if(token) {
        axios.defaults.headers.common['Authorization'] = token;
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }
}

export const signup = (userData) => {
    return axios.post('http://localhost:3001/api/users/register', userData);
  };
  
  export const login = (userData) => {
    return axios.post('http://localhost:3001/api/users/login', userData);
  };