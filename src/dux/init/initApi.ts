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

export interface IPlace {
  id: string;
  name: string;
  type: string;
  hidden: boolean;
  googlePlaceId: string;
  details: {
    id: string;
    name: string;
    icon: string;
    rating: number;
    price_level: number;
    url: string;
    user_ratings_total: number;
    adr_address: string;
    formatted_address: string;
    photos?: IPlacePhoto[];
    reviews?: IPlaceReview[];
  };
}

export interface IPlacePhoto {
  photo_reference: string;
  height: number;
  width: number;
  html_attributions: string;
}

export interface IPlaceReview {
  author_name: string;
  author_url: string;
  language: string;
  profile_photo_url: string;
  rating: number;
  relative_time_description: string;
  text: string;
  time: number;
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
