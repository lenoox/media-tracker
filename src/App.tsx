import React from "react";
import "./App.css";
import RouteRoot from "./app/routing/route";
import { SearchMediaProvider } from "./app/context/search-media-provider";
import { translateInit } from "./app/services/translate.service";

translateInit();
function App() {
  return (
    <React.StrictMode>
      <SearchMediaProvider>
        <RouteRoot />
      </SearchMediaProvider>
    </React.StrictMode>
  );
}

export default App;
