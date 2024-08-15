import React from "react";
import {getMovie} from "../services/media.service";
import {LoaderFunctionArgs, useLoaderData} from "react-router-dom";
import {Media, MediaRequest} from "../models/media";
import {formatDateToYear} from "../utils/utils";
import {useTranslation} from "react-i18next";
import {MovieDescription} from "../components/movie-description/movie-description";
import {map} from "lodash";

export async function mediaLoader({
  params: { id },
}: LoaderFunctionArgs<MediaRequest>): Promise<Media | null> {
  return await getMovie(id);
}

export const MediaDetails = () => {
  const { t } = useTranslation();
  const {
    backdrop_path,
    id,
    release_date,
    title,
    overview,
    production_countries,
    spoken_languages,
    genres,
  } = useLoaderData() as Media;
  const dateYear = formatDateToYear(release_date);
  return (
    <div className="" key={id}>
      <div className="white flex flex-col items-start">
        <h3 className="mb-5 text-2xl font-bold text-gray-800 dark:text-stone-100">
          {title}
        </h3>
        <div className="flex flex-col gap-5 md:flex-row">
          <div className="relative">
            <img
              className="object-fill md:h-96 md:w-full"
              src={
                backdrop_path
                  ? `https://image.tmdb.org/t/p/w500${backdrop_path}`
                  : "https://via.placeholder.com/400"
              }
              alt={title}
            />
          </div>
          <div className="relative text-white">
            <MovieDescription label={t("productionYear")}>
              {dateYear}
            </MovieDescription>
            <MovieDescription label={t("productionCountries")}>
              <ul className="list-disc">
                {map(production_countries,(productionCountry) => (
                  <li
                    className="text-md ml-6 text-gray-800 dark:text-stone-300"
                    key={productionCountry.name}
                  >
                    {productionCountry.name}
                  </li>
                ))}
              </ul>
            </MovieDescription>
            <MovieDescription label={t("genresLabel")}>
              <ul className="list-disc">
                {map(genres,(genre) => (
                  <li
                    className="text-md ml-6 text-gray-800 dark:text-stone-300"
                    key={genre.name}
                  >
                    {genre.name}
                  </li>
                ))}
              </ul>
            </MovieDescription>
            <MovieDescription label={t("languagesLabel")}>
              <ul className="list-disc">
                {map(spoken_languages,(spokenLanguage) => (
                  <li
                    className="text-md ml-6 text-gray-800 dark:text-stone-300"
                    key={spokenLanguage.name}
                  >
                    {spokenLanguage.name}
                  </li>
                ))}
              </ul>
            </MovieDescription>
          </div>
        </div>
        <div className="pt-4">
          <div className="text-gray-800 dark:text-stone-300">{overview}</div>
        </div>
      </div>
    </div>
  );
};
