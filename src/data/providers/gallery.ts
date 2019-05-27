import axios, { AxiosPromise } from 'axios';

interface IQuery {
  id: string;
}

const get = (params: IQuery): AxiosPromise =>
  axios.get('/api/gallery', { params });

export default { get };
