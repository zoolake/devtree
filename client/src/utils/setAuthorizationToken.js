import axios from 'axios';

export default function setAuthorizationToken(token) {
  console.log('settoken!');
  console.log(token);
  if (token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common.Authorization;
  }
}
