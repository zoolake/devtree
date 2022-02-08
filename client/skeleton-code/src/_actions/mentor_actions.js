import axios from 'axios';
import { GET_MENTORS, MENTOR_DETAIL, GET_REVIEWS, GET_TEAM } from './types';

export function getMentors() {
  const request = axios
    .get(`https://61f649b22e1d7e0017fd6d42.mockapi.io/mentor`)
    .then((response) => response.data);
  return { type: GET_MENTORS, payload: request };
}

export function detailMentor(id) {
  const request = axios
    .get(`https://61f649b22e1d7e0017fd6d42.mockapi.io/mentor/${id}`)
    .then((response) => response.data);
  return { type: MENTOR_DETAIL, payload: request };
}

export function getSchedule(dataToSubmit) {
  const request = axios
    .get(`https://61f649b22e1d7e0017fd6d42.mockapi.io/mentor`, dataToSubmit)
    .then((response) => response.data);
  return { type: MENTOR_DETAIL, payload: request };
}

export function getTeams(dataToSubmit) {
  const request = axios
    .get(`https://61f649b22e1d7e0017fd6d42.mockapi.io/mentor`, dataToSubmit)
    .then((response) => response.data);
  return { type: GET_TEAM, payload: request };
}

export function getReview(id) {
  const request = axios.get(``).then((response) => response.data);
  return { type: GET_REVIEWS, payload: request };
}
