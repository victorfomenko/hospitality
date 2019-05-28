import axios, { AxiosPromise, AxiosRequestConfig } from 'axios';

const get = (id: string = '', params?: AxiosRequestConfig): AxiosPromise =>
  axios.get(`/api/placecollection/${id}`, params);

export default { get };
