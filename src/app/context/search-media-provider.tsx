import {createContext, ReactNode, useContext, useState} from "react";

const SearchMediaContext = createContext<[string, (media: string) => void]>([
  "",
  () => {},
]);
type SearchMedia = {
  children: ReactNode;
};
export const SearchMediaProvider = ( {children} : SearchMedia) => {
  const [searchMedia, setSearchMedia] = useState<string>("");
  return (
      <SearchMediaContext.Provider value={[searchMedia, setSearchMedia]}>
        {children}
      </SearchMediaContext.Provider>
  );
};
export const useSearchMedia = () => useContext(SearchMediaContext);