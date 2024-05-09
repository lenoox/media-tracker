import { createContext, useContext, useState } from "react";

const SearchMediaContext = createContext<[string, (media: string) => void]>([
  "",
  () => {},
]);

export const SearchMediaProvider = ({ children }: any) => {
  const [searchMedia, setSearchMedia] = useState<string>("");
  return (
    <SearchMediaContext.Provider value={[searchMedia, setSearchMedia]}>
      {children}
    </SearchMediaContext.Provider>
  );
};
export const useSearchMedia = () => useContext(SearchMediaContext);
