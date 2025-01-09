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
import { Link, useParams } from "react-router-dom";
import ProductCardSkeleton from "../../elements/ProductCardSkeleton";
import BASE_URL from "../../../../config";
import { useTranslation } from "react-i18next";

const skeletonArray = new Array(6).fill(true);

const SimilarProductCarousel = ({
  single_product_id,
  view_all_link,
  similar_product_data = [],
  product_loading,
}) => {
  const { type, category } = useParams();
  const{t} = useTranslation();
  // console.log(similar_product_data);

  return (
    <>
      <section className="category-wise-product-slider relative md:my-10 my-2">
        <div className="mx-2 md:mx-0 md:rounded-0 rounded-lg overflow-hidden category-header__title md:bg-lightdark bg-white shadow flex justify-between items-center">
          <h3 className="md:text-2xl  text-lg md:w-[350px] w-auto ps-4 pe-10 md:p-4 p-2 font-semibold text-white md:font-bold shadow-lg text-center uppercase">
            {t('RELATED ITEMS')}
          </h3>
          <AnimateButton>
            <Link
              to={view_all_link}
              className="block uppercase border-lightgreen bg-white md:me-10 me-2 px-4 py-1 rounded-3xl md:font-semibold shadow text-darkGreen border md:text-md text-xs"
            >
              {t('View All')} <TbArrowMoveRight className="inline mb-1" />
            </Link>
          </AnimateButton>
        </div>
        <div className="container md:px-5 px-3">
          <Carousel>
            <CarouselContent>
              {/* Example rendering each item, adjust based on your data */}
              {product_loading ? (
                skeletonArray.map((_, index) => (
                  <CarouselItem
                    className="md:basis-1/3 xl:basis-1/4 2xl:basis-1/5 basis-[250px]"
                    key={index}
                  >
                    <ProductCardSkeleton />
                  </CarouselItem>
                ))
              ) : similar_product_data && similar_product_data.length !== 0 ? (
                similar_product_data.map((item) => (
                  <CarouselItem
                    className="md:basis-1/3 xl:basis-1/4 2xl:basis-1/5 basis-[250px]"
                    key={item.id}
                  >
                    <Link to={`${BASE_URL}/${category}/${type}/${item.id}`}>
                      <ProductCard
                        product_image={
                          item.front_image ? item.front_image : item.image1
                        }
                        product_title={
                          item
                            ? // Check if either brand_name or model_name is null, undefined, or "Others"
                              item.brand_name == null ||
                              item.brand_name === "Others" ||
                              item.model_name == null ||
                              item.model_name === "Others"
                              ? `${item.title}` // If any is null, undefined, or "Others", show title
                              : `${item.brand_name} ${item.model_name}` // Otherwise, show brand_name and model_name
                            : null
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
                  </CarouselItem>
                ))
              ) : (
                <div className="no-data h-[250px] w-full text-darkGreen  font-bold flex items-center justify-center">
                  <p className="border p-5">No Similar Product Found</p>
                </div>
              )}
            </CarouselContent>
            <CarouselPrevious className="absolute -left-2 top-1/2 -translate-y-1/2" />
            <CarouselNext className="absolute -right-2 top-1/2 -translate-y-1/2" />
          </Carousel>
        </div>
      </section>
    </>
  );
};

export default SimilarProductCarousel;
