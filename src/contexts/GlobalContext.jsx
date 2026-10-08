import { createContext, useState } from "react";
import PropTypes from "prop-types";
import content from "../data/public-content.json";
const GlobalContext = createContext({});
export function GlobalContextProvider({ children }) {
  const [currentPage, setCurrentPage] = useState("home");
  return (
    <GlobalContext.Provider
      value={{
        ...content.main,
        globalData: content.global,
        mainData: content.main,
        loading: false,
        currentPage,
        setCurrentPage,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
GlobalContextProvider.propTypes = { children: PropTypes.node };
export default GlobalContext;
