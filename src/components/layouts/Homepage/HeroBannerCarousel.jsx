import React, { useEffect } from "react";
import Slider from "react-slick";
import Preloader from "../../elements/Preloader";
import { MdChevronRight, MdChevronLeft } from "react-icons/md";
import { loadHeroSlides } from "../../../services/api";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import preloader_image from "../../../../src/assets/images/favicon/favicon-32x32.png";

const HeroBannerCarousel = () => {
  const token = useSelector((state) => state.auth.token);
  // const languageId = localStorage.getItem("i18nextLng");
  const { i18n } = useTranslation();  // Access i18n object
  const languageId = i18n.language;  // Use i18n.language to get current language

  const getLanguageId = (language) => {
    switch (language) {
      case "en":
        return 1;
      case "hn":
        return 2;
      case "bn":
        return 3;
    }
  }


  const {
    data: heroSlides,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["heroSlides", getLanguageId(languageId), token],
    queryFn: () => loadHeroSlides(getLanguageId(languageId), token),
  });



  // if (isLoading) {
  //   return <Preloader />;
  // }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  // Custom arrows for Slick Slider
  const NextArrow = ({ onClick }) => (
    <div
      className="custom-next md:block hidden absolute top-1/2 z-20 -translate-y-1/2 right-3 cursor-pointer"
      onClick={onClick}
    >
      <MdChevronRight />
    </div>
  );

  const PrevArrow = ({ onClick }) => (
    <div
      className="custom-prev md:block hidden absolute top-1/2 z-20 -translate-y-1/2 left-3 cursor-pointer"
      onClick={onClick}
    >
      <MdChevronLeft />
    </div>
  );

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    adaptiveHeight: true,
  };

  return (
    <>
      {
        isLoading ?
          (
            <div className="skeleton-loading p-2">
              <div className="skeleton-loading-gray relative w-full flex justify-center items-center lg:h-[668px] md:h-[350px] h-[200px] object-top md:rounded-3xl rounded-xl">
                <span className="loader"></span>
                <img
                  src={preloader_image}
                  alt="this is a icon of preloader"
                  className="absolute top-[49.8%] left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full shadow-lg"
                />
              </div>
            </div>

          )
          :
          (
            <div className="slider-container overflow-hidden relative lg:px-5 px-2">
              <Slider {...settings}>
                {heroSlides?.map((slide) => (
                  <div key={slide.id} className="md:p-5 py-3">
                    <img
                      src={slide.value}
                      alt="this is banner slide"
                      className="w-full lg:h-[668px] md:h-[350px] h-[200px] object-top md:rounded-3xl rounded-xl"
                    />
                  </div>
                ))}
              </Slider>
            </div>
          )
      }

    </>
  );
};

export default HeroBannerCarousel;
