import React, { useState } from "react";
import { getToken } from "../services/user.service";
import {useTranslation} from "react-i18next";

export const Login = () => {
  const { t } = useTranslation();
  const [username, setUserName] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!username || !password) {
      return;
    }

    await getToken(username, password);
  };
  return (
      <div className="min-h-screen bg-gray-100 flex flex-col justify-center">
        <div className="px-10 md:px-0 w-full md:mx-auto max-w-md">
          <h2 className="text-center text-3xl font-extrabold text-gray-900">{t("loginPageHeaderText")}</h2>
        </div>
        <div className="mt-8 px-10 md:px-0 w-full md:mx-auto max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form  onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  {t("emailAddressText")}
                </label>
                <div className="mt-1">
                  <input
                      id="username"
                      name="username"
                      type="text"
                      autoComplete="username"
                      required
                      value={username}
                      onChange={(e) => setUserName(e.target.value)}
                      className="block w-full px-3 py-2 border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-blue-900 focus:border-blue-900 sm:text-sm"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  {t("passwordAddressText")}
                </label>
                <div className="mb-4">
                  <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="block w-full px-3 py-2 border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-blue-900 focus:border-blue-900 sm:text-sm"
                  />
                </div>
              </div>
              <div>
                <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 text-sm font-medium text-white bg-blue-900  hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-900"
                >
                  {t("signInButtonText")}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
  );
};
