import axios from 'axios';
import { GET_MENTORS } from './types';

export function getMentors() {
  const request = axios
    .get(`https://61f649b22e1d7e0017fd6d42.mockapi.io/mentor`)
    .then((response) => response.data);
  return { type: GET_MENTORS, payload: request };
}
