import React, {useState} from "react";
import useDarkTheme from "../../hook/use-theme";
import {DarkModeSwitch} from "react-toggle-dark-mode";

export const Switcher = () => {
  const [colorTheme, setTheme] = useDarkTheme();
  const [darkSide, setDarkSide] = useState<boolean>(colorTheme === "light");

  const toggleDarkMode = (checked: boolean) => {
    setTheme(colorTheme);
    setDarkSide(checked);
  };

  return (
    <>
      <div className="flex items-center">
        <DarkModeSwitch
          checked={darkSide}
          onChange={toggleDarkMode}
          size={20}
        />
      </div>
    </>
  );
};
