const client_id = 2;
const client_secret = "A70gUEybx2na3RqMIvpbasaWJCLIKEF6Q1FpIpo3";

export const authConfig = {
  login: {
    grant_type: "password",
    client_id: client_id,
    client_secret: client_secret,
  },
  refreshToken: {
    grant_type: "refresh_token",
    client_id: client_id,
    client_secret: client_secret,
    scope: "",
  },
};

export const baseUrl = "https://staging.devima.solutions/api";
