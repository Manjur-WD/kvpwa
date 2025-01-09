import { IoIosArrowDown } from "react-icons/io";

import sell_icon from "../../../../assets/images/sell.svg";
import rent_icon from "../../../../assets/images/rent.svg";

import { TbListDetails } from "react-icons/tb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import Navbar from "../sections/Navbar";
import BASE_URL from "../../../../../config";

import AnimateButton from "../../../animation/AnimateButton";
import { getCategoryList } from "../../../../services/api";
import { useQuery } from "@tanstack/react-query";
import Preloader from "../../../elements/Preloader";
import { Link } from "react-router-dom";
import { useTransition } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const categoryLinks = [
  `${BASE_URL}/tractor/old`, // Link for first category
  `${BASE_URL}/goods-vehicle/old`, // Link for second category
  `${BASE_URL}/agri-inputs/seeds`, // Link for third category
  `${BASE_URL}/agri-inputs/pesticides`, // Link for fourth category
  `${BASE_URL}/agri-inputs/fertilizer`, // and so on...
  `${BASE_URL}/harvester/old`,
  `${BASE_URL}/implements/old`,
  `${BASE_URL}/tyre/old`
];

const BottomHeadSection = () => {

  const { t } = useTranslation();
  // Use the useQuery hook to fetch data

  const token = useSelector((state) => state.auth.token);

  const {
    data: categoryList,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["category-list", 1], // Add the languageId to the queryKey for better cache management
    queryFn: () => getCategoryList(1, token), // Pass a function that calls getCategoryList
  });

  // Handle loading and error states
  if (isLoading) {
    return <Preloader />;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <section className="bottom-header px-2 md:py-2 shadow-lg bg-white">
        <nav className="navbar container flex justify-between items-center">
          <div className="header__category--btn md:block hidden">
            <DropdownMenu>
              <AnimateButton>
                <DropdownMenuTrigger className="border border-dashed rounded-3xl shadow-lg px-2 py-1 flex items-center text-white outline-none">
                  <TbListDetails className="inline me-2 text-lightgreen bg-white p-1 text-2xl rounded-full" />
                  <span className="uppercase">{t('All categories')}</span>
                  <IoIosArrowDown className="ms-2" />
                </DropdownMenuTrigger>
              </AnimateButton>
              <DropdownMenuContent className="w-[200px] mt-2 rounded-2xl px-2 py-2">
                {categoryList && categoryList.length > 0 ? (
                  categoryList.map((item, index) => (
                    <Link
                      key={item.category_id}
                      to={categoryLinks[index]}
                    >
                      <DropdownMenuItem className="text-darkGreen uppercase bg-white rounded-2xl shadow p-1 mb-2 hover:scale-95 transition-all cursor-pointer">
                        <img
                          src={item.category_icon}
                          alt="tractor-icon"
                          className="bg-white shadow-lg rounded-full p-1"
                          width={35}
                        />{" "}
                        {t(item.category_name)}
                      </DropdownMenuItem>
                    </Link>
                  ))
                ) : (
                  <div>No Data Available</div>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <Navbar />
          <div className="header__sell-rent-btn  gap-2 md:flex hidden">
            <AnimateButton>
              <a
                href="#"
                className="header__sell-btn uppercase border border-dashed rounded-3xl shadow-lg ps-1 pe-3 py-1 flex items-center text-white outline-none"
              >
                <img
                  src={sell_icon}
                  alt="this is a sell icon"
                  className="me-2 p-1 bg-lightgreen rounded-full shadow"
                  width={25}
                />
                {t('sell')}
              </a>
            </AnimateButton>
            <AnimateButton>
              <a
                href="#"
                className="header__sell-btn uppercase border border-dashed rounded-3xl shadow-lg pe-3 ps-1 py-1 flex items-center text-white outline-none"
              >
                <img
                  src={rent_icon}
                  alt="this is a sell icon"
                  className="me-2 p-1 bg-lightgreen rounded-full shadow"
                  width={25}
                />
                {t('rent')}
              </a>
            </AnimateButton>
          </div>
        </nav>
      </section>
    </>
  );
};

export default BottomHeadSection;
