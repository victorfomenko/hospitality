import axios, { AxiosPromise, AxiosRequestConfig } from 'axios';

const get = (id: string = '', params?: AxiosRequestConfig): AxiosPromise =>
  axios.get(`/api/gallery/${id}`, params);

export default { get };
