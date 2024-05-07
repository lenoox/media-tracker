import {useTranslation} from "react-i18next";
import {ReactElement} from "react";
import {render} from "@testing-library/react";
import {BrowserRouter as Router} from "react-router-dom";

export const mockUrl = "http://localhost:8080";
export const tokenMock = "123456";
export const apiKey = "qwerty";
export const initUseTranslationForTest = () => {
  const tSpy = jest.fn((str) => str);
  const changeLanguageSpy = jest.fn((lng: string) => new Promise(() => {}));
  const useTranslationSpy = useTranslation as jest.Mock;

  const translation = useTranslationSpy.mockReturnValue({
    t: tSpy,
    i18n: {
      changeLanguage: changeLanguageSpy,
      language: "en",
    },
  });
  return { translation };
};
export const renderComponent = (component: ReactElement) => {
  return render(component, { wrapper: Router });
};
