import {AxiosRequestConfig} from 'axios';

export const BASE_URL = 'https://14.design.htmlacademy.pro/six-cities';

export const axiosConfig: AxiosRequestConfig = {
  baseURL: BASE_URL,
  timeout: 5000,
};

export const offersUrl = {
  offers: '/offers',
};
