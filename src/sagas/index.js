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
    const token = yield call(api.loginUser, action.user);
    yield localStorage.setItem("token", token.access_token.toString());
    yield localStorage.setItem("refresh-token", token.refresh_token.toString());
    yield put(loginUserSuccess());
  } catch (e) {
    yield put(loginUserError());
  }
}

function* logoutUser() {
  try {
    yield localStorage.clear();
    yield put(logoutUserSuccess());
  } catch (e) {
    console.log(e.message);
  }
}

function* getUsers() {
  try {
    const token = yield localStorage.getItem("token");
    const users = yield call(api.getUsers, token);
    yield put(getUsersSuccess(users));
  } catch (e) {
    console.log(e.message);
    yield fork(refreshToken);
  }
}

function* refreshToken() {
  try {
    const token = localStorage.getItem("refresh-token");
    const data = yield call(api.refreshToken, token);
    yield localStorage.setItem("token", data.access_token.toString());
    yield localStorage.setItem("refresh-token", data.refresh_token.toString());
    yield fork(getUsers);
  } catch (e) {
    yield fork(logoutUser);
  }
}

function* saga() {
  yield takeLatest("LOGIN_USER", loginUser);
  yield takeLatest("LOGOUT_USER", logoutUser);
  yield takeLatest("GET_USERS_REQUEST", getUsers);
}

export default saga;
