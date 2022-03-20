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

// 멘티 - 팀별 멘토링 신청 내역 조회
export function mentee_mentoringList(dataToSubmit) {
  const request = axios
    .get(`https://62049a60c6d8b20017dc35c3.mockapi.io/mentoringlist`)
    .then((response) => response.data);
  return { type: GET_MENTORINGLIST, payload: request };
}

// 멘토 - 멘토링 거절
export function rejectMentoring(dataToSubmit) {
  const request = axios
    .get(`https://62049a60c6d8b20017dc35c3.mockapi.io/mentoringlist`)
    .then((response) => response.data);
  return { type: GET_MENTORINGLIST, payload: request };
}

// 멘토 - 멘토링 수락
export function acceptMentoring(dataToSubmit) {
  const request = axios
    .get(`https://62049a60c6d8b20017dc35c3.mockapi.io/mentoringlist`)
    .then((response) => response.data);
  return { type: GET_MENTORINGLIST, payload: request };
}

// 멘토 - 멘토링 리스트 조회
export function getMentoringlist() {
  const request = axios
    .get(`https://62049a60c6d8b20017dc35c3.mockapi.io/mentoringlist`)
    .then((response) => response.data);
  return { type: GET_MENTORINGLIST, payload: request };
}

// 임시 멘토 만드는 매서드
export function setMentor() {
  const request = axios
    .get(`https://61f649b22e1d7e0017fd6d42.mockapi.io/mentor`)
    .then((response) => response.data);
  return { type: SET_MENTOR, payload: request };
}

// 멘토 - 멘토링 가능시간 저장
export function saveMentoringTime() {
  const request = axios
    .get(`https://620113cafdf509001724980b.mockapi.io/api/v1/Possibletime`)
    .then((response) => response.data);
  return { type: GET_TIMELIST, payload: request };
}

// 멘토가 저장한 멘토링 시간 불러오기
export function getCheckedtimeList() {
  const request = axios
    .get(`https://620113cafdf509001724980b.mockapi.io/api/v1/Possibletime`)
    .then((response) => response.data);
  return { type: GET_TIMELIST, payload: request };
}

// 멘토의 예약시간들을 불러오기
export function getReservedList() {
  const request = axios
    .get(`https://62049a60c6d8b20017dc35c3.mockapi.io/reserved`)
    .then((response) => response.data);
  return { type: GET_RESERVEDLIST, payload: request };
}

// 멘토 목록 조회
export function getMentors() {
  const request = axios
    .get(`https://61f649b22e1d7e0017fd6d42.mockapi.io/mentor`)
    .then((response) => response.data);
  return { type: GET_MENTORS, payload: request };
}

// 멘토 상세보기
export function detailMentor(id) {
  const request = axios
    .get(`https://61f649b22e1d7e0017fd6d42.mockapi.io/mentor/${id}`)
    .then((response) => response.data);
  return { type: MENTOR_DETAIL, payload: request };
}

// 멘토 프로필 업데이트
export function updateMentorProfile() {
  const request = axios
    .get(`https://61f649b22e1d7e0017fd6d42.mockapi.io/mentor}`)
    .then((response) => response.data);
  return { type: Update_MentorProfile, payload: request };
}

// 멘티 - 멘토링 신청할 때 시간 조회
export function getSchedule(dataToSubmit) {
  const request = axios
    .get(`https://620113cafdf509001724980b.mockapi.io/api/v1/time`, dataToSubmit)
    .then((response) => response.data);
  return { type: MENTOR_DETAIL, payload: request };
}

// 멘티 - 멘토링 신청할 자신의 팀 조회
export function getTeams(dataToSubmit) {
  const request = axios
    .get(`https://620113cafdf509001724980b.mockapi.io/api/v1/mentor_id`, dataToSubmit)
    .then((response) => response.data);
  return { type: GET_TEAM, payload: request };
}

// 멘로의 리뷰를 가져옴
export function getReview(dataToSubmit) {
  const request = axios
    .get(`https://620113cafdf509001724980b.mockapi.io/api/v1/review`, dataToSubmit)
    .then((response) => response.data);
  return { type: GET_REVIEWS, payload: request };
}

// 멘토링 신청
export function submitMentoring(dataToSubmit) {
  const request = axios.get(``).then((response) => response.data);
  return { type: GET_REVIEWS, payload: request };
}
