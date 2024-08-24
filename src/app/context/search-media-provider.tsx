import {createContext, Dispatch, ReactNode, SetStateAction, useContext, useMemo, useState} from "react";

const SearchMediaContext = createContext<[string, (media: string) => void]>([
  "",
  () => {},
]);
type SearchMedia = {
  children: ReactNode;
};
export const SearchMediaProvider = ( {children} : SearchMedia) => {
  const [searchMedia, setSearchMedia] = useState<string>("");
  const searchMediaValue =
      useMemo<[string,Dispatch<SetStateAction<string>>]>(() => [searchMedia, setSearchMedia], [searchMedia]);
  return (
      <SearchMediaContext.Provider value={searchMediaValue}>
        {children}
      </SearchMediaContext.Provider>
  );
};
export const useSearchMedia = () => useContext(SearchMediaContext);