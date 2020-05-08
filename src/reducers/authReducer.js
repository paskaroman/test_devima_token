import {
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  LOGOUT_USER,
  LOGOUT_USER_SUCCES,
} from "../actions/authActions";

const initialState = {
  isAuth: false,
  isAuthErr: false,
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        isAuth: false,
      };
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        isAuth: true,
        isAuthErr: false,
      };
    case LOGIN_USER_ERROR:
      return {
        ...state,
        isAuth: false,
        isAuthErr: true,
      };
    case LOGOUT_USER:
      return {
        ...state,
        isAuth: false,
      };
    case LOGOUT_USER_SUCCES:
      return {
        ...state,
        isAuth: false,
      };
    default:
      return state;
  }
};

export default auth;
