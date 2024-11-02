import axios from 'axios';
import { showToast } from '../config/utils';
import { API_ROUTES } from './routes';
import { ASYNC_KEYS, getValueFromAsync } from '../config/async';

// Creating default axios client
export const axiosClient = axios.create({
  // baseURL: Config.BASE_URL,
  baseURL: 'localhost:3000',
  timeout: 10000,
  timeoutErrorMessage: `Request is timeout`,
  headers: {
    Accept: '*/*',
    'Content-Type': 'application/json',
  },
});

// Implementing axios interceptors
// to intercept request and response
// Add a request interceptor
axiosClient.interceptors.request.use(
  async function (config) {
    // Do something before request is sent
    config.headers['Accept-Language'] = 'de';

    if (
      config.url &&
      Object.values(API_ROUTES.PROTECTED).some(route =>
        config.url?.startsWith(route),
      )
    ) {
      let token = await getValueFromAsync(ASYNC_KEYS.TOKEN);
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  },
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  async function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    console.log(error);

    if (error.response.status === 401) {
      // Clear token from async storage
      // store.dispatch(actionSetUserJWTToken(null));
      // await clearAllAsync();

      showToast('Sitzung abgelaufen. Bitte melden Sie sich erneut an.', 'error');
    } else if (error.response.status === 404) {
      showToast('Die angeforderte Ressource wurde nicht gefunden.', 'error');
    } else if (error.response.data && error.response.data.message) {
      showToast(error.response.data.message, 'error');
    }

    return Promise.reject(error);
  },
);
