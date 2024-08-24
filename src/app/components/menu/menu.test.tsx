import MockAdapter from "axios-mock-adapter";
import Menu from "./menu";
import {screen} from "@testing-library/react";
import {categoriesData} from "../../services/media-data";
import {initUseTranslationForTest, renderComponent,} from "../../utils/utils-for-test";
import {api} from "../../services/api.service";
import {act} from "react-dom/test-utils";


jest.mock("react-i18next", () => ({
  useTranslation: jest.fn(),
}));

describe("sidebar", () => {
  let mock: MockAdapter;

  beforeAll(() => {
    // Initialize the mock adapter for Axios
    mock = new MockAdapter(api.axiosApi);
  });

  beforeEach(async() => {
    // Set up the GET request to return mock categories data
    act(() => {
      mock.onGet(`${api.getApiUrl()}/genre/movie/list`).reply(200, categoriesData);
    });

    initUseTranslationForTest();

    await act(async () => {
      renderComponent(<Menu />);
    });
  });

  afterEach(() => {
    // Reset the mock between tests
    mock.reset();
  });

  afterAll(() => {
    // Restore the original Axios instance
    mock.restore();
  });


  it("should render categories", async () => {
    const parent = await screen.findByTestId("categories");
    const child = await screen.findAllByTestId("category");
    expect(parent).toContainElement(child[0]);
    expect(child[0]).toBeInTheDocument();
  });
  it("should render 19 categories", async () => {

    const parent = await screen.findByTestId("categories");
    const child = await screen.findAllByTestId("category");
    expect(parent).toContainElement(child[0]);
    expect(child).toHaveLength(19);
  });
});
