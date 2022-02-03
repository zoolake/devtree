import axios from 'axios';
import {
  LOGIN_USER,
  REGISTER_USER,
  AUTH_USER,
  LOGOUT_USER,
  IDCHECK_USER,
  DETAIL_USER,
  PASSWORD_UPDATE
} from './types';
import { USER_SERVER } from '../components/config';
// import authHeader from "./auth-header"

export function passwordUpdate(dataToSubmit) {
  const request = axios
    .put(`${USER_SERVER}/password/1`, dataToSubmit)
    .then((response) => response.data);

  return {
    type: PASSWORD_UPDATE,
    payload: request
  };
}

export function registerUser(dataToSubmit) {
  const request = axios
    .post(`${USER_SERVER}/register`, dataToSubmit)
    .then((response) => response.data);

  return {
    type: REGISTER_USER,
    payload: request
  };
}

export function detailUser() {
  const request = axios.get(`http://localhost:8080/v1/user/me`).then((response) => response.data);

  return {
    type: DETAIL_USER,
    payload: request
  };
}

export function idcheckUser(dataToSubmit) {
  const request = axios
    .post(`${USER_SERVER}/idcheck`, dataToSubmit)
    .then((response) => response.data);

  return {
    type: IDCHECK_USER,
    payload: request
  };
}

export function loginUser(dataToSubmit) {
  const request = axios
    .post(`http://localhost:8080/v1/user/login `, dataToSubmit)
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem('user', JSON.stringify(response.data));
      }
    });
  return {
    type: LOGIN_USER,
    payload: request
  };
}

export function auth() {
  const request = axios.get(`${USER_SERVER}/login`).then((response) => response.data);

  return {
    type: AUTH_USER,
    payload: request
  };
}

export function logoutUser() {
  const request = axios.get(`${USER_SERVER}/logout`).then((response) => response.data);

  return {
    type: LOGOUT_USER,
    payload: request
  };
}
