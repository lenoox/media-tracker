import {Response} from "../models/core";
import {TokenResponse} from "../models/user";
import {goToPage} from "./navigate.service";
import {api} from "./api.service";

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
        return reject(new Error("Invalid credentials"));
      }, 300);
    }
  );
  if (tokenData?.data?.token) {
    localStorage.setItem("token", tokenData.data.token);
    goToPage("/");
  }

  return tokenData;
};
