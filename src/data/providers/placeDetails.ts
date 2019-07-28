import axios, { AxiosPromise, AxiosRequestConfig } from 'axios';

const get = (id: string = '', params?: AxiosRequestConfig): AxiosPromise =>
  axios.get(`/api/placecollection/${id}/details`, params);

export default { get };
