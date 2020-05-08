//Action Types

export const LOGOUT_USER = "LOGOUT_USER";
export const LOGOUT_USER_SUCCES = "LOGOUT_USER_SUCCES";
export const LOGIN_USER = "LOGIN_USER";
export const LOGIN_USER_SUCCESS = "LOGIN_USER_SUCCESS";
export const LOGIN_USER_ERROR = "LOGIN_USER_ERROR";

//actions creators
export const logoutUser = () => {
  return {
    type: LOGOUT_USER,
  };
};

export const logoutUserSuccess = () => {
  return {
    type: LOGOUT_USER_SUCCES,
  };
};

export const loginUser = (user) => {
  return {
    type: LOGIN_USER,
    user,
  };
};

export const loginUserSuccess = () => {
  return {
    type: LOGIN_USER_SUCCESS,
  };
};

export const loginUserError = () => {
  return {
    type: LOGIN_USER_ERROR,
  };
};
