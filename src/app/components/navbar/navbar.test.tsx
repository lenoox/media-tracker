import "@testing-library/jest-dom/extend-expect";
import { fireEvent, screen } from "@testing-library/react";
import * as router from "react-router";
import Navbar from "./navbar";
import {
  initUseTranslationForTest,
  renderComponent,
} from "../../utils/utils-for-test";

jest.mock("react-i18next", () => ({
  useTranslation: jest.fn(),
}));
describe("navbar", () => {
  const mockedNavigation = jest.fn();
  beforeEach(async () => {
    jest
      .spyOn(router, "useNavigate")
      .mockImplementation(() => mockedNavigation);
    const { translation } = initUseTranslationForTest();
  });

  it("should contain text logo", async () => {
    renderComponent(<Navbar />);
    const logoElement = await screen.findByTestId("logo");
    expect(logoElement).toHaveTextContent("MediaTracker");
  });

  it("should contain language selector", async () => {
    renderComponent(<Navbar />);
    expect(screen.queryByTestId("languageSelector")).toBeDefined();
  });

  it("should contain dark mode switcher", async () => {
    renderComponent(<Navbar />);
    expect(screen.queryByTestId("darkMode")).toBeDefined();
  });

  it("should contain search media component", async () => {
    renderComponent(<Navbar />);
    expect(screen.queryByTestId("searchMedia")).toBeDefined();
  });

  it("should navigate to the home page", () => {
    const { getByText } = renderComponent(<Navbar />);
    fireEvent.click(getByText(/MediaTracker/i));

    expect(mockedNavigation).toHaveBeenCalled();
    expect(mockedNavigation.mock.calls[0][0]).toEqual("/");
  });
});
