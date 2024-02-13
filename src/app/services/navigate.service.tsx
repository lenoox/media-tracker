import { router } from "../routing/route";

export const goToPage = (page: string): any => {
  router.navigate(page);
};
