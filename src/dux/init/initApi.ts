import { AxiosResponse } from 'axios';
import gallery from '../../data/providers/gallery';
import placeCollection from '../../data/providers/placecollection';

interface IPlaceCollection {
  id: string;
  address: string;
  name: string;
  addressdescription: string;
  hidden: boolean;
  latitude: string;
  longitude: string;
  places: IPlace[];
}

interface IPlace {
  id: string;
  name: string;
  type: string;
  hidden: boolean;
  googlePlaceId: string;
}

interface IPlaceCollectionRes {
  message: string;
  placeCollection: IPlaceCollection;
  success: boolean;
}

export const getGalleryById = async (id: string) => {
  const res = await gallery.get({ id });
  const resJSON = await res.data.json();
  return resJSON;
};

export const getPlaceCollectionById = async (id: string) => {
  const res: AxiosResponse = await placeCollection.get({ id });
  const resJSON: IPlaceCollectionRes = await res.data.json();
  return resJSON;
};
