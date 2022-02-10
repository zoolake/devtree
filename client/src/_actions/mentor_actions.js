import axios from 'axios';
import {
  GET_MENTORS,
  MENTOR_DETAIL,
  SET_MENTOR,
  GET_REVIEWS,
  GET_TEAM,
  Update_MentorProfile,
  GET_TIMELIST,
  GET_RESERVEDLIST,
  GET_MENTORINGLIST
} from './types';

export function rejectMentoring(dataToSubmit) {
  const request = axios
    .get(`https://62049a60c6d8b20017dc35c3.mockapi.io/mentoringlist`)
    .then((response) => response.data);
  return { type: GET_MENTORINGLIST, payload: request };
}

export function acceptMentoring(dataToSubmit) {
  const request = axios
    .get(`https://62049a60c6d8b20017dc35c3.mockapi.io/mentoringlist`)
    .then((response) => response.data);
  return { type: GET_MENTORINGLIST, payload: request };
}

export function getMentoringlist() {
  const request = axios
    .get(`https://62049a60c6d8b20017dc35c3.mockapi.io/mentoringlist`)
    .then((response) => response.data);
  return { type: GET_MENTORINGLIST, payload: request };
}

export function setMentor() {
  const request = axios
    .get(`https://61f649b22e1d7e0017fd6d42.mockapi.io/mentor`)
    .then((response) => response.data);
  return { type: SET_MENTOR, payload: request };
}

export function saveMentoringTime() {
  const request = axios
    .get(`https://620113cafdf509001724980b.mockapi.io/api/v1/Possibletime`)
    .then((response) => response.data);
  return { type: GET_TIMELIST, payload: request };
}

export function getCheckedtimeList() {
  const request = axios
    .get(`https://620113cafdf509001724980b.mockapi.io/api/v1/Possibletime`)
    .then((response) => response.data);
  return { type: GET_TIMELIST, payload: request };
}

export function getReservedList() {
  const request = axios
    .get(`https://62049a60c6d8b20017dc35c3.mockapi.io/reserved`)
    .then((response) => response.data);
  return { type: GET_RESERVEDLIST, payload: request };
}

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

export function updateMentorProfile() {
  const request = axios
    .get(`https://61f649b22e1d7e0017fd6d42.mockapi.io/mentor}`)
    .then((response) => response.data);
  return { type: Update_MentorProfile, payload: request };
}

export function getSchedule(dataToSubmit) {
  const request = axios
    .get(`https://620113cafdf509001724980b.mockapi.io/api/v1/time`, dataToSubmit)
    .then((response) => response.data);
  return { type: MENTOR_DETAIL, payload: request };
}

export function getTeams(dataToSubmit) {
  const request = axios
    .get(`https://620113cafdf509001724980b.mockapi.io/api/v1/mentor_id`, dataToSubmit)
    .then((response) => response.data);
  return { type: GET_TEAM, payload: request };
}

export function getReview(dataToSubmit) {
  const request = axios
    .get(`https://620113cafdf509001724980b.mockapi.io/api/v1/review`, dataToSubmit)
    .then((response) => response.data);
  return { type: GET_REVIEWS, payload: request };
}

export function submitMentoring(dataToSubmit) {
  const request = axios.get(``).then((response) => response.data);
  return { type: GET_REVIEWS, payload: request };
}
