/* eslint-disable react/prop-types */
import {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { FaAngleDown } from "react-icons/fa6";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import { FilterBtnContext } from "../../context/CategoryWiseAllProduct/FilterBtnContext";
import { useQuery } from "@tanstack/react-query";
import {
  getBrandList,
  getMaxMinPrice,
  getStateDistrictList,
  getYearOfPurchaseList,
} from "../../services/api";
import BrandModelSkeleton from "./BrandModelSkeleton";
import { useDispatch, useSelector } from "react-redux";
import {
  addBrand,
  addDistricts,
  addModel,
  addStates,
  addYom,
  resetFilterParams,
} from "../../redux/features/filterProducts/FilterSlice";
import { useLocation } from "react-router-dom";
import PriceRangeSlider from "./PriceRangeSlider";
import { useTranslation } from "react-i18next";

const FilterProductSidebar = ({ categoryId, type, categoryProduct }) => {
  const { filterBtnState, setFilterBtnState } = useContext(FilterBtnContext);
  console.log(categoryId);
  console.log(type);
  const token = useSelector((state) => state.auth.token);

  const { data: brandList, isLoading: brandLoading } = useQuery({
    queryKey: ["brand-list", categoryId, type,token],
    queryFn: () => getBrandList(categoryId, type,token),
    enabled: !!categoryProduct,
  });
  const { data: statedistrictList, isLoading: stateLoading } = useQuery({
    queryKey: ["state-district-list", categoryId, type,token],
    queryFn: () => getStateDistrictList(categoryId, type,token),
    enabled: !!brandList,
  });
  const { data: yearOfPurchaseList, isLoading: yopLoading } = useQuery({
    queryKey: ["year-of-purchase-list", categoryId, type,token],
    queryFn: () => getYearOfPurchaseList(categoryId, type,token),
    enabled: !!statedistrictList,
  });
  const { data: maxminPrice, isLoading: maxminpriceLoading } = useQuery({
    queryKey: ["maxmin-price-list", categoryId, type,token],
    queryFn: () => getMaxMinPrice(categoryId, type,token),
    enabled: !!yearOfPurchaseList,
  });

  const popular_brand_list = brandList
    ? brandList.filter((brand) => brand.popular === 1 && brand.item_count != 0)
    : [];
  const other_brand_list = brandList
    ? brandList.filter((brand) => brand.item_count != 0 && brand.popular != 1)
    : [];

  // console.log(statedistrictList);
  // console.log(yearOfPurchaseList);
  // console.log(Math.ceil(maxminPrice.min));

  // console.log(brandList);

  const [brandwiseModelList, setBrandwiseModelList] = useState([]);
  const [statewiseDistrictList, setStatewiseDistrictList] = useState([]);

  const getModelList = (brandId) => {
    const brand = brandList?.find((item) => item.brand_id === brandId);
    if (!brand) return;

    setBrandwiseModelList((prev) => {
      const brandExists = prev.some((item) => item.brand_id === brand.brand_id);

      if (brandExists) {
        // If the brand is already in the list, remove it
        return prev.filter((item) => item.brand_id !== brand.brand_id);
      } else {
        // If the brand is not in the list, add it
        return [...prev, brand];
      }
    });
  };

  const getDistrictList = (stateId) => {
    const clickedstate = statedistrictList?.find(
      (item) => item.state_id === stateId
    );

    if (!clickedstate) return;

    setStatewiseDistrictList((prev) => {
      const stateExists = prev.some(
        (item) => item.state_id === clickedstate.state_id
      );

      if (stateExists) {
        // If the brand is already in the list, remove it
        return prev.filter((item) => item.state_id !== clickedstate.state_id);
      } else {
        // If the brand is not in the list, add it
        return [...prev, clickedstate];
      }
    });
  };

  // To log the updated state, use a useEffect hook
  useEffect(() => {
    console.log(statewiseDistrictList);
  }, [statewiseDistrictList]);

  const dispatch = useDispatch();
  // const location = useLocation();

  // useEffect(() => {
  //   // Reset filterParams whenever the route changes
  //   dispatch(resetFilterParams());
  // }, [location.pathname, dispatch]);

  const brands = useSelector((state) => state.counter.filterParams.brandId);
  const models = useSelector((state) => state.counter.filterParams.modelId);
  const states = useSelector((state) => state.counter.filterParams.stateId);
  const districts = useSelector(
    (state) => state.counter.filterParams.districtId
  );
  const yoms = useSelector((state) => state.counter.filterParams.yom);
  const minPrice = useSelector((state) => state.counter.filterParams.minPrice);
  const maxPrice = useSelector((state) => state.counter.filterParams.maxPrice);
  const popularBrandId = useSelector(
    (state) => state.counter.filterParams.populerBrandId
  );

  console.log(`"${brands}"`);
  // console.log(`"${models}"`);
  // console.log(`"${states}"`);
  // console.log(`"${districts}"`);
  // console.log(`"${yoms}"`);
  // console.log(`"${minPrice}"`);
  // console.log(`"${maxPrice}"`);

  console.log("popular Band:", popularBrandId);

  useLayoutEffect(() => {
    const labels = document.querySelectorAll(".brand-select label");
    labels.forEach((label) => {
      if (label && +label.getAttribute("label-id") === popularBrandId) {
        label.click();
      }
      console.log(typeof label.getAttribute("label-id"));
      console.log(typeof popularBrandId);
    });
  }, [brandList]);

  const {t} = useTranslation();

  return (
    <>
      <aside
        className={
          filterBtnState
            ? "filter-product-sidebar active"
            : "filter-product-sidebar"
        }
      >
        <div className="lg:hidden filter-headeing flex items-center px-5 py-2 sticky -top-[8px] z-50 rounded-xl">
          <HiOutlineArrowNarrowLeft
            className="text-3xl text-white absolute"
            onClick={() => {
              setFilterBtnState(false);
            }}
          />
          <p className="text-xl text-white text-center w-full ">{t('Filter')}</p>
        </div>

        <section className="w-full bg-white my-3 p-2 rounded-3xl shadow">
          {categoryId !== 6 && categoryId !== 8 && categoryId !== 9 ? (
            <>
              <div className="product__brands">
                <details
                  open
                  className="rounded-3xl bg-white overflow-hidden shadow mb-3"
                >
                  <summary className="list-none">
                    <div className="flex text-darkGreen w-full justify-between items-center px-5 py-4">
                      <span>{t('BRANDS')}</span>
                      <FaAngleDown className="inline" />
                    </div>
                  </summary>
                  <div className="brands-list border-t p-2 max-h-[400px] overflow-y-auto">
                    <div className="popular-brands text-center">
                      <p className="text-sm bg-gradient-green text-white px-3 py-2 mb-2 rounded-xl">
                        {t('POPULAR BRANDS')}
                      </p>
                      <div className="grid grid-cols-3 gap-2">
                        {brandLoading ? (
                          <BrandModelSkeleton />
                        ) : (
                          popular_brand_list &&
                          popular_brand_list.map((item, idx) => (
                            <div className="brand-select " key={item.brand_id}>
                              <input
                                type="checkbox"
                                id={item.brand_id}
                                className="hidden"
                              />
                              {console.log(item?.brand_id)}
                              {/* {console.log(typeof(+brand_session_id))} */}
                              <label
                                htmlFor={item.brand_id}
                                className=" border rounded-2xl p-2"
                                label-id={item.brand_id}
                                onClick={()=>{
                                  getModelList(item.brand_id);
                                }}
                              >
                                <div
                                  className="text-center"
                                  onClick={() => {
                                    dispatch(addBrand(item.brand_id));
                                    
                                  }}
                                >
                                  <img
                                    src={item.brand_logo}
                                    alt="brand-logo"
                                    className="w-[40px] h-[40px] object-contain mx-auto"
                                  />
                                  <p className="brand-name capitalize text-sm truncate">
                                    {item.brand_name}
                                  </p>
                                  <p className="brand-product-count text-sm">
                                    ({item.item_count})
                                  </p>
                                </div>
                              </label>
                            </div>
                          ))
                        )}
                      </div>
                      <p className="text-sm bg-gradient-green text-white px-3 py-2 my-3 rounded-xl">
                        {t('OTHER BRANDS')}
                      </p>
                      <div className="grid grid-cols-3 gap-2">
                        {brandLoading ? (
                          <BrandModelSkeleton />
                        ) : (
                          other_brand_list &&
                          other_brand_list.map((item) => (
                            <div className="brand-select " key={item.brand_id}>
                              <input
                                type="checkbox"
                                id={item.brand_id}
                                className="hidden"
                              />
                              <label
                                htmlFor={item.brand_id}
                                className=" border rounded-2xl p-2"
                                label-id={item.brand_id}
                              >
                                <div
                                  className="text-center"
                                  onClick={() => {
                                    dispatch(addBrand(item.brand_id));
                                    getModelList(item.brand_id);
                                  }}
                                >
                                  <img
                                    src={item.brand_logo}
                                    alt="brand-logo"
                                    className="w-[40px] h-[40px] object-contain mx-auto"
                                  />
                                  <p className="brand-name capitalize text-sm truncate">
                                    {item.brand_name}
                                  </p>
                                  <p className="brand-product-count text-sm">
                                    ({item.item_count})
                                  </p>
                                </div>
                              </label>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  </div>
                </details>
              </div>
              {brands && brands.length != 0 ? (
                <div className="brandwise__models">
                  <details
                    className="rounded-3xl bg-white overflow-hidden shadow mb-3"
                  >
                    <summary className="list-none">
                      <div className="flex text-darkGreen w-full justify-between items-center px-5 py-4">
                        <span>{t('MODELS')}</span>
                        <FaAngleDown className="inline" />
                      </div>
                    </summary>
                    {brandwiseModelList &&
                      brandwiseModelList.map((item) => (
                        <div
                          className="brands-list border-t p-2 overflow-y-auto"
                          key={item.id}
                        >
                          <div className="popular-brands text-center">
                            <p className="text-sm bg-gradient-green text-white px-3 py-2 mb-2 rounded-xl">
                              {item.brand_name}
                            </p>
                            <div className="grid grid-cols-3 gap-2">
                              {brandLoading ? (
                                <BrandModelSkeleton />
                              ) : (
                                item &&
                                item.model
                                  .filter((item) => item.item_count != 0)
                                  .map((model) => (
                                    <div
                                      className="model-select "
                                      key={model.model_id}
                                    >
                                      <input
                                        type="checkbox"
                                        id={model.model_id}
                                        className="hidden"
                                      />
                                      <label
                                        htmlFor={model.model_id}
                                        className=" border rounded-2xl p-2"
                                      >
                                        <div
                                          className="text-center"
                                          onClick={() =>
                                            dispatch(addModel(model.model_id))
                                          }
                                        >
                                          <img
                                            src={model.model_image}
                                            alt="brand-logo"
                                            className="w-[40px] h-[40px] object-contain mx-auto"
                                          />
                                          <p className="brand-name capitalize text-sm truncate">
                                            {model.model_name}
                                          </p>
                                          <p className="brand-product-count text-sm">
                                            ({model.item_count})
                                          </p>
                                        </div>
                                      </label>
                                    </div>
                                  ))
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                  </details>
                </div>
              ) : null}
              <div className="product_statewise">
                <details className="rounded-3xl bg-white overflow-hidden shadow mb-3">
                  <summary className="list-none">
                    <div className="flex text-darkGreen w-full justify-between items-center px-5 py-4">
                      <span>{t('STATES')}</span>
                      <FaAngleDown className="inline" />
                    </div>
                  </summary>
                  <div className="state-list border-t p-2 max-h-[400px] overflow-y-auto">
                    <ul>
                      {statedistrictList &&
                        statedistrictList
                          .filter((state) => state.item_count != 0)
                          .map((state) => (
                            <li
                              key={state.state_id}
                              className="state-and-district-list "
                            >
                              <input
                                type="checkbox"
                                id={state.state_name}
                                className="hidden"
                              />
                              <label
                                htmlFor={state.state_name}
                                className=" bg-white shadow m-3 p-3 rounded-2xl text-sm items-center justify-between transition-[0.3s] hover:scale-105"
                                onClick={() => {
                                  dispatch(addStates(state.state_id));
                                  getDistrictList(state.state_id);
                                }}
                              >
                                <div className="flex justify-between">
                                  <span className="inline-block">
                                    {state.state_name}
                                  </span>
                                  <span className="text-nowrap inline-block">
                                    {state.item_count} Items
                                  </span>
                                </div>
                              </label>
                            </li>
                          ))}
                    </ul>
                  </div>
                </details>
              </div>
              {states != "" ? (
                <div className="product_districtwise">
                  <details className="rounded-3xl bg-white overflow-hidden shadow mb-3">
                    <summary className="list-none">
                      <div className="flex text-darkGreen w-full justify-between items-center px-5 py-4">
                        <span>{t('DISTRICT')}</span>
                        <FaAngleDown className="inline" />
                      </div>
                    </summary>
                    {statewiseDistrictList &&
                      statewiseDistrictList.map((gstate) => (
                        <div
                          className="district-list border-t p-2"
                          key={gstate.state_id}
                        >
                          <p className="text-sm text-center bg-gradient-green text-white px-3 py-2 mb-2 rounded-xl">
                            {gstate.state_name}
                          </p>
                          <ul>
                            {
                              // console.log(gstate.dist)
                              gstate.dist.map((district) => (
                                <li
                                  key={district.dist_id}
                                  className="state-and-district-list "
                                >
                                  <input
                                    type="checkbox"
                                    id={district.dist_name}
                                    className="hidden"
                                  />
                                  <label
                                    htmlFor={district.dist_name}
                                    className=" bg-white shadow m-3 p-3 rounded-2xl text-sm items-center justify-between transition-[0.3s] hover:scale-105"
                                    onClick={() =>
                                      dispatch(addDistricts(district.dist_id))
                                    }
                                  >
                                    <div className="flex justify-between">
                                      <span className="inline-block">
                                        {district.dist_name}
                                      </span>
                                      <span className="text-nowrap inline-block">
                                        {district.item_count} Items
                                      </span>
                                    </div>
                                  </label>
                                </li>
                              ))
                            }
                          </ul>
                        </div>
                      ))}
                  </details>
                </div>
              ) : null}
              <div className="product_districtwise">
                <details className="rounded-3xl bg-white overflow-hidden shadow mb-3">
                  <summary className="list-none ">
                    <div className="flex text-darkGreen w-full justify-between items-center px-5 py-4">
                      <span>{t('YEAR')}</span>
                      <FaAngleDown className="inline" />
                    </div>
                  </summary>
                  <div className="state-list border-t p-2 max-h-[400px] overflow-y-auto">
                    <ul>
                      {yearOfPurchaseList &&
                        yearOfPurchaseList
                          .filter((yop) => yop.item_count != 0)
                          .map((yop) => (
                            <li key={yop.year} className="year-of-manufacture">
                              <input
                                type="checkbox"
                                id={yop.year}
                                className="hidden"
                              />
                              <label
                                htmlFor={yop.year}
                                className=" bg-white shadow m-3 p-3 rounded-2xl text-sm justify-between hover:scale-105"
                                onClick={() => dispatch(addYom(yop.year))}
                              >
                                <div className="flex justify-between items-center">
                                  <span>{yop.year}</span>
                                  <span className="text-nowrap">
                                    {yop.item_count} Items
                                  </span>
                                </div>
                              </label>
                            </li>
                          ))}
                    </ul>
                  </div>
                </details>
              </div>
            </>
          ) : null}

          <div className="product_by_year">
            <details className="rounded-3xl bg-white overflow-hidden shadow mb-3">
              <summary className="list-none ">
                <div className="flex text-darkGreen w-full justify-between items-center px-5 py-4">
                  <span>{t('PRICE')}</span>
                  <FaAngleDown className="inline" />
                </div>
              </summary>
              <PriceRangeSlider
                max_price={maxminPrice && Math.ceil(maxminPrice.max)}
                min_price={maxminPrice && Math.ceil(maxminPrice.min)}
              />
            </details>
          </div>
        </section>

        <div className="text-center animate-pulse sticky bottom-[-100px] right-0 md:hidden block">
          <button
            onClick={() => {
              setFilterBtnState(false);
            }}
            type="button"
            className="apply-filter w-[160px] text-center px-5 py-2 bg-gradient-green shadow-lg rounded-3xl  text-white ms-auto"
          >
            APPLY
          </button>
        </div>
      </aside>
    </>
  );
};

export default FilterProductSidebar;
