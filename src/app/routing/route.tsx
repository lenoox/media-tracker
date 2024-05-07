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
          const { Home } = await import("../pages/home");
          return { Component: Home };
        },
      },
      {
        path: ":categoryId",
        async lazy() {
          const { mediaByCategoriesLoader, Category } = await import(
            "../pages/category"
          );
          return {
            loader: mediaByCategoriesLoader,
            Component: Category,
          };
        },
      },
      {
        path: "details/:id",
        async lazy() {
          const { mediaLoader, MediaDetails } = await import(
            "../pages/media-details"
          );
          return {
            loader: mediaLoader,
            Component: MediaDetails,
          };
        },
      },
    ],
  },
  {
    path: "login",
    async lazy() {
      const { Login } = await import("../pages/login");
      return {
        Component: Login,
      };
    },
  },
  {
    path: "*",
    async lazy() {
      const { Error } = await import("../pages/error");
      return {
        Component: Error,
      };
    },
  },
]);
const RouteRoot = () => {
  return <RouterProvider router={router} />;
};
export default RouteRoot;
