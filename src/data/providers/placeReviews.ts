import axios, { AxiosPromise, AxiosRequestConfig } from 'axios';

const get = (
  placeId: string,
  id: string = '',
  params?: AxiosRequestConfig,
): AxiosPromise =>
  axios.get(`/api/placecollection/${placeId}/reviews/${id}`, params);

export default { get };
