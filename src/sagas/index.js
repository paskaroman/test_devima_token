import { put, takeLatest, call, fork } from "redux-saga/effects";
import {
  loginUserSuccess,
  loginUserError,
  logoutUserSuccess,
} from "../actions/authActions";
import { getUsersSuccess } from "../actions/usersActions";
import api from "../api/api";

function* loginUser(action) {
  try {
    // login user and get tokens
    const token = yield call(api.loginUser, action.user);

    // set tokens to localStotage
    yield localStorage.setItem("token", token.access_token.toString());
    yield localStorage.setItem("refresh-token", token.refresh_token.toString());
    yield put(loginUserSuccess());
  } catch (e) {
    yield put(loginUserError());
  }
}

function* logoutUser() {
  try {
    // remove tokens
    yield localStorage.clear();
    yield put(logoutUserSuccess());
  } catch (e) {
    console.log(e.message);
  }
}

function* getUsers() {
  try {
    const token = yield localStorage.getItem("token");

    // get all users data by access_token
    const users = yield call(api.getUsers, token);

    // send users data to reducer
    yield put(getUsersSuccess(users));
  } catch (e) {
    /*TODO: modify API for best errors responses. Create handleError() layer
      if errors will be 5** (server errors) process will loop
    */

    // access_token expired
    yield fork(refreshAccessToken);
  }
}

function* refreshAccessToken() {
  try {
    const token = localStorage.getItem("refresh-token");

    // get new tokens by refresh_token
    const data = yield call(api.refreshAccessToken, token);
    yield localStorage.setItem("token", data.access_token.toString());
    yield localStorage.setItem("refresh-token", data.refresh_token.toString());

    // new access_token in localStorage. Make new call for users data
    yield fork(getUsers);
  } catch (e) {
    // refresh_token expired. Logout user
    yield fork(logoutUser);
  }
}

function* saga() {
  yield takeLatest("LOGIN_USER", loginUser);
  yield takeLatest("LOGOUT_USER", logoutUser);
  yield takeLatest("GET_USERS_REQUEST", getUsers);
}

export default saga;
