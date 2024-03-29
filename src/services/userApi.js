import axios from 'axios';
const BASE_URL = `https://mern-auth-production-df5d.up.railway.app/api/v1/users`;

axios.defaults.withCredentials = true;

const signupApi = async obj => {
  try {
    const { data } = await axios.post(`${BASE_URL}/signup`, obj);
    return data.data.user;
  } catch (err) {
    throw err;
  }
};

const loginApi = async obj => {
  try {
    const { data } = await axios.post(`${BASE_URL}/login`, obj);
    return data.data.user;
  } catch (err) {
    throw err;
  }
};

const getUserApi = async () => {
  try {
    const { data } = axios.get(`${BASE_URL}/getUser`);
    return data.data.user;
  } catch (err) {
    throw err;
  }
};

const logoutApi = async () => {
  try {
    const { data } = await axios.get(`${BASE_URL}/logout`);
    return data.data;
  } catch (err) {
    throw err;
  }
};

export { signupApi, loginApi, getUserApi, logoutApi };
