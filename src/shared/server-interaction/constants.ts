import axios from 'axios';

export const BASE_URL = 'https://14.design.htmlacademy.pro/six-cities';

export const axiosClient = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
});

export const offersUrl = {
  offers: '/offers',
  offer: (offerId: string) => '/offers/' + offerId,
};

export const userUrl = {
  login: '/login',
};
