import axios from 'axios';
// import config from "@config";
// import { store } from "@config/store";
// import { logoutRequest } from 'actions/app';

const request = axios.create({
     baseURL: 'https://api-dev.barayaswarga.com/api/v1',
     timeout: 10000,
     headers: { 'Content-Type': 'application/json' }
});

const requestHandler = request => {
     // let token = store.getState();

     // if (token.app.login.data.token != undefined) {
     //      request.headers.Authorization = `Bearer ${token.app.login.data.token}`;
     // }

     return request
};

const responseHandler = response => {
     return response;
};

const errorHandler = async (error) => {
     if (error.response.status === 401) {
          // store.dispatch(logoutRequest()) // alternative useDispatch
          setTimeout(() => {
               if(window.location.pathname !== '/'){
                    window.location.replace('/')
               }
          }, 100);
     }
};

// request.interceptors.request.use(
//      (request) => requestHandler(request),
//      (error) => errorHandler(error)
// );

// request.interceptors.response.use(
//      (response) => responseHandler(response),
//      (error) => errorHandler(error)
// );

export default {
     get: (url, params, headers = {}) => request({ method: "get", url, params, headers }),
     post: (url, data, headers = {}) => request({ method: "post", url, data, headers }),
     put: (url, data) => request({ method: "put", url, data }),
     delete: (url) => request({ method: "delete", url }),
     setToken: (token) => {
          if (token) {
               request.defaults.headers.common.Authorization = `Bearer ${token}`;
          } else {
               delete request.defaults.headers.common.Authorization;
          }
     }
};