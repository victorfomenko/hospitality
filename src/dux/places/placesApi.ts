import { AxiosRequestConfig, AxiosResponse } from 'axios';
import placeDetails from '../../data/providers/placeDetails';
interface IPlaceDetailsRes {
  details: IPlaceDetails;
}
export interface IPlaceDetails {
  [key: string]: IDetails;
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
  reviews?: IPlaceReview[];
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
  placeId: string,
  id: string,
  params?: AxiosRequestConfig,
): Promise<IPlaceDetailsRes> => {
  const { data, statusText }: AxiosResponse = await placeDetails.get(
    placeId,
    id,
    params,
  );
  if (statusText !== 'OK') {
    throw new Error(statusText);
  }
  return data;
};
