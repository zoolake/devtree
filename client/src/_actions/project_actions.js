import axios from 'axios';
import {
  GET_PROJECT_LIST,
  CREATE_PROJECT,
  GET_TECH_LIST,
  GET_POSITION_LIST,
  DELETE_PROJECT,
  GET_PROJECT_DETAIL,
  UPDATE_PROJECT
} from './types';

export function getProjectList() {
  const request = axios
    .get('/project') // https://127.26.1.146:8080/v1/project
    .then((response) => response);
  return { type: GET_PROJECT_LIST, payload: request };
}

export function createProject(pjtData) {
  const request = axios
    .post('/project', pjtData) // https://127.26.1.146:8080/v1/project
    .then((response) => response);
  return { type: CREATE_PROJECT, payload: request };
}

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

export function getProjectDetail(teamSeq) {
  const request = axios
    .get(`/project/${teamSeq}`) // https://127.26.1.146:8080/v1/project/${teamSeq.id}
    .then((response) => response);
  return { type: GET_PROJECT_DETAIL, payload: request };
}

export function deleteProject(teamSeq) {
  const request = axios
    .delete(`/project/${teamSeq}`) // https://127.26.1.146:8080/v1/project/${teamSeq.id}
    .then((response) => response);
  return { type: DELETE_PROJECT, payload: request };
}

export function updateProject(data) {
  const request = axios
    .put(`/project/${data.teamSeq}`, data.dataToSubmit) // https://127.26.1.146:8080/v1/project/${teamSeq.id}
    .then((response) => response);
  return { type: UPDATE_PROJECT, payload: request };
}

export function joinProject(data) {
  const request = axios
    .post(`/project/join/${data.teamSeq}`, data.dataToSubmit) // https://127.26.1.146:8080/v1/project/${teamSeq.id}
    .then((response) => response);
  return { type: UPDATE_PROJECT, payload: request };
}
