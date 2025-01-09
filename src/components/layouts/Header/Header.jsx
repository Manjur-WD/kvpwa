import TopHeadSection from "./sections/TopHeadSection";
import MiddleHeadSection from "./sections/MiddleHeadSection";
import BottomHeadSection from "./sections/BottomHeadSection";
import { NavTogglerStateProvider } from "../../../context/HeaderMenuContext/NavTogglerContext";

const Header = () => {
  return (
    <NavTogglerStateProvider>
      <header className="header sticky w-full top-0 z-40" id="header">
        <TopHeadSection />
        <MiddleHeadSection />
        <BottomHeadSection />
      </header>
    </NavTogglerStateProvider>
  );
};

export default Header;
