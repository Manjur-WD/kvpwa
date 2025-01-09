import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ProductCard from "../../elements/ProductCard";
import { motion } from "motion/react";
import { TbArrowMoveRight } from "react-icons/tb";
import AnimateButton from "../../animation/AnimateButton";
import PopulerBrandList from "./PopulerBrandList";
import { Link } from "react-router-dom";
import BASE_URL from "../../../../config";
import { useTranslation } from "react-i18next";

const CategoryWiseProductCarousel = ({
  category_title,
  tabs = [],
  product_data = {},
  populer_brand_id,
  company_id,
  view_all_category
}) => {

  const {t} = useTranslation();
  return (
    <>
      <section className="category-wise-product-slider relative md:my-10 my-2">
        <div className="mx-2 md:mx-0 md:rounded-0 rounded-lg overflow-hidden category-header__title md:bg-lightdark bg-white shadow flex justify-between items-center">
          <h3 className="md:text-2xl  text-lg md:w-[350px] w-1/2 md:p-4 p-2 font-semibold text-white md:font-bold shadow-lg text-center uppercase">
            {t(category_title)}
          </h3>
          
        </div>

        <div className="category__tabs  w-[95%] rounded-xl mx-auto">
          <div className="container">
            <Tabs
              defaultValue={tabs[0] === "old" ? "used" : tabs[0]}
              className="w-full text-center"
            >
              <TabsList className="md:absolute md:border-none border top-3 left-[50%] md:-translate-x-1/2 md:rounded-2xl md:mt-0 mt-3">
                {/* Dynamically render TabsTrigger with unique key */}
                {tabs.map((tab, idx) => (
                  <TabsTrigger
                    key={idx} // Use a unique identifier, such as tab.value or tab.label
                    value={tab === "old" ? "used" : tab}
                    className="px-5 uppercase category-tab text-black rounded-2xl font-normal text-sm"
                  >
                    {tab === "old" ? t('used') : t(tab)}
                  </TabsTrigger>
                ))}
                
              </TabsList>

              {/* Dynamically render TabsContent based on the selected tab */}
              {tabs.map((tab, idx) => (
                <motion.div className="" key={idx}>
                  <TabsContent
                    value={tab === "old" ? "used" : tab}
                    className="animate__animated animate__fadeIn"
                  >
                    
            <Link
              to={`${BASE_URL}/${view_all_category}/${tab}`}
              className="inline-block absolute md:top-4 top-2 right-5 uppercase border-lightgreen bg-white md:me-10 me-2 px-4 py-1 rounded-3xl md:font-semibold shadow text-darkGreen border md:text-md text-xs"
            >
              {t('View All')} <TbArrowMoveRight className="inline mb-1" />
            </Link>
          
                    {/* POPULER BRAND RENDERING CODE START */}

                    {tab === "new" ? null : (
                      <PopulerBrandList populer_brand_id={populer_brand_id} tab={tab} />
                    )}

                    {tab === "seeds" ? (
                      <PopulerBrandList company_id="6" tab={tab} />
                    ) : null}

                    {tab === "pesticides" ? (
                      <PopulerBrandList company_id="9" tab={tab} />
                    ) : null}

                    {tab === "fertilizers" ? (
                      <PopulerBrandList company_id="8" tab={tab} />
                    ) : null}

                    {/* POPULER BRAND RENDERING CODE END */}
                    <Carousel>
                      <CarouselContent>
                        {/* Ensure tractor_data[tab] is not undefined and map over it */}
                        {product_data[tab]?.map((item) => {
                          // Make sure to return the CarouselItem to render
                          return (
                            <CarouselItem
                              key={item.id}
                              className="md:basis-1/3 xl:basis-1/4 2xl:basis-1/5 basis-[250px]"
                            >
                              {/* Example rendering each item, adjust based on your data */}
                              <Link
                                to={`${BASE_URL}/${
                                  category_title == "tyres"
                                    ? "tyre"
                                    : category_title == "Goods Vehicle"
                                    ? "goods-vehicle"
                                    : category_title == "agri inputs"
                                    ? "agri-inputs"
                                    : category_title
                                }/${
                                  tab == "fertilizers" ? "fertilizer" : tab
                                }/${item.id}`}
                              >
                                <ProductCard
                                  product_image={
                                    item.front_image
                                      ? item.front_image
                                      : item.image1
                                  }
                                  product_title={
                                    `${item.brand_name} ${item.model_name}` ===
                                      "Others Others" ||
                                    `${item.brand_name} ${item.model_name}` ===
                                      "undefined undefined"
                                      ? item.title
                                      : `${item.brand_name} ${item.model_name}`
                                  }
                                  product_location={item.district_name}
                                  product_pricing={item.price}
                                  distance_product={item.distance}
                                  rent_type={
                                    tab === "rent"
                                      ? item.rent_type
                                        ? ` / ${item.rent_type.slice(4)}`
                                        : ""
                                      : ""
                                  }
                                  // product_full_details= {item}
                                />
                              </Link>
                            </CarouselItem>
                          );
                        })}
                        {/* <CarouselItem className="md:basis-1/3 xl:basis-1/4 2xl:basis-1/5">
                          VIEW ALL
                        </CarouselItem> */}
                      </CarouselContent>
                      <CarouselPrevious className="absolute -left-2 top-1/2 -translate-y-1/2" />
                      <CarouselNext className="absolute -right-2 top-1/2 -translate-y-1/2" />
                    </Carousel>
                  </TabsContent>
                </motion.div>
              ))}
            </Tabs>
          </div>
        </div>
      </section>
    </>
  );
};

export default CategoryWiseProductCarousel;
