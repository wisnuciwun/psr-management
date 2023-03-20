import axios from "axios";
import { BadgeNotif } from "components/BadgeNotification";
import { getCookie } from "tiny-cookie";
// import config from "@config";
// import { store } from "@config/store";
// import { logoutRequest } from 'actions/app';

const request = axios.create({
  baseURL: "https://api-dev.barayaswarga.com/api/v1",
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

const requestHandler = (request) => {
  let token = getCookie("token");

  if (token != undefined) {
    request.headers.Authorization = `Bearer ${token}`;
  }

  return request;
};

const responseHandler = (response) => {
  return response;
};

const errorHandler = (error) => {
  return error;
};

request.interceptors.request.use(
  (request) => requestHandler(request),
  (error) => errorHandler(error)
);

request.interceptors.response.use(
  (response) => responseHandler(response),
  (error) => errorHandler(error)
);

export default {
  get: (url, params, headers = {}) =>
    request({ method: "get", url, params, headers }),
  post: (url, data, headers = {}) =>
    request({ method: "post", url, data, headers }),
  put: (url, data) => request({ method: "put", url, data }),
  delete: (url, data) => request({ method: "delete", url, data }),
  setToken: (token) => {
    if (token) {
      request.defaults.headers.common.Authorization = `Bearer ${token}`;
    } else {
      delete request.defaults.headers.common.Authorization;
    }
  },
};
