import {
  LOGIN_USER,
  REGISTER_USER,
  AUTH_USER,
  LOGOUT_USER,
  IDCHECK_USER,
  DETAIL_USER,
  PASSWORD_UPDATE,
  DELETE_USER,
  UPDATE_USER
} from '../_actions/types';

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = {}, action) {
  switch (action.type) {
    case UPDATE_USER:
      return { ...state, updateUser: action.payload };
    case DELETE_USER:
      return { ...state, delete: action.payload };
    case REGISTER_USER:
      return { ...state, register: action.payload };
    case IDCHECK_USER:
      return { ...state, idcheck: action.payload };
    case LOGIN_USER:
      return { ...state, loginSucces: action.payload };
    case AUTH_USER:
      return { ...state, userData: action.payload };
    case DETAIL_USER:
      return { ...state, userData: action.payload };
    case PASSWORD_UPDATE:
      return { ...state, userData: action.payload };
    case LOGOUT_USER:
      return { ...state };
    default:
      return state;
  }
}
