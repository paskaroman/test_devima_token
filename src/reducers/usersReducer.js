import { GET_USERS_REQUEST, GET_USERS_SUCCESS } from "../actions/usersActions";

const initialState = {
  users: [],
  isLoading: false,
  isError: false,
};

const users = (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case GET_USERS_SUCCESS:
      return {
        ...state,
        users: action.users,
        isLoading: false,
        isError: false,
      };
    default:
      return state;
  }
};

export default users;
