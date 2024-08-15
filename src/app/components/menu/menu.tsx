import React, {useEffect, useState} from "react";
import {NavLink} from "react-router-dom";
import {getAllCategories} from "../../services/media.service";
import {SearchMedia} from "../search-media/search-media";
import {Categories, CategoriesResponse} from "../../models/media";
import {map} from "lodash";

const Menu = () => {
  const [isVisible, setVisible] = useState<boolean>(false);
  const showMenu = async () => {
    setVisible(!isVisible);
  };
  const [categories, setCategories] = useState<Categories[]>([]);
  const getCategories = async () => {
    const data: CategoriesResponse<Categories> = await getAllCategories();
    return data;
  };

  useEffect(() => {
    getCategories().then((data) => setCategories(data?.genres));
  }, []);
  const handleOutsideClick = (event: MouseEvent) => {
    if (!(event.target as HTMLElement).closest("#menu")) {
      setVisible(false);
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <div id="menu">
      <button className="flex" onClick={showMenu}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="ml-5 mr-2 h-6 w-6 text-stone-900 dark:text-white"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
          />
        </svg>
        <span className="text-stone-900 dark:text-white">menu</span>
      </button>
      <div className={isVisible ? "block" : "hidden"}>
        <div className="absolute inset-x-0 top-14 z-50 flex h-5/6 items-center justify-center bg-stone-200 dark:bg-stone-700 md:h-3/6 xl:h-2/6">
          <div className="flex flex-col justify-center px-5 sm:px-10 md:px-10 xl:px-20">
            <div
              className="grid w-full grid-cols-2 gap-y-2 gap-x-5 md:grid-cols-6 xl:grid-cols-8"
              data-testid="categories"
            >
              {categories &&
                map(categories,(data: Categories) => (
                  <NavLink
                    key={data.id}
                    data-testid="category"
                    to={`${data.id}`}
                    className="cursor-pointer py-2 text-center text-stone-900 hover:bg-stone-100 hover:text-stone-900 active:text-stone-900   dark:text-stone-50 dark:hover:bg-stone-600 dark:hover:text-stone-50 dark:active:text-gray-50"
                  >
                    {data.name}
                  </NavLink>
                ))}
            </div>
            <div className="pt-6 lg:hidden">
              <SearchMedia />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Menu;
