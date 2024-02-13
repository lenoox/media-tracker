import { NavLink } from "react-router-dom";
import React from "react";
import { MovieCardParams } from "../../models/media";
import { formatDateToYear } from "../../utils/utils";
import { useTranslation } from "react-i18next";

export const MovieCard = ({
  media: { backdrop_path, id, release_date, title },
}: MovieCardParams) => {
  const { t } = useTranslation();
  const dateYear = formatDateToYear(release_date);
  return (
    <div className="" key={id}>
      <div className="white flex h-full flex-col rounded-xl border border-stone-200 shadow-sm dark:border-stone-700 dark:bg-stone-800">
        <div className="relative">
          <span className="absolute left-3 top-3 rounded-lg bg-blue-900 px-3  py-2 text-sm font-semibold text-white disabled:pointer-events-none dark:bg-blue-600 dark:text-white">
            {dateYear}
          </span>
          <img
            className="h-auto w-full rounded-t-xl"
            src={
              backdrop_path
                ? `https://image.tmdb.org/t/p/w500${backdrop_path}`
                : "https://placehold.co/500x280?text=Empty"
            }
            alt={title}
          />
        </div>
        <div className="flex h-full flex-col px-4 py-2 ">
          <div className="flex h-full flex-col items-start">
            <h3 className="text-md font-bold text-gray-800 dark:text-stone-200">
              {title}
            </h3>
          </div>
          <div className="flex items-end justify-end">
            <NavLink
              to={`/details/${id}`}
              className="mt-2  gap-x-2 rounded-lg border border-transparent bg-blue-900 py-2 px-3 text-sm font-semibold text-white hover:bg-blue-700 disabled:pointer-events-none disabled:opacity-50 dark:bg-blue-600 dark:hover:bg-blue-700"
            >
              {t("showBtnText")}
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};
