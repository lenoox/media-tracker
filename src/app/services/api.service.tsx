import {filteredParamsIfNotNull} from "../utils/utils";
import axios, {AxiosResponse} from "axios";
import {localStorageService} from "./storage.service";
import {goToPage} from "./navigate.service";

const axiosApi = axios.create();
const env = process.env;
const getApiUrl = () => {
  return env.REACT_APP_API_URL;
};
const getApiKey = () => {
  return env.REACT_APP_API_KEY;
};
const getApiToken = () => {
  return "123456";
};

const get = async <T,>(pathRequest: string, paramsRequest: Record<string, unknown> = {}) => {
  const params = {
    api_key: api.getApiKey(),
    ...paramsRequest,
  };
  const paramsFilter = filteredParamsIfNotNull(params);
  const response: AxiosResponse<T> = await api
    .axiosInterceptor()
    .get<T>(`${api.getApiUrl()}${pathRequest}`, {
      params: paramsFilter,
    });
  return response;
};
const axiosInterceptor = () => {
  axiosApi.interceptors.request.use(
    (config) => {
      const token = localStorageService.getLocalStorage("token");
      if (token === api.getApiToken()) {
        config.headers.Authorization = "Bearer " + api.getApiToken();
      }else{
        goToPage("/login")
      }
      return config;
    },
    () => {
      return Promise.reject(new Error('Something went wrong'));
    }
  );
  return axiosApi;
};

export const api = {
  getApiUrl,
  getApiKey,
  getApiToken,
  get,
  axiosApi,
  axiosInterceptor,
};
