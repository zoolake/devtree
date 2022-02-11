import axios from 'axios';
import {
  GET_PROJECT_LIST,
  CREATE_PROJECT,
  GET_TECH_LIST,
  GET_POSITION_LIST,
  DELETE_PROJECT,
  GET_PROJECT_DETAIL
} from './types';

export function getProjectList() {
  const request = axios
    .get('/project') // http://127.26.1.146:8080/v1/project
    .then((response) => response);
  return { type: GET_PROJECT_LIST, payload: request };
}

export function createProject(pjtData) {
  const request = axios
    .post('/project', pjtData) // http://127.26.1.146:8080/v1/project
    .then((response) => response);
  return { type: CREATE_PROJECT, payload: request };
}

export function getTechList() {
  const request = axios
    .get('/tech') // http://127.26.1.146:8080/v1/tech
    .then((response) => response);
  return { type: GET_TECH_LIST, payload: request };
}

export function getPositionList() {
  const request = axios
    .get('/position') // http://127.26.1.146:8080/v1/position
    .then((response) => response);
  return { type: GET_POSITION_LIST, payload: request };
}

export function getProjectDetail(teamSeq) {
  const request = axios
    .get(`/project/${teamSeq}`) // http://127.26.1.146:8080/v1/project/${teamSeq.id}
    .then((response) => response);
  return { type: GET_PROJECT_DETAIL, payload: request };
}

export function deleteProject(teamSeq) {
  const request = axios
    .delete(`/project/${teamSeq}`) // http://127.26.1.146:8080/v1/project/${teamSeq.id}
    .then((response) => response);
  return { type: DELETE_PROJECT, payload: request };
}
