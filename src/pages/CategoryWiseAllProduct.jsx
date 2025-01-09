import React, { useCallback, useContext, useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import { getSingleProduct } from "../services/api";
import { FilterBtnContext } from "../context/CategoryWiseAllProduct/FilterBtnContext";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getCategoryWiseProduct } from "../services/api";
import ProductCard from "../components/elements/ProductCard";
import ProductCardSkeleton from "../components/elements/ProductCardSkeleton";
import BASE_URL from "../../config";
import { MdSort, MdFilterList } from "react-icons/md";
import BreadCrumb from "../components/elements/BreadCrumb";
import FilterProductSidebar from "../components/elements/FilterProductSidebar";
import SortProductTabs from "../components/elements/SortProductTabs";
import Header from "../components/layouts/Header/Header";
import MobileScreenNav from "../components/layouts/Header/MobileScreenNav";
import Footer from "../components/layouts/Footer/Footer";
import toast, { Toaster } from "react-hot-toast";
import { useInView } from "react-intersection-observer";
import preloader_image from "../assets/images/favicon/favicon-32x32.png";
import { SortStatusContext } from "../context/SortingProductContext/SortProductContext";
import { useDispatch, useSelector } from "react-redux";
import {
  addBrand,
  resetFilterParams,
} from "../redux/features/filterProducts/FilterSlice";
import NoDataFound from "../components/elements/NoDataFound";
import { useTranslation } from "react-i18next";

// Skeleton loading effect
const skeletonArray = new Array(6).fill(true);

