import React, {useState} from "react";
import {useSearchMedia} from "../../context/search-media-provider";
import {useTranslation} from "react-i18next";
import {goToPage} from "../../services/navigate.service";

export const SearchMedia = () => {
  const { t } = useTranslation();
  const [searchMediaCurrent, setSearchMediaCurrent] = useState<string>("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setSearchMedia] = useSearchMedia();
  const handleClick = () => {
    goToPage("/");
    setSearchMedia(searchMediaCurrent);
  };
  return (
    <div className="relative h-full">
      <input
        className="w-full  border-0 bg-stone-50 px-5 py-2 text-stone-900 placeholder-stone-600 dark:bg-stone-700 dark:text-white dark:placeholder-stone-300"
        value={searchMediaCurrent}
        onChange={(e) => setSearchMediaCurrent(e.target.value)}
        placeholder={t("searchPlaceHolder")}
      />
      <button className="absolute inset-y-0 right-0 flex items-center pr-2">
        <svg
          onClick={() => handleClick()}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-6 w-6 text-stone-500 dark:text-stone-400"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
      </button>
    </div>
  );
};
