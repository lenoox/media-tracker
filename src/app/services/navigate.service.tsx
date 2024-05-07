import {router} from "../routing/route";

export const goToPage = (page: string): void => {
  router.navigate(page);
};
