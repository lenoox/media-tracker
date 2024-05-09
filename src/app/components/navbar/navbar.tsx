import React from "react";
import {NavLink} from "react-router-dom";
import {Switcher} from "../theme-switcher/theme-switcher";
import {SearchMedia} from "../search-media/search-media";
import Menu from "../menu/menu";
import LanguageSelector from "../language-selector/language";

const Navbar = () => {
  return (
    <div
      data-testid="navbar"
      className="flex h-14 w-full items-center justify-center border border-stone-200 bg-stone-100 dark:border-stone-700 dark:bg-stone-800"
    >
      <div className="container px-5 sm:px-10 md:px-10 xl:px-20">
        <div className="flex items-center justify-between">
          <div className="flex">
            <NavLink
              to={`/`}
              data-testid="logo"
              className="text-stone-900 dark:text-white"
            >
              MediaTracker
            </NavLink>
            <Menu />
          </div>
          <div className="flex items-center">
            <Switcher data-testid="darkMode" />
            <LanguageSelector data-testid="languageSelector"></LanguageSelector>
            <div data-cy="search-container" className="ml-5 hidden lg:block">
              <SearchMedia data-testid="searchMedia" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
