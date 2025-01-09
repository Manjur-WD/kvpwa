import { createContext, useState } from "react";

const SortStatusContext = createContext();

const SortStatusProvider = ({ children }) => {
  const [priceSort, setPriceSort] = useState(null);
  return (
    <SortStatusContext.Provider value={{ priceSort, setPriceSort }}>
      {children}
    </SortStatusContext.Provider>
  );
};

export { SortStatusContext, SortStatusProvider };
