import { AxiosRequestConfig, AxiosResponse } from 'axios';
import placeDetails from '../../data/providers/placeDetails';
import placeReviews from '../../data/providers/placeReviews';
import { IPlace } from '../init/initApi';

interface IPlaceWithDetails extends IPlace {
  details: IDetails;
}

interface IPlaceDetailsRes {
  message: string;
  places: IPlaceWithDetails[];
  success: boolean;
}

interface IPlaceReviewsRes {
  message: string;
  reviews: IPlaceReview[];
  success: boolean;
}

export interface IDetailsMap {
  [key: string]: IDetails;
}

export interface IReviewsMap {
  [key: string]: IPlaceReview[];
}

export interface IDetails {
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

export const getPlaceDetailsById = async (
  id: string,
  params?: AxiosRequestConfig,
): Promise<IPlaceDetailsRes> => {
  const { data, statusText }: AxiosResponse = await placeDetails.get(
    id,
    params,
  );
  if (statusText !== 'OK') {
    throw new Error(statusText);
  }
  return data;
};

export const getPlaceReviewsById = async (
  placeId: string,
  id: string,
  params?: AxiosRequestConfig,
): Promise<IPlaceReviewsRes> => {
  const { data, statusText }: AxiosResponse = await placeReviews.get(
    placeId,
    id,
    params,
  );
  if (statusText !== 'OK') {
    throw new Error(statusText);
  }
  return data;
};
