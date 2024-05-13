import axios from "axios";
import { parseCookies } from "nookies";

const makingUrl = (url) => {
  return "http://localhost:3000/api" + url;
};

const apiClient = (options) => {
  const url = makingUrl(options.url);
  const fetchOptions = options;
  const cookies = parseCookies();

  fetchOptions.headers = fetchOptions.headers || {};
  if (cookies?.token) {
    const token = JSON.parse(cookies?.token);
    fetchOptions.headers.Authorization = `Bearer ${token}`;
  }

  return axios({
    ...fetchOptions,
    url: url,
  });
};

export default apiClient;
