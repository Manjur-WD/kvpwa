import preloader_image from "../../../assets/images/favicon/favicon-32x32.png";
const SingleProductSkeleton = () => {
  return (
    <>
      <div className="product-image-details-section grid gap-2 md:grid-cols-[80px,1fr] grid-cols-[50px,1fr] my-3 me-3">
        <div className="product_img_nav overflow-x-auto flex flex-col gap-3 items-center py-2 ps-2 w-full overflow-hidden">
          <div className="slide_image md:h-[80px]  w-full rounded-2xl skeleton-loading-gray"></div>
          <div className="slide_image md:h-[80px] h-[40px] w-full rounded-2xl skeleton-loading-gray"></div>
          <div className="slide_image md:h-[80px] h-[40px] w-full rounded-2xl skeleton-loading-gray"></div>
          <div className="slide_image md:h-[80px] h-[40px] w-full rounded-2xl  skeleton-loading-gray"></div>
          <div className="slide_image md:h-[80px] h-[40px] w-full rounded-2xl  skeleton-loading-gray"></div>
          <div className="slide_image md:h-[80px] h-[40px] w-full rounded-2xl  skeleton-loading-gray"></div>
        </div>
        <div className="product_image_main p-2 md:h-[550px] h-[350px] w-full  border rounded-3xl flex items-center justify-center relative skeleton-loading-gray">
          <span className="loader"></span>
          <img
            src={preloader_image}
            alt="product-image-skeleton "
            className="absolute top-[46%] left-1/2 -translate-x-1/2"
          />
        </div>
      </div>
    </>
  );
};

export default SingleProductSkeleton;
