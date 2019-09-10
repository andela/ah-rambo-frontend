import axios from 'axios';

const fetchData = async (method, url, data) => {
  axios.defaults.baseURL = 'https://authors-haven-development.herokuapp.com';
  axios.defaults.headers.common.Authorization = localStorage.getItem('token');
  const response = await axios({
    method,
    url,
    data,
  });
  return response;
};

export default fetchData;
