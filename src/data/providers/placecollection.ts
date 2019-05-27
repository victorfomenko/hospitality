import axios, { AxiosPromise } from 'axios';

interface IQuery {
  id: string;
}

const get = (params: IQuery): AxiosPromise =>
  axios.get('/api/placecollection', { params });

export default { get };
