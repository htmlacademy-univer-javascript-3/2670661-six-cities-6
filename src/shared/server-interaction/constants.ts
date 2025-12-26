import axios from 'axios';

export const BASE_URL = 'https://14.design.htmlacademy.pro/six-cities';

export const axiosClient = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
});

export const userUrl = {
  login: '/login',
  logout: '/logout',
};

export const offersUrl = {
  offers: '/offers',
  offer: (offerId: string) => '/offers/' + offerId,
  nearby: (offerId: string) => `/offers/${offerId}/nearby`,
};

export enum FavoriteStatus {
  NotFavorite = 0,
  Favorite = 1,
}

export const favoritesUrl = {
  favorite: '/favorite',
  setFavoriteStatus: (offerId: string, status: FavoriteStatus) => `/favorite/${offerId}/${status}`,
};

export const commentsUrl = {
  comments: (offerId: string) => '/comments/' + offerId,
  addComment: (offerId: string) => '/comments/' + offerId,
};
