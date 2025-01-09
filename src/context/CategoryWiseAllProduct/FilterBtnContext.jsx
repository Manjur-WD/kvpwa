import { createContext, useState } from "react";

const FilterBtnContext = createContext();

const FilterButtonStateProvider = ({ children }) => {
  const [filterBtnState, setFilterBtnState] = useState(false);
  return (
    <FilterBtnContext.Provider value={{ filterBtnState, setFilterBtnState }}>
      {children}
    </FilterBtnContext.Provider>
  );
};

export { FilterBtnContext, FilterButtonStateProvider };
