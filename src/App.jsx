import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import React, { Suspense, useEffect, useState } from "react";
import "./App.css";
import Preloader from "./components/elements/Preloader";
import SplashScreen from "./components/elements/SplashScreen";
import { FilterButtonStateProvider } from "./context/CategoryWiseAllProduct/FilterBtnContext";
import { CompanyDataProvider } from "./context/CompanyData/CompanyDataContext";
import { SortStatusProvider } from "./context/SortingProductContext/SortProductContext";
import { useDispatch, useSelector } from "react-redux";
import { setLogInState, setToken } from "./redux/features/Auth/AuthSlice";
import MobileScreenNav from "./components/layouts/Header/MobileScreenNav";
import { Toaster } from "react-hot-toast";
import NotFoundPage from "./components/elements/NotFoundPage";
import CryptoJS from "crypto-js";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfUse from "./pages/TermsOfUse";
import DataRetentionPolicy from "./pages/DataRetentionPolicy";
import CropCalenderMenus from "./pages/crop-calender/CropCalenderMenus";
import CropContents from "./pages/crop-calender/CropContents";
import AboutUs from "./pages/AboutUs";
import BASE_URL from "../config";
import ContactUs from "./pages/ContactUs";
import SignUpModal from "./components/layouts/SignUpModal";
import RentModal from "./components/layouts/RentModal";
import SellModal from "./components/layouts/SellModal";


// Lazy load components
const LazyComponents = {
  HomePage: React.lazy(() => import("./pages/HomePage")),
  CategoryViewAll: React.lazy(() => import("./pages/CategoryWiseAllProduct")),
  SingleProduct: React.lazy(() => import("./pages/SinglProductPage")),
  CompanyProducts: React.lazy(() => import("./pages/CompanyProductsPage")),
  CompanyDealers: React.lazy(() => import("./pages/CompanyDealersPage")),
  WeatherForecast: React.lazy(() => import("./pages/WeatherForecastPage")),
  Wishlist: React.lazy(() => import("./pages/WishListPage")),
  UserProfile: React.lazy(() => import("./pages/UserProfile")),
  SellProduct: React.lazy(() => import("./pages/SellProductPage")),
};

// const RedirectToExternal = () => {
//   window.location.href = "https://blogs.krishivikas.com/";
//   return <Navigate to={`/${BASE_URL}`} replace />;;
// };

const App = () => {
  const baseUrl = "";
  const guestToken = "31695|WQ4XiGAulHmYnH1rcGmXopR3mWpNBytWfWLbl1fu2e1c55ea";
  // const guestToken = "1322|bVj5PIv6D4gJA8wEyMf5buNvqzAWfkmIhi9rPKCj63b4d4e8";
  const location = useLocation();
  const dispatch = useDispatch();

  const authState = useSelector((state) => state.auth);
  // console.log(authState)

  const secretKey = "kv-auth-token";



  // Handle token & login state initialization
  useEffect(() => {
    try {
      const encryptedData = localStorage.getItem("KV_SESSION");
      const loginState = localStorage.getItem("isLoggedIn") === "true";

      if (encryptedData && loginState) {
        const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
        const decryptedToken = bytes.toString(CryptoJS.enc.Utf8);

        if (decryptedToken) {
          dispatch(setToken(decryptedToken));
          dispatch(setLogInState(true));
        }
      } else {
        // Use guest token if no valid session is found
        dispatch(setToken(guestToken));
        dispatch(setLogInState(false));
      }
    } catch (error) {
      console.error("Error decrypting token:", error);
      dispatch(setToken(guestToken));
      dispatch(setLogInState(false));
    }
  }, [dispatch]);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const [isLoading, setLoading] = useState(true);

  return (
    <>
      <Toaster position="bottom-center" reverseOrder={false} />

      <CompanyDataProvider>
        <SortStatusProvider>
          {isLoading && <SplashScreen setLoading={setLoading} />}
          <Routes>
            <Route
              path={`${baseUrl}`}
              element={
                <Suspense fallback={<Preloader />}>
                  <LazyComponents.HomePage />
                </Suspense>
              }
            />
            <Route
              path={`${baseUrl}/:category/:type`}
              element={
                <Suspense fallback={<Preloader />}>
                  <FilterButtonStateProvider>
                    <LazyComponents.CategoryViewAll key={location.key} />
                  </FilterButtonStateProvider>
                </Suspense>
              }
            />
            <Route
              path={`${baseUrl}/:category/:type/:id`}
              element={
                <Suspense fallback={<Preloader />}>
                  <LazyComponents.SingleProduct key={location.key} />
                </Suspense>
              }
            />
            <Route
              path={`${baseUrl}/company/:companyId`}
              element={
                <Suspense fallback={<Preloader />}>
                  <LazyComponents.CompanyProducts key={location.key} />
                </Suspense>
              }
            />
            <Route
              path={`${baseUrl}/company-dealers/:id`}
              element={
                <Suspense fallback={<Preloader />}>
                  <LazyComponents.CompanyDealers key={location.key} />
                </Suspense>
              }
            />
            <Route
              path={`${baseUrl}/weather-forecast`}
              element={
                <Suspense fallback={<Preloader />}>
                  <LazyComponents.WeatherForecast key={location.key} />
                </Suspense>
              }
            />
            <Route
              path={`${baseUrl}/wishlist`}
              element={
                <Suspense fallback={<Preloader />}>
                  <LazyComponents.Wishlist key={location.key} />
                </Suspense>
              }
            />
            <Route
              path={`${baseUrl}/profile`}
              element={
                <Suspense fallback={<Preloader />}>
                  <LazyComponents.UserProfile key={location.key} />
                </Suspense>
              }
            />
            <Route
              path={`${baseUrl}/sell-product`}
              element={
                <Suspense fallback={<Preloader />}>
                  <LazyComponents.SellProduct key={location.key} />
                </Suspense>
              }
            />
            <Route path="*" element={<NotFoundPage />} />
            <Route path={`${baseUrl}/about`} element={<AboutUs />} />
            <Route path={`${baseUrl}/contact`} element={<ContactUs />} />
            {/* <Route path={`/blogs`} element={<RedirectToExternal />}  /> */}
            <Route path={`${baseUrl}/crop-calender`} element={<CropCalenderMenus />} />
            <Route path={`${baseUrl}/crop-calender/:cropCategory/:cropName`} element={<CropContents />} />
            <Route path={`${baseUrl}/privacy-policy`} element={<PrivacyPolicy />} />
            <Route path={`${baseUrl}/terms-of-use`} element={<TermsOfUse />} />
            <Route path={`${baseUrl}/data-retention-policy`} element={<DataRetentionPolicy />} />
            <Route path={`${baseUrl}/signup`} element={<SignUpModal />} />
            <Route path={`${baseUrl}/rent-post`} element={<RentModal />} />
            <Route path={`${baseUrl}/sell-post`} element={<SellModal />} />
          </Routes>
        </SortStatusProvider>
      </CompanyDataProvider>
    </>
  );
};

export default App;