const CategoryWiseAllProduct = () => {
  const { t } = useTranslation();
  const { category, type } = useParams();
  const [categoryId, setCategoryId] = useState(0);
  const [subtype, setSubType] = useState(null);

  const { priceSort } = useContext(SortStatusContext);

  const filterParams = useSelector((state) => state.counter.filterParams);

  console.log(filterParams);

  // const [stateId, setstateId] = useState(null);
  // const [districtId, setdistrictId] = useState(null);
  // const [yom, setYom] = useState(null);
  // const [brandId, setbrandId] = useState(null);
  // const [modelId, setmodelId] = useState(null);
  // const [minPrice, setminPrice] = useState(null);
  // const [maxPrice, setmaxPrice] = useState(null);
  const [skip, setSkip] = useState(0);
  const [take, setTake] = useState(12);

  // const brand_session_id = sessionStorage.getItem("brand-session-id");

  // console.log(priceSort);

  const token = useSelector((state) => state.auth.token);

  // Handle filter and sort buttons for mobile view
  const {
    data: allProducts,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = useInfiniteQuery({
    queryKey: [
      "category-wise-all-product",
      categoryId,
      subtype,
      skip,
      take,
      priceSort,
      filterParams.stateId.toString(),
      filterParams.districtId.toString(),
      filterParams.yom.toString(),
      filterParams.brandId.toString(),
      // brand_session_id,
      filterParams.modelId.toString(),
      filterParams.minPrice,
      filterParams.maxPrice,
      token
    ], // Add the languageId to the queryKey for better cache management
    queryFn: ({ pageParam }) =>
      getCategoryWiseProduct(
        categoryId,
        subtype,
        pageParam * take,
        take,
        priceSort,
        filterParams.stateId.toString(),
        filterParams.districtId.toString(),
        filterParams.yom.toString(),
        filterParams.brandId.toString(),
        filterParams.modelId.toString(),
        filterParams.minPrice,
        filterParams.maxPrice,
        token
      ), // Pass a function that calls getCategoryList

    getNextPageParam: (lastpage, allPages) => {
      return lastpage && lastpage.length === 12
        ? allPages.length + 1
        : undefined;
    },

    initialPageParam: 0,
  });

  const { filterBtnState, setFilterBtnState } = useContext(FilterBtnContext);
  const [sortBtnActive, setSortBtnActive] = useState(false);

  const handleSortBtn = () => {
    setSortBtnActive(!sortBtnActive);
  };

  const { ref, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (inView) {
      if (hasNextPage) {
        fetchNextPage();
      } else {
        toast.success("All products are loaded!", { duration: 5000 });
      }
    }
  }, [inView, hasNextPage]);

  useEffect(() => {
    // Set categoryId and subtype based on route params
    if (category === "tractor") {
      setCategoryId(1);
      setSubType(type);
    } else if (category === "goods-vehicle") {
      setCategoryId(3);
      setSubType(type);
    } else if (category === "harvester") {
      setCategoryId(4);
      setSubType(type);
    } else if (category === "implements") {
      setCategoryId(5);
      setSubType(type);
    } else if (category === "tyre") {
      setCategoryId(7);
      setSubType(type);
    } else if (category === "agri-inputs") {
      if (type === "seeds") setCategoryId(6);
      if (type === "pesticides") setCategoryId(8);
      if (type === "fertilizer") setCategoryId(9);
    }
  }, [category, type]);

  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(resetFilterParams());
    };
  }, []);

  console.log("all product", allProducts);

  return (
    <>
      <Header />
      {/* <MobileScreenNav /> */}
      <BreadCrumb />
      {/* <Toaster /> */}

      {/* Mobile View: Sort and Filter Button */}
      <section className="mobile-filter-and-sort-btn lg:hidden block bg-lightgreen sticky md:top-[147px] top-[62px] z-10">
        <div className="container px-10  grid grid-cols-2">
          <button
            type="button"
            className="sort-btn text-lg text-white border-r border-white h-full py-2"
            onClick={() => setFilterBtnState(true)}
          >
            <MdFilterList className="inline mb-1" /> {t('Filter')}
          </button>
          <button
            type="button"
            className="sort-btn text-lg text-white"
            onClick={handleSortBtn}
          >
            <MdSort className="inline mb-1" /> {t('Sort')}
          </button>
        </div>
      </section>

      <main className="products-container-wrapper container bg-whitesmoke md:px-10 ">
        <FilterProductSidebar
          categoryId={categoryId}
          type={type}
          categoryProduct={allProducts}
        />
        <SortProductTabs
          sort_btn_state={sortBtnActive}
          sortBtnActive={sortBtnActive}
          setSortBtnActive={setSortBtnActive}
        />

        <section className="category-wise-all-product">
          {isLoading ? (
            <div className="product-skeleton grid md:grid-cols-3 2xl:grid-cols-4 grid-cols-2 px-5 gap-x-4">
              {skeletonArray.map((_, idx) => (
                <ProductCardSkeleton key={idx} />
              ))}
            </div>
          ) : (
            <div className="product-list-container mb-5">
              {allProducts.pages.length === 0 ? (
                <div className="rounded-3xl md:ms-3 w-full md:h-[400px] bg-white flex justify-center items-center">
                  <NoDataFound />
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 md:px-5  px-2 md:gap-x-4 gap-x-2">
                  {allProducts?.pages?.map(
                    (page) =>
                      page &&
                      page.map((item) => (
                        <Link
                          key={item.id}
                          to={`${BASE_URL}/${category}/${type}/${item.id}`}
                        >
                          <ProductCard
                            product_full_details={item}
                            product_image={
                              item.front_image ? item.front_image : item.image1
                            }
                            product_title={
                              `${item.brand_name} ${item.model_name}` ===
                                "Others Others" ||
                                `${item.brand_name} ${item.model_name}` ===
                                "undefined undefined" ||
                                `${item.brand_name} ${item.model_name}` ===
                                "null null"
                                ? item.title
                                : `${item.brand_name} ${item.model_name}`
                            }
                            product_location={item.district_name}
                            product_pricing={item.price}
                            distance_product={item.distance}
                            rent_type={
                              type === "rent"
                                ? item.rent_type
                                  ? ` / ${item.rent_type.slice(4)}`
                                  : ""
                                : ""
                            }
                          />
                        </Link>
                      ))
                  )}
                </div>
              )}

              {hasNextPage ? (
                <div
                  ref={ref}
                  className="lod-more-product flex items-center gap-2 justify-center w-full mt-5"
                >
                  <div className="relative">
                    <span className="loader"></span>
                    <img
                      src={preloader_image}
                      alt="this is a icon of preloader"
                      className="absolute top-[49.5%] left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full shadow-lg"
                    />
                  </div>
                  <span className="text-darkGreen text-2xl">{t('Loading More')}</span>
                </div>
              ) : null}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </>
  );
};

export default CategoryWiseAllProduct;
