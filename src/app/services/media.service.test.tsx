import {getAllCategories, getMovie, getMovieByCategory, popularMovie,} from "./media.service";
import {movieByCategoryData, movieData} from "./media-data";
import * as apiService from "./api.service";
import {apiKey, mockUrl, tokenMock} from "../utils/utils-for-test";
import {localStorageService} from "./storage.service";
import {Media, MediaList} from "../models/media";

describe("media", () => {
  beforeEach(async () => {
    jest.spyOn(apiService.api, "getApiUrl").mockReturnValue(mockUrl);
    jest.spyOn(apiService.api, "getApiKey").mockReturnValue(apiKey);
    jest
      .spyOn(localStorageService, "getLocalStorage")
      .mockReturnValue(tokenMock);
  });
  it("should return list of popular movies", async () => {
    const mockAxiosGet = jest.spyOn(apiService.api.axiosApi, "get");

    mockAxiosGet.mockResolvedValue({
      data: movieData,
    });

    await popularMovie();

    const params = {
      api_key: apiKey,
    };

    expect(apiService.api.getApiKey()).toEqual(apiKey);
    expect(apiService.api.getApiUrl()).toEqual("http://localhost:8080");
    expect(mockAxiosGet).toHaveBeenCalledTimes(1);
    expect(apiService.api.axiosApi.get).toBeCalledWith(
      `${mockUrl}/movie/popular`,
      { params }
    );
  });
  it("should return list of all categories", async () => {
    const mockAxiosGet = jest.spyOn(apiService.api.axiosApi, "get");

    mockAxiosGet.mockResolvedValue({
      data: movieData,
    });

    await getAllCategories();

    const params = {
      api_key: apiKey,
    };

    expect(apiService.api.getApiKey()).toEqual(apiKey);
    expect(apiService.api.getApiUrl()).toEqual("http://localhost:8080");
    expect(mockAxiosGet).toHaveBeenCalledTimes(1);
    expect(apiService.api.axiosApi.get).toBeCalledWith(
      `${mockUrl}/genre/movie/list`,
      { params }
    );
  });
  it("should return a movie by id", async () => {
    const mockAxiosGet = jest.spyOn(apiService.api.axiosApi, "get");

    mockAxiosGet.mockResolvedValue({
      data: movieData,
    });

    await getMovie("787699");

    const params = {
      api_key: apiKey,
    };

    expect(apiService.api.getApiKey()).toEqual(apiKey);
    expect(apiService.api.getApiUrl()).toEqual("http://localhost:8080");
    expect(mockAxiosGet).toHaveBeenCalledTimes(1);
    expect(apiService.api.axiosApi.get).toBeCalledWith(
      `${mockUrl}/movie/787699`,
      { params }
    );
  });
  it("should return list of movies by category", async () => {
    const mockAxiosGet = jest.spyOn(apiService.api.axiosApi, "get");
    mockAxiosGet.mockResolvedValue({
      data: movieByCategoryData,
    });

    const shows: MediaList<Media> = await getMovieByCategory("99");

    const params = {
      api_key: apiKey,
      with_genres: "99",
    };

    expect(apiService.api.getApiKey()).toEqual(apiKey);
    expect(apiService.api.getApiUrl()).toEqual("http://localhost:8080");
    expect(mockAxiosGet).toHaveBeenCalledTimes(1);
    expect(apiService.api.axiosApi.get).toBeCalledWith(
      `${mockUrl}/discover/movie`,
      { params }
    );
  });
});
