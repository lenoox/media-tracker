import MockAdapter from "axios-mock-adapter";
import Menu from "./menu";
import { screen } from "@testing-library/react";
import { categoriesData } from "../../services/media-data";
import axios from "axios";
import {
  initUseTranslationForTest,
  renderComponent,
} from "../../utils/utils-for-test";
import { api } from "../../services/api.service";

export const axiosApi = axios.create();
const mock = new MockAdapter(axiosApi);

jest.mock("react-i18next", () => ({
  useTranslation: jest.fn(),
}));

describe("sidebar", () => {
  beforeEach(async () => {
    const { translation } = initUseTranslationForTest();
    mock
      .onGet(`${api.getApiUrl()}/genre/movie/list`)
      .reply(200, categoriesData);
    renderComponent(<Menu />);
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
