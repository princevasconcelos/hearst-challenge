import axios from 'axios';
import { HTTP_GET_METHOD, HTTP_POST_METHOD, HTTP_DELETE_METHOD } from './utils';

const defaultParams = {
  limit: '100',
  order: 'ASC',
};

export const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'x-api-key': process.env.REACT_APP_API_KEY,
    'Content-Type': 'application/json',
  },
});

export const getBreeds = () =>
  instance({
    method: HTTP_GET_METHOD,
    url: 'breeds',
    params: defaultParams,
  });

export const getFavorites = () =>
  instance({
    method: HTTP_GET_METHOD,
    url: 'favourites',
    params: {
      sub_id: process.env.REACT_APP_API_SUB_ID,
    },
  });

export const postFavorite = (imageId: string) =>
  instance({
    method: HTTP_POST_METHOD,
    url: 'favourites',
    data: {
      image_id: imageId,
      sub_id: process.env.REACT_APP_API_SUB_ID,
    },
  });

export const deleteFavorite = (favouriteId: number) =>
  instance({
    method: HTTP_DELETE_METHOD,
    url: `favourites/${favouriteId}`,
  });

export const postUploadImage = (file: File) =>
  instance({
    method: HTTP_POST_METHOD,
    url: 'images/upload',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: {
      file,
      sub_id: process.env.REACT_APP_API_SUB_ID,
    },
  });

export const deleteUploadImage = (imgId: string) =>
  instance({
    method: HTTP_DELETE_METHOD,
    url: `images/${imgId}`,
  });
