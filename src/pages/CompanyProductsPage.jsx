import { useQuery } from "@tanstack/react-query";
import Footer from "../components/layouts/Footer/Footer";
import Header from "../components/layouts/Header/Header";
import MobileScreenNav from "../components/layouts/Header/MobileScreenNav";
import { getCompanyDealers, getCompanyProduct } from "../services/api";
import iffcoLogo from "../assets/images/IFFCO-LOGO.jpg";
import Preloader from "../components/elements/Preloader";
import breadcrumbImage from "../assets/images/img_hero.jpg";
import { FaChevronRight } from "react-icons/fa6";
import { MdOutlineCurrencyRupee } from "react-icons/md";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router-dom";
import BASE_URL from "../../config";
import { useContext, useEffect } from "react";
import { CompanyDataContext } from "../context/CompanyData/CompanyDataContext";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const CompanyProductsPage = () => {
  const token = useSelector((state) => state.auth.token);

  const navigate = useNavigate();

  const { companyId } = useParams();

  console.log(companyId);

  const { companyLogo } = useContext(CompanyDataContext);


  const { data: companyProducts, isLoading: iffcoProductLoading } = useQuery({
    queryKey: ["company-product", companyId, token],
    queryFn: () => getCompanyProduct(companyId, token),
  });

  const { data: companyDealers } = useQuery({
    queryKey: ["company-dealers", companyId, token],
    queryFn: () => getCompanyDealers(companyId === "4" || companyId === "5" ? "2" : companyId === "11" ? "1" : companyId, token),
  });

  const { companyDealerData, setCompanyDealerData } = useContext(CompanyDataContext);
  setCompanyDealerData(companyDealers);
  // console.log(iffcoDealerData);


  // console.log(iffcoDealers);

  const { t } = useTranslation();
  return (
    <>
      <Header />
      {/* <MobileScreenNav /> */}
      <section
        className="breadcrumb flex justify-center items-center md:h-[300px] h-[200px]"
        style={{
          backgroundImage: `linear-gradient(#13693a, #13693a6e),url(${breadcrumbImage})`,
          backgroundSize: "cover", // Ensures the image covers the entire section
          backgroundPosition: "center", // Centers the image
        }}
      >
        <div className="breadcrumb-content">
          <div className="breadcrumb-links flex justify-center items-center text-2xl text-white">
            <p className="hover:text-lightgreen px-3">{t('Home')}</p>
            <FaChevronRight />
            <p className="hover:text-lightgreen px-3 capitalize">
              {t('Company Product')}
            </p>
          </div>
          <p
            className="text-lightgreen md:text-6xl text-4xl font-bold text-center mt-3 uppercase"
            style={{ textShadow: "0 0 15px black" }}
          >
            {t('Company Product')}
          </p>
        </div>
      </section>
      <main className="iffco-product-page container my-5">
        {iffcoProductLoading ? (
          <Preloader />
        ) : (
          <section className="iffco-products p-5 grid lg:grid-cols-4 grid-cols-2 md:px-5 gap-x-5">
            {companyProducts &&
              companyProducts.map((item) => (
                <Drawer key={item.id}>
                  <DrawerTrigger>
                    <div className="iffco-product-card rounded-3xl overflow-hidden bg-white shadow mb-4 flex flex-col justify-between hover:scale-95 transition-[0.3s]">
                      <img
                        src={item.product_image}
                        alt="iffco-image"
                        className={companyId === "4" || companyId === "5" ?
                          "md:h-[300px] h-[150px] w-full object-cover object-center p-2 rounded-3xl"
                          :
                          "md:h-[300px] h-[150px] w-full object-contain object-center p-5"
                        }
                      />
                      <div className="iffco-logo text-end px-5">
                        <img
                          src={companyLogo}
                          alt="this is iffco logo"
                          className="md:w-[80px] w-[60px] ms-auto"
                        />
                      </div>
                      <p className="md:text-md mt-3 text-sm text-center bg-lightdark text-white px-4 py-4 iffco-product-title truncate">
                        {item.product_name}
                      </p>
                    </div>
                  </DrawerTrigger>
                  <DrawerContent>
                    <div className="container h-[400px] overflow-y-auto">
                      <div className="grid lg:grid-cols-2 grid-cols-1">
                        <img
                          src={item.product_image}
                          alt="iffco product image"
                          className="lg:h-[400px] h-[250px] mx-auto p-5"
                        />
                        <div className="iffco-product-details p-5">
                          <DrawerHeader>
                            <DrawerTitle className="text-darkGreen text-lg lg:text-3xl">
                              {item.product_name}
                            </DrawerTitle>
                          </DrawerHeader>
                          <p className="">{item.description}</p>
                          <p className="my-4 text-darkGreen text-xl">{t('PRICE')} : <MdOutlineCurrencyRupee className="inline-block mb-1 " />{item.price}</p>
                        </div>

                      </div>
                    </div>

                    <DrawerFooter className="text-center">
                      <Button className="uppercase w-[300px] mx-auto bg-gradient-green" onClick={() => { navigate(`${BASE_URL}/company-dealers/${companyId}`) }}>{t('Show All Dealers')}</Button>
                      <DrawerClose>
                        <Button variant="outline">{t('close')}</Button>
                      </DrawerClose>
                    </DrawerFooter>
                  </DrawerContent>
                </Drawer>
              ))}
          </section>
        )}
      </main>

      <Footer />
    </>
  );
};

export default CompanyProductsPage;
