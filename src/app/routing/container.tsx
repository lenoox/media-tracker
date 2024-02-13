import React from "react";
import Navbar from "../components/navbar/navbar";
import { Outlet } from "react-router-dom";
import { currentYear } from "../utils/utils";
import { useTranslation } from "react-i18next";

export const AppContainer = () => {
  const { t } = useTranslation();
  return (
    <div className="flex min-h-screen flex-col items-center bg-white dark:bg-stone-900">
      <div className="w-full">
        <Navbar />
      </div>
      <div className="container flex w-4/6 flex-col">
        <span className="py-6 text-center text-stone-700 dark:text-white">
          {t("copyrightApi")};
        </span>
        <Outlet />
      </div>
      <span className="p-6 text-center text-stone-700 dark:text-white">
        lenoox {currentYear()}
      </span>
    </div>
  );
};
