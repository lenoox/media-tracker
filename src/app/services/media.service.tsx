import { AxiosResponse } from "axios";
import {
  Categories,
  CategoriesResponse,
  Media,
  MediaList,
} from "../models/media";
import { api } from "./api.service";

export const searchMovies = async (
  title: string | null
): Promise<MediaList<Media>> => {
  const params = {
    query: title,
  };
  const response = await api.get<MediaList<Media>>(`/search/movie`, params);
  return response.data;
};
export const getMovieByCategory = async (
  categoryId: string | undefined
): Promise<MediaList<Media>> => {
  const params = {
    with_genres: categoryId,
  };
  const response = await api.get<MediaList<Media>>(`/discover/movie`, params);
  return response.data;
};
export const getMovie = async (
  movieId: string | undefined
): Promise<Media | null> => {
  if (!movieId) {
    return null;
  }
  const response: AxiosResponse = await api.get<Media>(`/movie/${movieId}`);
  return response.data;
};
export const popularMovie = async (): Promise<MediaList<Media>> => {
  const response = await api.get<MediaList<Media>>(`/movie/popular`);
  return response.data;
};
export const getAllCategories = async (): Promise<
  CategoriesResponse<Categories>
> => {
  const response = await api.get<CategoriesResponse<Categories>>(
    `/genre/movie/list`
  );
  return response.data;
};
