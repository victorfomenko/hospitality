import axios, { AxiosPromise, AxiosRequestConfig } from 'axios';

const get = (
  collectionId: string = '',
  id: string = '',
  params?: AxiosRequestConfig,
): AxiosPromise =>
  axios.get(`/api/placecollection/${collectionId}/${id}`, params);

export default { get };
