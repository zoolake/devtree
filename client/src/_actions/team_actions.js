import axios from 'axios';
import { GET_TECH_LIST, GET_POSITION_LIST, CHANGE_TEAM_STATE } from './types';

export function getTechList() {
  const request = axios
    .get('/tech') // https://127.26.1.146:8080/v1/tech
    .then((response) => response);
  return { type: GET_TECH_LIST, payload: request };
}

export function getPositionList() {
  const request = axios
    .get('/position') // https://127.26.1.146:8080/v1/position
    .then((response) => response);
  return { type: GET_POSITION_LIST, payload: request };
}

export function changeTeamState(data) {
  const request = axios
    .put('/team/change/state', data) // https://127.26.1.146:8080/v1/team/change/state
    .then((response) => response);
  return { type: CHANGE_TEAM_STATE, payload: request };
}
