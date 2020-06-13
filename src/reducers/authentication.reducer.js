import { userConstants } from '../constants';

let user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { loggedIn: true, user } : {loggedIn: false};

export function authentication(state = initialState, action) {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return {
        loggingIn: true,
        user: action.user
      };
    case userConstants.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        loggingIn :false,
        user: action.user
      };
    case userConstants.LOGIN_FAILURE:
      return {loggingIn:false};
    case userConstants.LOGOUT:
      return {
        loggingIn : false,
        loggedIn : false,
      };
    default:
      return state
  }
}