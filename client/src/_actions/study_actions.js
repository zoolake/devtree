import axios from 'axios';
import {
  GET_STUDY_LIST,
  CREATE_STUDY,
  GET_TECH_LIST,
  GET_POSITION_LIST,
  DELETE_STUDY,
  GET_STUDY_DETAIL,
  UPDATE_STUDY,
  JOIN_STUDY
} from './types';

export function getStudyList() {
  const request = axios
    .get('/study') // https://127.26.1.146:8080/v1/study
    .then((response) => response);
  return { type: GET_STUDY_LIST, payload: request };
}

export function createStudy(pjtData) {
  const request = axios
    .post('/study', pjtData) // https://127.26.1.146:8080/v1/study
    .then((response) => response);
  return { type: CREATE_STUDY, payload: request };
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

export function getStudyDetail(teamSeq) {
  const request = axios
    .get(`/study/${teamSeq}`) // https://127.26.1.146:8080/v1/study/${teamSeq.id}
    .then((response) => response);
  return { type: GET_STUDY_DETAIL, payload: request };
}

export function deleteStudy(teamSeq) {
  const request = axios
    .delete(`/study/${teamSeq}`) // https://127.26.1.146:8080/v1/study/${teamSeq.id}
    .then((response) => response);
  return { type: DELETE_STUDY, payload: request };
}

export function updateStudy(data) {
  const request = axios
    .put(`/study/${data.teamSeq}`, data.dataToSubmit) // https://127.26.1.146:8080/v1/study/${teamSeq.id}
    .then((response) => response);
  return { type: UPDATE_STUDY, payload: request };
}

export function joinStudy(data) {
  const request = axios
    .post(`/study/${data.teamSeq}`, data.joinData) // https://127.26.1.146:8080/v1/study/${teamSeq.id}
    .then((response) => response);
  return { type: JOIN_STUDY, payload: request };
}
