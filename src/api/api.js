import axios from "axios";
import { authConfig, baseUrl } from "../config/authConfig";

class Api {
  loginUser(user) {
    const options = {
      ...authConfig.login,
      ...user,
    };

    return axios.post(`${baseUrl}/token`, options).then((res) => res.data);
  }

  refreshToken(token) {
    const options = {
      ...authConfig.refreshToken,
      refresh_token: token,
    };
    return axios.post(`${baseUrl}/token`, options).then((res) => res.data);
  }

  getUsers(token) {
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    };
    return axios.get(`${baseUrl}/users`, options).then((res) => res.data);
  }
}

export default new Api();
