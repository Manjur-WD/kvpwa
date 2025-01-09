import preloader_image from "../../../src/assets/images/favicon/favicon-32x32.png";

const ProductCardSkeleton = () => {
  return (
    <>
      <div
        className="product-card bg-white rounded-3xl overflow-hidden my-2 shadow-lg border hover:scale-95 transition-all"
      >
        <div className="product_image_skeleton p-[2px] relative">
          <div className="w-full md:h-[220px] h-[150px] object-cover object-center rounded-3xl relative flex items-center justify-center">
            <span className="loader"></span>
            <img
              src={preloader_image}
              alt="this is a icon of preloader"
              className="absolute top-[49.8%] left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full shadow-lg"
            />
          </div>
        </div>
        <p className="text-center p-5 product-title">...</p>
        <div className="flex text-sm justify-between items-center px-5 py-3 location-and-price">
          <p className="distance">...</p>
          <p className="pricing">...</p>
        </div>
        <p className="distance bg-lightdark text-white text-center py-2">...</p>
      </div>
    </>
  );
};

export default ProductCardSkeleton;
