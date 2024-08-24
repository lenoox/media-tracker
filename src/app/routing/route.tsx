import {createBrowserRouter, RouterProvider} from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    async lazy() {
      const { AppContainer } = await import("../routing/container");
      return { Component: AppContainer };
    },
    children: [
      {
        index: true,
        async lazy() {
          const { HomePage } = await import("../pages/home-page");
          return { Component: HomePage };
        },
      },
      {
        path: ":categoryId",
        async lazy() {
          const { mediaByCategoriesLoader, CategoryPage } = await import(
            "../pages/category-page"
          );
          return {
            loader: mediaByCategoriesLoader,
            Component: CategoryPage,
          };
        },
      },
      {
        path: "details/:id",
        async lazy() {
          const { mediaLoader, MediaDetailsPage } = await import(
            "../pages/media-details-page"
          );
          return {
            loader: mediaLoader,
            Component: MediaDetailsPage,
          };
        },
      },
    ],
  },
  {
    path: "login",
    async lazy() {
      const { LoginPage } = await import("../pages/login-page");
      return {
        Component: LoginPage,
      };
    },
  },
  {
    path: "*",
    async lazy() {
      const { ErrorPage } = await import("../pages/error-page");
      return {
        Component: ErrorPage,
      };
    },
  },
]);
const RouteRoot = () => {
  return <RouterProvider router={router} />;
};
export default RouteRoot;
