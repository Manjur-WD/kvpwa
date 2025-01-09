import { createContext, useState } from "react";

const NavTogglerContext = createContext();

const NavTogglerStateProvider = ({ children }) => {
  const [activeNav, setActiveNav] = useState(false);
  const [subMenuStatus, setSubMenuStatus] = useState(false);

  return (
    <NavTogglerContext.Provider
      value={{ activeNav, setActiveNav, subMenuStatus, setSubMenuStatus }}
    >
      {children}
    </NavTogglerContext.Provider>
  );
};

export { NavTogglerContext, NavTogglerStateProvider };
