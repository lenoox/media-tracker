import "@testing-library/jest-dom/extend-expect";
import {fireEvent, screen} from "@testing-library/react";
import * as router from "react-router";
import Navbar from "./navbar";
import {initUseTranslationForTest, renderComponent,} from "../../utils/utils-for-test";
import MockAdapter from "axios-mock-adapter";
import {api} from "../../services/api.service";
import {categoriesData} from "../../services/media-data";
import {act} from "react-dom/test-utils";

jest.mock("react-i18next", () => ({
  useTranslation: jest.fn(),
}));
describe("navbar", () => {
  const mockedNavigation = jest.fn();
  let mock: MockAdapter;

  beforeAll(() => {
    mock = new MockAdapter(api.axiosInterceptor());
  });

  beforeEach(() => {
    // Set up the GET request to return mock categories data
    mock.onGet(`${api.getApiUrl()}/genre/movie/list`).reply(200, categoriesData);
    jest
        .spyOn(router, "useNavigate")
        .mockImplementation(() => mockedNavigation);
  });

  afterEach(() => {
    mock.reset();
  });

  afterAll(() => {
    mock.restore();
  });



  it("should contain text logo", async () => {
    const { translation } = initUseTranslationForTest();
    await act(async () => {
      renderComponent(<Navbar />);
    });
    const logoElement = await screen.findByTestId("logo");
    expect(logoElement).toHaveTextContent("MediaTracker");
  });

  it("should contain language selector", async () => {
    const { translation } = initUseTranslationForTest();
    await act(async () => {
      renderComponent(<Navbar />);
    });
    expect(screen.queryByTestId("languageSelector")).toBeDefined();
  });

  it("should contain dark mode switcher", async () => {
    const { translation } = initUseTranslationForTest();
    await act(async () => {
      renderComponent(<Navbar />);
    });
    expect(screen.queryByTestId("darkMode")).toBeDefined();
  });

  it("should contain search media component", async () => {
    const { translation } = initUseTranslationForTest();
    await act(async () => {
      renderComponent(<Navbar />);
    });
    expect(screen.queryByTestId("searchMedia")).toBeDefined();
  });

  it("should navigate to the home page", async() => {
    const { translation } = initUseTranslationForTest();
    await act(async () => {
      renderComponent(<Navbar />);
    });

    const homeLink = screen.getByText(/MediaTracker/i);
    fireEvent.click(homeLink);

    expect(mockedNavigation).toHaveBeenCalled();
    expect(mockedNavigation.mock.calls[0][0]).toEqual("/");
  });
});
