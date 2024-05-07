import * as apiService from "./api.service";
import * as localStorageService from "./storage.service";
import {getMovie} from "./media.service";
import {movieData} from "./media-data";
import {apiKey, mockUrl, tokenMock} from "../utils/utils-for-test";

describe("Api Service", () => {
  it("should add token in a request", async () => {
    const mockAxiosGet = jest.spyOn(apiService.api.axiosApi, "get");
    mockAxiosGet.mockResolvedValue({
      data: movieData,
    });
    const getApiUrlMock = jest
      .spyOn(apiService.api, "getApiUrl")
      .mockReturnValue(mockUrl);
    const getApiKey =  jest
      .spyOn(apiService.api, "getApiKey")
      .mockReturnValue(apiKey);
    const getLocalStorageMock = jest
      .spyOn(localStorageService.localStorageService, "getLocalStorage")
      .mockReturnValue(tokenMock);
    await getMovie("787699");

    const params = {
      api_key: apiKey,
    };

    const result = (
      apiService.api.axiosApi as any
    ).interceptors.request.handlers[0].fulfilled({
      headers: {},
    });

    expect(getApiKey).toHaveBeenCalledTimes(1);
    expect(getApiUrlMock).toHaveBeenCalledTimes(1);
    expect(apiService.api.getApiKey()).toEqual(apiKey);
    expect(apiService.api.getApiUrl()).toBe(mockUrl);
    expect(getLocalStorageMock).toHaveBeenCalledTimes(1);
    expect(
      localStorageService.localStorageService.getLocalStorage("token")
    ).toBe(tokenMock);

    expect(apiService.api.axiosApi.get).toHaveBeenCalledTimes(1);
    expect(apiService.api.axiosApi.get).toBeCalledWith(
      `${mockUrl}/movie/787699`,
      {
        params,
      }
    );
    expect(result.headers).toHaveProperty("Authorization");
    expect(result.headers.Authorization).toBe("Bearer " + tokenMock);
  });
});
