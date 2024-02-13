import { Response } from "../models/core";
import { TokenResponse } from "../models/user";
import { goToPage } from "./navigate.service";
import { api } from "./api.service";

export const getToken = async (
  username: string,
  password: string
): Promise<Response<TokenResponse>> => {
  const tokenData: Response<TokenResponse> = await new Promise(
    (resolve, reject) => {
      setTimeout(() => {
        if (username === "demo" && password === "demo") {
          const data: Response<TokenResponse> = {
            data: { token: api.getApiToken() },
          };
          return resolve(data);
        }
        const error: Response<unknown> = {
          error: {
            message: "Invalid credentials",
          },
        };
        return reject(error);
      }, 300);
    }
  );
  if (tokenData?.data?.token) {
    localStorage.setItem("token", tokenData.data.token);
    return goToPage("/");
  }

  return tokenData;
};
