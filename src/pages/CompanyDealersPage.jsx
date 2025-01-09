import { useQuery } from "@tanstack/react-query";
import Footer from "../components/layouts/Footer/Footer";
import Header from "../components/layouts/Header/Header";
import MobileScreenNav from "../components/layouts/Header/MobileScreenNav";
import { getCompanyDealers } from "../services/api";
import iffcoLogo from "../assets/images/IFFCO-LOGO.jpg";
import Preloader from "../components/elements/Preloader";
import breadcrumbImage from "../assets/images/img_hero.jpg";
import { FaChevronRight } from "react-icons/fa6";
import { GrMapLocation } from "react-icons/gr";
import { IoMdCall } from "react-icons/io";
import { FaHouseLaptop } from "react-icons/fa6";
import ReactPaginate from "react-paginate";
import { Link, useParams } from "react-router-dom";
import { FiChevronsLeft, FiChevronsRight } from "react-icons/fi";
import { LuMapPin } from "react-icons/lu";
import { useContext, useState, useEffect, useMemo } from "react";
import { CompanyDataContext } from "../context/CompanyData/CompanyDataContext";
import { Input } from "@/components/ui/input";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const IffcoDealersPage = () => {
  const { companyDealerData } = useContext(CompanyDataContext);
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const contactsPerPage = 22;
  const token = useSelector((state) => state.auth.token);

  const { id } = useParams();
  // console.log(typeof(id));

  const { companyLogo } = useContext(CompanyDataContext);


  const { data: companyDealers, isLoading } = useQuery({
    queryKey: ["iffco-dealers", id, token],
    queryFn: () => getCompanyDealers(id === "4" ? "2" : id, token),
    enabled: !companyDealerData?.length, // Fetch only if context is empty
  });

  // Use context data if available, otherwise fall back to fetched data
  const finalCompanyDealer = companyDealerData?.length ? companyDealerData : companyDealers;

  // Filter data based on search text (memoize to prevent unnecessary recalculations)
  const filteredData = useMemo(() => {
    return finalCompanyDealer?.filter(
      (contact) =>
        contact?.name?.toLowerCase().includes(searchText.toLowerCase()) ||
        contact?.company_name?.toLowerCase().includes(searchText.toLowerCase()) ||
        contact?.address?.toLowerCase().includes(searchText.toLowerCase()) ||
        (contact?.zipcode && contact.zipcode.toString().includes(searchText))
    );
  }, [finalCompanyDealer, searchText]);

  // Paginate filtered data
  const totalContacts = filteredData?.length || 0;
  const currentPageData = useMemo(() => {
    const start = currentPage * contactsPerPage;
    return filteredData?.slice(start, start + contactsPerPage);
  }, [filteredData, currentPage]);

  // Handle page change for pagination
  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
    window.scrollTo(0, 0); // Scroll to top on page change
  };

  const { t } = useTranslation();

  return (
    <>
      <Header />
      <MobileScreenNav />

      <section
        className="breadcrumb flex justify-center items-center md:h-[300px] h-[200px]"
        style={{
          backgroundImage: `linear-gradient(#13693a, #13693a6e),url(${breadcrumbImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="breadcrumb-content">
          <div className="breadcrumb-links flex justify-center items-center text-2xl text-white">
            <p className="hover:text-lightgreen px-3">{t('Home')}</p>
            <FaChevronRight />
            <p className="hover:text-lightgreen px-3 capitalize">{t('Company Dealer')}</p>
          </div>
          <p
            className="text-lightgreen md:text-6xl text-4xl font-bold text-center mt-3 uppercase"
            style={{ textShadow: "0 0 15px black" }}
          >
            {t('Company Dealer')}
          </p>
        </div>
      </section>

      <section className="search-section-contact p-4 sticky lg:top-[158.25px] top-[62.44px] z-10 bg-lightdark">
        <div className="bg-white rounded-lg container lg:w-[500px] w-auto">
          <Input
            type="text"
            placeholder="Search with dealer name, location, pincode, etc."
            className="placeholder:text-gray-300"
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
      </section>

      <section className="dealer-wrapper">
        {isLoading ? (
          <Preloader />
        ) : (
          <div className="container">
            <div className="iffco-dealer-list grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 p-5 place-content-center">
              {currentPageData.length > 0 ?
                (
                  currentPageData?.map((item, idx) => (
                    <div
                      className="dealer-card bg-white flex gap-5 shadow rounded-3xl hover:scale-105 transition-[0.5s]"
                      key={idx}
                    >
                      <img
                        src={companyLogo}
                        alt="company-logo"
                        className="w-[100px] p-2 object-contain"
                      />
                      <div className="dealer-details w-full text-center">
                        <p className="uppercase text-start py-3">
                          <FaHouseLaptop className="inline me-2 " />
                          {item.name}
                        </p>
                        {item.address && (
                          <p className="text-start text-sm bg-whitesmoke p-3">
                            <GrMapLocation className="inline" /> {item.address}
                          </p>
                        )}
                        {item.zipcode && (
                          <p className="uppercase text-start py-3">
                            <LuMapPin className="inline mb-1" />
                            Pincode: {item.zipcode}
                          </p>
                        )}
                        <Link
                          to={`tel:${item.mobile}`}
                          className="py-2 shadow-lg px-5 text-white my-3 rounded-3xl md:text-xl text-sm bg-gradient-green inline-flex items-center animate-pulse"
                        >
                          <IoMdCall className="inline me-3" />
                          {t('Call Now')}
                        </Link>
                      </div>
                    </div>
                  ))
                ) :
                (
                  <div className="text-center">
                    <p className="text-2xl p-5 border text-center inline-block">NO DATA FOUND</p>
                  </div>
                )
              }
            </div>
          </div>
        )}
      </section>

      {/* Conditionally render pagination if filtered data exceeds contactsPerPage */}
      {totalContacts > contactsPerPage && (
        <div className="pagination-iffco-dealer my-5">
          <ReactPaginate
            breakLabel="..."
            nextLabel={<FiChevronsRight />}
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={Math.ceil(totalContacts / contactsPerPage)}
            previousLabel={<FiChevronsLeft />}
            renderOnZeroPageCount={null}
          />
        </div>
      )}

      <Footer />
    </>
  );
};

export default IffcoDealersPage;
