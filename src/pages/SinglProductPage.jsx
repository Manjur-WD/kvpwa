import Footer from "../components/layouts/Footer/Footer";
import Header from "../components/layouts/Header/Header";
import MobileScreenNav from "../components/layouts/Header/MobileScreenNav";
import { FiPhoneCall } from "react-icons/fi";
import { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import { addToWishList, getCategoryWiseAllProduct, getCategoryWiseProduct, getSingleProduct, getWishList, removeFromWishList } from "../services/api";
import { QueryClient, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import { Fancybox } from "@fancyapps/ui";

import { FaMapLocationDot } from "react-icons/fa6";
import { IoCalendar } from "react-icons/io5";
import { TbCurrencyRupee } from "react-icons/tb";
import user from "../assets/images/user.png";
import toastBg from "../assets/images/toast-bg.jpg";
import toastError from "../assets/images/toastError.jpg";
import { RiUpload2Fill } from "react-icons/ri";
import { FaHeartCirclePlus } from "react-icons/fa6";
import { FaHeartCircleMinus } from "react-icons/fa6";
import SingleProductSkeleton from "../components/layouts/SingleProduct/SIngleProductSkeleton";
import ProductDescSkeleton from "../components/layouts/SingleProduct/ProductDescSkeleton";
import SimilarProductCarousel from "../components/layouts/SingleProduct/SimilarProductCarousel";
import BASE_URL from "../../config";
import { RiLoader2Line } from "react-icons/ri";
import toast, { Toaster } from "react-hot-toast";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateWishListItems } from "../redux/features/wishlist/WishlistSlice";
import { useTranslation } from "react-i18next";



const SinglProductPage = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { category, type, id } = useParams();
  const token = useSelector((state) => state.auth.token);

  const [categoryId, setCategoryId] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const [wishListToggle, setToggleWish] = useState(true);
  const [wishLoading, setWishLoading] = useState(false);

  const {
    data: singleProduct,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["single-product", categoryId, id, wishListToggle, token],
    queryFn: () => getSingleProduct(categoryId, id, token),
    // enabled: !sessionData
  });

  console.log(singleProduct);
  

  // fetch Wishlist

  const fetchWishList = async () => {
    const response = await getWishList(token);
    // console.log(response);
    dispatch(updateWishListItems(response.response));
  }

  useEffect(() => {
    fetchWishList();
  }, [wishListToggle,token])

  const authState = useSelector((state) => state.auth);
  const isLoggedIn = authState.isLoggedIn;


  // Handle Wishlist Add/Remove
  const handleWishlist = async (categoryId, id, token) => {
    if (isLoggedIn) {
      if (singleProduct?.wishlist_status === 1) {
        setWishLoading(true);
        const response = await removeFromWishList(categoryId, id, token);
        if (response && response.success === 1) {
          setToggleWish(!wishListToggle);
          setWishLoading(false);
          toast.success("Removed from wishlist!",
            {
              duration: 3000,
              style: {
                border: '2px solid red',
                boxShadow: '0 0  25px red',
                padding: '16px',
                fontSize: '18px',
                color: 'white',
                textAlign: 'center',
                // backgroundColor: '#d1e7dd',
                background: `url(${toastBg}) no-repeat center/cover`,
                borderRadius: '8px',
              },

            }
          );
        }
      } else {
        // add to wishlist logic
        setWishLoading(true);
        const response = await addToWishList(categoryId, id, token);
        console.log(typeof (response?.success));
        if (response && response.success === 1) {
          setToggleWish(!wishListToggle);
          setWishLoading(false);
          toast.success("Added to wishlist!",
            {
              duration: 3000,
              style: {
                border: '2px solid green',
                boxShadow: '0 0  25px green',
                padding: '16px',
                fontSize: '18px',
                color: 'white',
                textAlign: 'center',
                // backgroundColor: '#d1e7dd',
                background: `url(${toastBg}) no-repeat center/cover`,
                borderRadius: '8px',
              },
            }

          );
        }
      }
    }
    else {
      toast.error("You are not Logged In !!!",
        {
          duration: 4000,
          style: {
            border: '2px solid red',
            boxShadow: '0 0  25px red',
            padding: '16px',
            fontSize: '18px',
            color: 'white',
            textAlign: 'center',
            // backgroundColor: '#d1e7dd',
            background: `url(${toastError}) no-repeat center/cover`,
            borderRadius: '8px',
          },

        }
      );
    }
  };

  useEffect(() => {
    Fancybox.bind("[data-fancybox]", {
      // Your custom options
    });
    // Tractor
    if (category == "tractor") {
      setCategoryId(1);
    }

    // Goods Vehicle
    else if (category == "goods-vehicle") {
      setCategoryId(3);
    }

    // Harvester
    else if (category == "harvester") {
      setCategoryId(4);
    }

    // Implements
    else if (category == "implements") {
      setCategoryId(5);
    }

    // Tyres
    else if (category == "tyre") {
      setCategoryId(7);
    }

    // Seeds
    else if (category == "agri-inputs" && type == "seeds") {
      setCategoryId(6);
    }
    // Pesticides
    else if (category == "agri-inputs" && type == "pesticides") {
      setCategoryId(8);
    }
    // Fertilizers
    else if (category == "agri-inputs" && type == "fertilizer") {
      setCategoryId(9);
    }
  }, [category, type]);



  // SIMILAR PRODUCT DATA

  const { data: similarProducts, isLoading: SimilarProductLoading } = useQuery({
    queryKey: ["similar-product", categoryId, type, token],
    queryFn: () => getCategoryWiseAllProduct(categoryId, type, 10, 7, token),
  });

  const [imgLink, setImgLink] = useState("");
  const [imgType, setImgType] = useState("");

  const handleLink = (linktext, imgtype) => {
    setImgLink(linktext);
    setImgType(imgtype);
  };

  const { t } = useTranslation();


  return (
    <>
      <Header />
      {/* <MobileScreenNav /> */}
      <Toaster position="bottom-center"
        reverseOrder={false} />
      <main className="single-product-wrapper">
        <div className="container  single-product-image grid lg:grid-cols-2 grid-cols-1 my-2 overflow-hidden">
          {isLoading ? (
            <SingleProductSkeleton />
          ) : (
            <div className="product-image-details-section grid md:grid-cols-[80px,1fr] grid-cols-[50px,1fr]">
              <div className="product_img_nav overflow-x-auto flex flex-col gap-3 items-center py-2 ps-2">
                {singleProduct && singleProduct.front_image && (
                  <div className="slide_image">
                    <Link
                      to={singleProduct.front_image}
                      data-fancybox="product_img"
                      data-caption="Front Image"
                    >
                      <img
                        src={singleProduct.front_image}
                        alt="front image"
                        className="w-full"
                        onMouseOver={() => {
                          handleLink(singleProduct.front_image, "Front Image");
                        }}
                      />
                    </Link>
                  </div>
                )}
                {singleProduct && singleProduct.left_image && (
                  <div className="slide_image">
                    <Link
                      to={singleProduct.left_image}
                      data-fancybox="product_img"
                      data-caption="Left Image"
                    >
                      <img
                        src={singleProduct.left_image}
                        alt="left image"
                        className="w-full"
                        onMouseOver={() => {
                          handleLink(singleProduct.left_image, "Left Image");
                        }}
                      />
                    </Link>
                  </div>
                )}
                {singleProduct && singleProduct.right_image && (
                  <div className="slide_image">
                    <Link
                      to={singleProduct.right_image}
                      data-fancybox="product_img"
                      data-caption="Right Image"
                    >
                      <img
                        src={singleProduct.right_image}
                        alt="right image"
                        className="w-full"
                        onMouseOver={() => {
                          handleLink(singleProduct.right_image, "Right Image");
                        }}
                      />
                    </Link>
                  </div>
                )}
                {singleProduct && singleProduct.back_image && (
                  <div className="slide_image">
                    <Link
                      to={singleProduct.back_image}
                      data-fancybox="product_img"
                      data-caption="Back Image"
                    >
                      <img
                        src={singleProduct.back_image}
                        alt="back image"
                        className="w-full"
                        onMouseOver={() => {
                          handleLink(singleProduct.back_image, "Back Image");
                        }}
                      />
                    </Link>
                  </div>
                )}
                {singleProduct && singleProduct.meter_image && (
                  <div className="slide_image">
                    <Link
                      to={singleProduct.meter_image}
                      data-fancybox="product_img"
                      data-caption="Meter Image"
                    >
                      <img
                        src={singleProduct.meter_image}
                        alt="meter image"
                        className="w-full"
                        onMouseOver={() => {
                          handleLink(singleProduct.meter_image, "Meter Image");
                        }}
                      />
                    </Link>
                  </div>
                )}
                {singleProduct && singleProduct.tyre_image && (
                  <div className="slide_image">
                    <Link
                      to={singleProduct.tyre_image}
                      data-fancybox="product_img"
                      data-caption="Tyre Image"
                    >
                      <img
                        src={singleProduct.tyre_image}
                        alt="tyre image"
                        className="w-full"
                        onMouseOver={() => {
                          handleLink(singleProduct.tyre_image, "Tyre Image");
                        }}
                      />
                    </Link>
                  </div>
                )}
                {singleProduct && singleProduct.image1 && (
                  <div className="slide_image">
                    <Link
                      to={singleProduct.image1}
                      data-fancybox="product_img"
                      data-caption="Image-1"
                    >
                      <img
                        src={singleProduct.image1}
                        alt="image"
                        className="w-full"
                        onMouseOver={() => {
                          handleLink(singleProduct.image1, "Image-1");
                        }}
                      />
                    </Link>
                  </div>
                )}
                {singleProduct && singleProduct.image2 && (
                  <div className="slide_image">
                    <Link
                      to={singleProduct.image2}
                      data-fancybox="product_img"
                      data-caption="Image-2"
                    >
                      <img
                        src={singleProduct.image2}
                        alt="image"
                        className="w-full"
                        onMouseOver={() => {
                          handleLink(singleProduct.image2, "Image-2");
                        }}
                      />
                    </Link>
                  </div>
                )}
                {singleProduct && singleProduct.image3 && (
                  <div className="slide_image">
                    <Link
                      to={singleProduct.image3}
                      data-fancybox="product_img"
                      data-caption="Image-3"
                    >
                      <img
                        src={singleProduct.image3}
                        alt="image"
                        className="w-full"
                        onMouseOver={() => {
                          handleLink(singleProduct.image3, "Image-3");
                        }}
                      />
                    </Link>
                  </div>
                )}
              </div>
              <div className="product_image_main p-2">
                <Link
                  to={
                    imgLink == ""
                      ? (singleProduct && singleProduct.front_image) ||
                      (singleProduct && singleProduct.image1)
                      : imgLink
                  }
                  data-fancybox="product_img"
                  data-caption={imgType}
                >
                  {singleProduct &&
                    (singleProduct.front_image || singleProduct.image1) && (
                      <img
                        src={
                          imgLink != null && imgLink !== "" // More strict check for imgLink
                            ? imgLink
                            : singleProduct.front_image ||
                            singleProduct.image1 ||
                            "/path/to/placeholder.jpg"
                        }
                        alt="different side image"
                        className="md:h-[550px] h-[350px] shadow rounded-3xl w-full object-cover object-center"
                      />
                    )}
                </Link>
              </div>
            </div>
          )}

          {isLoading ? (
            <ProductDescSkeleton />
          ) : (
            <div className="product_description border shadow m-3 p-3 rounded-3xl bg-white">
              <h2 className="prod-name uppercase md:text-3xl text-2xl text-darkGreen font-black">
                {singleProduct
                  ? // Check if either brand_name or model_name is null, undefined, or "Others"
                  singleProduct.brand_name == null ||
                    singleProduct.brand_name === "Others" ||
                    singleProduct.model_name == null ||
                    singleProduct.model_name === "Others"
                    ? `${singleProduct.title}` // If any is null, undefined, or "Others", show title
                    : `${singleProduct.brand_name} ${singleProduct.model_name}` // Otherwise, show brand_name and model_name
                  : null}
                {/* In case singleProduct is null, render nothing */}
              </h2>

              <h3 className="uppercase my-2 md:text-xl">
                <FaMapLocationDot className="inline mb-2 text-darkGreen" />{" "}
                {singleProduct &&
                  `${singleProduct.address}, ${singleProduct.city_name}, ${singleProduct.district_name}, ${singleProduct.state_name}, ${singleProduct.zipcode}`}
              </h3>
              <h5 className="uppercase mb-2 md:text-xl">
                <IoCalendar className="inline mb-2 text-darkGreen" />{" "}
                {singleProduct && `${singleProduct.created_at.slice(0, 10)}`}
              </h5>
              <div className="flex justify-between items-center pe-5">
                <h4 className="lowercase mb-2 md:text-4xl text-2xl font-bold text-darkGreen">
                  <TbCurrencyRupee className="inline mb-2 text-darkGreen" />
                  {type == "rent"
                    ?
                    `${singleProduct?.price}/${singleProduct?.rent_type.slice(4)}`
                    : `${singleProduct?.price}`}
                </h4>


                {
                  !isLoggedIn ?
                    (<button
                      type="button"
                      className={"bg-darkGreen mb-3 text-white py-1 px-3 rounded-2xl"}
                      onClick={() => handleWishlist(singleProduct?.category_id, singleProduct?.id, token)}
                      disabled={isLoading}
                    >
                      <FaHeartCirclePlus className="animate-pulse inline me-1 mb-1" />{t('Add to wishlist')}
                    </button>)
                    :
                    (<button
                      type="button"
                      className={singleProduct?.wishlist_status === 1 ? "bg-red-600 mb-3 text-white py-1 px-3 rounded-2xl" : "bg-darkGreen mb-3 text-white py-1 px-3 rounded-2xl"}
                      onClick={() => handleWishlist(singleProduct?.category_id, singleProduct?.id, token)}
                      disabled={isLoading}
                    >
                      {wishLoading ? (
                        <span className="text-white"><RiLoader2Line className="animate-spin inline me-1 mb-1" /> {t('Loading')} ...</span>
                      ) : singleProduct?.wishlist_status === 1 ? (

                        <span><FaHeartCircleMinus className="animate-pulse inline me-1 mb-1" />{t('Removed from wishlist')}</span>

                      ) : (

                        <span><FaHeartCirclePlus className="animate-pulse inline me-1 mb-1" />{t('Add to wishlist')}</span>

                      )}
                    </button>)
                }




              </div>
              <div className="grid md:grid-cols-2 grid-cols-1 gap-2">
                <div className="product_spec border border-[whitesmoke] overflow-hidden rounded-3xl shadow">
                  <p className="md:p-3 px-2 py-1 text-center heading shadow inline-block text-white m-2 rounded-3xl font-bold">

                    {t('Specifications')}
                  </p>
                  {type === "seeds" ||
                    type === "pesticides" ||
                    type === "fertilizer" ? (
                    <ul className="mt-2">
                      <li>
                        <span className="font-bold">Price Negotiable</span>{" "}
                        <span>
                          {singleProduct && singleProduct.is_negotiable == 0
                            ? "No"
                            : singleProduct && singleProduct.is_negotiable == 1
                              ? "Yes"
                              : "NA"}
                        </span>
                      </li>
                    </ul>
                  ) : (
                    <ul className="mt-2">
                      {singleProduct && singleProduct.rc_available != null && (
                        <li>
                          <span className="font-bold">{t('RC Available')}</span>
                          <span>
                            {singleProduct && singleProduct.rc_available == 0
                              ? "No"
                              : singleProduct && singleProduct.rc_available == 1
                                ? "Yes"
                                : "NA"}
                          </span>
                        </li>
                      )}
                      {singleProduct && singleProduct.noc_available != null && (
                        <li>
                          <span className="font-bold">{t('NOC Available')}</span>
                          <span>
                            {singleProduct.noc_available === 0
                              ? "No"
                              : singleProduct.noc_available === 1
                                ? "Yes"
                                : "NA"}
                          </span>
                        </li>
                      )}
                      {singleProduct && singleProduct.is_negotiable != null && (
                        <li>
                          <span className="font-bold">{t('Price Negotiable')}</span>
                          <span>
                            {singleProduct.is_negotiable === 0
                              ? "No"
                              : singleProduct.is_negotiable === 1
                                ? "Yes"
                                : "NA"}
                          </span>
                        </li>
                      )}

                      {singleProduct && singleProduct.registration_no && (
                        <li>
                          <span className="font-bold">{t('Registration Number')}</span>
                          <span>{singleProduct.registration_no}</span>
                        </li>
                      )}

                      {singleProduct && singleProduct.year_of_purchase && (
                        <li>
                          <span className="font-bold">{t('Year Of Purchase')}</span>
                          <span>{singleProduct.year_of_purchase}</span>
                        </li>
                      )}
                    </ul>
                  )}
                </div>
                <div className="user-details overflow-hidden rounded-3xl shadow p-2 text-center border border-[whitesmoke]">
                  <img
                    src={user}
                    alt="user image"
                    className="h-[100px]  aspect-square rounded-full shadow p-1 mx-auto"
                  />
                  <p className="name-user uppercase mt-5 font-bold flex items-center justify-center">
                    {singleProduct && `${singleProduct.name}`}
                    {singleProduct &&
                      singleProduct.verify_tag == null ? null : (
                      <span className="ms-2">
                        <img
                          src={singleProduct && singleProduct.verify_tag}
                          alt="verified tag icon"
                          className="h-[15px]"
                        />
                      </span>
                    )}
                  </p>
                  {singleProduct && singleProduct.company_name && (
                    <p className="user-compaany-name uppercase">
                      {singleProduct.company_name}
                    </p>
                  )}
                  {
                    authState?.isLoggedIn ?
                      (<Link
                        to={`tel:${singleProduct?.mobile}`}
                        className="text-lg bg-black text-white py-2 px-3 my-5 inline-block rounded-3xl border call-user shadow-xl hover:scale-95 animate-pulse"
                      >
                        <FiPhoneCall className="inline me-2" />
                        {t('Call Now')}
                      </Link>)
                      :
                      (
                        <Link
                          to="#"
                          className="text-lg bg-black text-white py-2 px-3 my-5 inline-block rounded-3xl border call-user shadow-xl hover:scale-95 animate-pulse"
                          onClick={(e) => {
                            e.preventDefault(); toast.error("You are not logged in, Please login to continue",
                              {
                                duration: 3000,
                                style: {
                                  border: '2px solid red',
                                  boxShadow: '0 0  25px red',
                                  padding: '16px',
                                  fontSize: '18px',
                                  color: 'white',
                                  textAlign: 'center',
                                  // backgroundColor: '#d1e7dd',
                                  background: `url(${toastError}) no-repeat center/cover`,
                                  borderRadius: '8px',
                                },

                              }
                            )
                          }}
                        >
                          <FiPhoneCall className="inline me-2" />
                          {t('Call Now')}
                        </Link>
                      )
                  }
                </div>
              </div>
            </div>
          )}
        </div>
        <SimilarProductCarousel
          product_loading={SimilarProductLoading}
          single_product_id={id}
          similar_product_data={similarProducts}
          view_all_link={`${BASE_URL}/${category}/${type}`}
        />
      </main>
      <Footer />
    </>
  );
};

export default SinglProductPage;