import axios from 'axios';
import {
  LOGIN_USER,
  REGISTER_USER,
  AUTH_USER,
  LOGOUT_USER,
  IDCHECK_USER,
  DETAIL_USER,
  PASSWORD_UPDATE,
  DELETE_USER,
  UPDATE_USER
} from './types';
import { USER_SERVER } from '../components/config';
import setAuthorizationToken from '../utils/setAuthorizationToken';

export function getStudy() {
  const request = axios
    .get(`https://61f649b22e1d7e0017fd6d42.mockapi.io/project`)
    .then((response) => response.data);

  return { type: UPDATE_USER, payload: request };
}
export function getProject() {
  const request = axios
    .get(`https://61f649b22e1d7e0017fd6d42.mockapi.io/project`)
    .then((response) => response.data);

  return { type: UPDATE_USER, payload: request };
}
export function getTech() {
  const request = axios
    .put(`https://61f649b22e1d7e0017fd6d42.mockapi.io/tech`)
    .then((response) => response.data);

  return {
    type: UPDATE_USER,
    payload: request
  };
}

export function updateUser(dataToSubmit) {
  const request = axios.put(`/v1/user`, dataToSubmit).then((response) => response.data);

  return {
    type: UPDATE_USER,
    payload: request
  };
}

export function deleteUser(dataToSubmit) {
  const request = axios
    .delete(`${USER_SERVER}/password/1`, dataToSubmit)
    .then((response) => response.data);

  return {
    type: DELETE_USER,
    payload: request
  };
}

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
  console.log(dataToSubmit);
  const request = axios.post(`/v1/user/signup`, dataToSubmit).then((response) => response.data);

  return {
    type: REGISTER_USER,
    payload: request
  };
}

export function detailUser() {
  const request = axios.get(`/v1/user`).then((response) => response.data);
  console.log(request);
  return {
    type: DETAIL_USER,
    payload: request
  };
}

export function idcheckUser(dataToSubmit) {
  const request = axios.post(`/v1/user/idcheck`, dataToSubmit).then((response) => response.data);

  return {
    type: IDCHECK_USER,
    payload: request
  };
}

export function loginUser(dataToSubmit) {
  const request = axios.post(`/v1/user/login`, dataToSubmit).then((response) => {
    if (response.data.accessToken) {
      const token = response.data.accessToken;
      localStorage.setItem('user', token);
      setAuthorizationToken(token);
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