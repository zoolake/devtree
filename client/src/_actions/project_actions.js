import axios from 'axios';
import {
  GET_PROJECT_LIST,
  CREATE_PROJECT,
  GET_TECH_LIST,
  GET_POSITION_LIST,
  DELETE_PROJECT,
  GET_PROJECT_DETAIL,
  UPDATE_PROJECT,
  JOIN_PROJECT,
  GET_RESPONSE_PROJECT,
  ANSWER_PROJECT_RESPONSE,
  CHANGE_PROJECT_STATE
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
  return { type: JOIN_PROJECT, payload: request };
}

export function getProjectResponse(teamSeq) {
  const request = axios
    .get(`/project/join/${teamSeq}`) // https://127.26.1.146:8080/v1/project/join/${teamSeq.id}
    .then((response) => response);
  return { type: GET_RESPONSE_PROJECT, payload: request };
}

export function answerProjectResponse(data) {
  console.log(data);
  const request = axios
    .post(`/project/join/response/${data.teamSeq}`, data.dataToSubmit) // https://127.26.1.146:8080/v1/project/join/response/${teamSeq.id}
    .then((response) => response);
  return { type: ANSWER_PROJECT_RESPONSE, payload: request };
}
