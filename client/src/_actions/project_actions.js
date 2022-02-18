import axios from 'axios';
import {
  GET_PROJECT_LIST,
  CREATE_PROJECT,
  DELETE_PROJECT,
  GET_PROJECT_DETAIL,
  UPDATE_PROJECT,
  JOIN_PROJECT,
  GET_RESPONSE_PROJECT,
  ANSWER_PROJECT_RESPONSE
} from './types';

export function getProjectList() {
  const request = axios
    .get('/v1/project') // https://127.26.1.146:8080/v1/project
    .then((response) => response);
  return { type: GET_PROJECT_LIST, payload: request };
}

export function createProject(pjtData) {
  const request = axios
    .post('/v1/project', pjtData) // https://127.26.1.146:8080/v1/project
    .then((response) => response);
  return { type: CREATE_PROJECT, payload: request };
}

export function getProjectDetail(teamSeq) {
  const request = axios
    .get(`/v1/project/${teamSeq}`) // https://127.26.1.146:8080/v1/project/${teamSeq.id}
    .then((response) => response);
  return { type: GET_PROJECT_DETAIL, payload: request };
}

export function deleteProject(teamSeq) {
  const request = axios
    .delete(`/v1/project/${teamSeq}`) // https://127.26.1.146:8080/v1/project/${teamSeq.id}
    .then((response) => response);
  return { type: DELETE_PROJECT, payload: request };
}

export function updateProject(data) {
  const request = axios
    .put(`/v1/project/${data.teamSeq}`, data.dataToSubmit) // https://127.26.1.146:8080/v1/project/${teamSeq.id}
    .then((response) => response);
  return { type: UPDATE_PROJECT, payload: request };
}

export function joinProject(data) {
  const request = axios
    .post(`/v1/project/join/${data.teamSeq}`, data.dataToSubmit) // https://127.26.1.146:8080/v1/project/${teamSeq.id}
    .then((response) => response);
  return { type: JOIN_PROJECT, payload: request };
}

export function getProjectResponse(teamSeq) {
  const request = axios
    .get(`/v1/project/join/${teamSeq}`) // https://127.26.1.146:8080/v1/project/join/${teamSeq.id}
    .then((response) => response);
  return { type: GET_RESPONSE_PROJECT, payload: request };
}

export function answerProjectResponse(data) {
  const request = axios
    .post(`/v1/project/join/response/${data.teamSeq}`, data.dataToSubmit) // https://127.26.1.146:8080/v1/project/join/response/${teamSeq.id}
    .then((response) => response);
  return { type: ANSWER_PROJECT_RESPONSE, payload: request };
}
