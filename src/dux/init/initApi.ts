import { AxiosResponse } from 'axios';
import gallery from '../../data/providers/gallery';
import placeCollection from '../../data/providers/placecollection';

export interface IPlaceCollection {
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

export interface IGalleryRes {
  id: string;
  name: string;
  archived: boolean;
  description: string;
  items: IGalleryItem[];
  owner: {
    id: string;
    name: string;
  };
}

interface IGalleryItem {
  id: string;
  createdAt: Date;
  ctaLabel: string;
  ctaUrl: string;
  description: string;
  image: string;
  name: string;
  order: number;
  price: string;
  thumbnails: {
    [key: string]: string;
  };
  updatedAt: Date;
}

export const getGalleryById = async (id: string): Promise<IGalleryRes> => {
  const { data, statusText }: AxiosResponse = await gallery.get(id);
  if (statusText !== 'OK') {
    throw new Error(statusText);
  }
  return data;
};

export const getPlaceCollectionById = async (
  id: string,
): Promise<IPlaceCollectionRes> => {
  const { data, statusText }: AxiosResponse = await placeCollection.get(id);
  if (statusText !== 'OK') {
    throw new Error(statusText);
  }
  return data;
};
