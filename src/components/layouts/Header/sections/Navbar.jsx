import { useContext, useRef } from "react";
import { menuItems } from "../menuItems.js";
import "animate.css";
import { NavTogglerContext } from "../../../../context/HeaderMenuContext/NavTogglerContext.jsx";
import { CgCloseR } from "react-icons/cg";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { CiMenuKebab } from "react-icons/ci";
import { BsFillGrid3X2GapFill } from "react-icons/bs";
import { IoNewspaperOutline } from "react-icons/io5";
import { BsCalendar4Week } from "react-icons/bs";
import BASE_URL from "../../../../../config.js";

const Navbar = () => {
  const { activeNav, setActiveNav, subMenuStatus, setSubMenuStatus } =
    useContext(NavTogglerContext);
  const { t } = useTranslation();

  return (
    <ul
      className={
        activeNav
          ? "nav-menus active flex lg:flex-row flex-col text-white items-center gap-10 uppercase xl:text-sm text-[12px]"
          : "nav-menus flex lg:flex-row flex-col text-white items-center gap-10 uppercase xl:text-sm text-[12px]"
      }
    >
      {menuItems.map((navlink, index) => (
        <li className="relative nav-link" key={navlink.id || index}>
          {t(navlink.label)}
          {navlink.hasSubMenu && (
            <div
              className={
                index >= 3
                  ? "submenu absolute pt-[13px] right-0 z-50 animate__animated animate__fadeIn animate__faster"
                  : "submenu absolute pt-[13px] z-50 animate__animated animate__fadeIn animate__faster"
              }
            >
              <div className={
                index < 3 ?
                  "submenu-child bg-white shadow-lg text-darkGreen md:flex md:flex-row-reverse md:gap-3 md:w-[450px] w-[350px] p-1 rounded-lg items-center"
                  :
                  "submenu-child bg-white shadow-lg text-darkGreen md:flex md:flex-row md:gap-3 md:w-[450px] w-[350px] p-1 rounded-lg items-center"
              }>
                {navlink.image && (
                  <img
                    src={navlink.image}
                    alt="this is a dropdown image"
                    className="w-1/2 h-full rounded-lg shadow-lg object-cover md:block hidden"
                  />
                )}
                <ul className="w-1/2">
                  {navlink.subMenu.map((sublink, subIndex) => (
                    <li
                      className="mb-2 text-center"
                      key={sublink.id || subIndex}
                    >
                      <Link to={sublink.link}>{t(sublink.label)}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </li>
      ))}
      <li className="others relative nav-link">
        <BsFillGrid3X2GapFill className="inline mb-1 me-1" />{t('OTHERS')}
        <div className="submenu absolute shadow-3xl right-0 z-50 animate__animated animate__fadeIn animate__faster rounded">
          <div className="submenu-child mt-[13px] p-5 rounded-lg  bg-white text-darkGreen">
            <ul className="text-nowrap">
              <li className="mb-2">
              <BsCalendar4Week className="me-2 inline mb-1 text-xl" /><Link to={`${BASE_URL}/crop-calender`}>{t('CROP CALENDER')}</Link></li>
              <li className="mb-2">
              <IoNewspaperOutline className="me-2 inline mb-1 text-xl" /><Link to="#">{t('BLOGS')}</Link></li>
            </ul>
          </div>
        </div>
      </li>
      <li>
        <button
          type="button"
          className="closeNav lg:hidden block absolute top-5 right-5 text-2xl"
          onClick={() => setActiveNav(false)}
        >
          <CgCloseR />
        </button>
      </li>

    </ul>
  );
};

export default Navbar;
