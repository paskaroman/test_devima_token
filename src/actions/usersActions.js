//Action Types

export const GET_USERS_REQUEST = "GET_USERS_REQUEST";
export const GET_USERS_SUCCESS = "GET_USERS_SUCCESS";

//actions creators

export const getUsersRequest = () => {
  return {
    type: GET_USERS_REQUEST,
  };
};

export const getUsersSuccess = (users) => {
  return {
    type: GET_USERS_SUCCESS,
    users,
  };
};
