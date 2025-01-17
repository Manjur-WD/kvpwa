import { GrMapLocation } from "react-icons/gr";
import { MdOutlineCurrencyRupee } from "react-icons/md";
import { GiPathDistance } from "react-icons/gi";
import { RiHeart2Fill } from "react-icons/ri";
import { RiHeart2Line } from "react-icons/ri";
import watermark from "../../assets/images/water-mark.png";
import MarkSold from "../../../public/images/sold-png.png"
import { AiFillThunderbolt } from "react-icons/ai";

const ProductCard = ({
  product_image,
  product_title,
  product_pricing,
  product_location,
  city,
  distance_product,
  rent_type,
  product_full_details,
  mark_as_sold,
  is_boosted
}) => {

  const storeProductToSession = (item) => {
    sessionStorage.setItem("single-product-detail", JSON.stringify(item))
  }

  console.log(mark_as_sold);
  console.log(is_boosted);


  return (
    <>
      <div className="product-card bg-white rounded-3xl overflow-hidden my-2 shadow-lg border hover:scale-95 transition-all"
        onMouseEnter={() => storeProductToSession(product_full_details)}>
        <div className="product_image p-[2px] relative">
          {
            mark_as_sold === "4" ? <img src={MarkSold} alt="mark-as-sold" className="w-[80%] absolute z-5 top-2 left-1/2 -translate-x-1/2" /> : null
          }

          {
            is_boosted  ?

              <div className="absolute top-3 left-3">
                <div className="boost-badge bg-white  text-black border border-slate-200 text-sm inline-block py-1 px-2 rounded-2xl relative shadow-lg">
                  <AiFillThunderbolt className="text-white inline bg-gradient-green w-10 h-10 p-2 animate-pulse absolute rounded-full -left-1 -top-[5px] shadow shadow-lightgreen" /> <span className="ps-9 pe-2 font-semibold italic">Boosted</span>
                </div>
              </div>

              : null
          }


          <img
            src={product_image}
            alt="this is product image"
            className="w-full md:h-[200px] h-[150px] object-cover object-center rounded-3xl"
          />
          <img
            src={watermark}
            alt="water-mark"
            className="md:w-[100px] w-[80px] drop-shadow-lg absolute md:-top-4 -top-1 md:-right-2 -right-1"
          />
        </div>
        <p className="text-center py-4 product-title px-4">{product_title}</p>
        <div className="flex text-sm justify-between items-center px-5 py-3 location-and-price md:h-auto h-[55px]">
          <p className="distance truncate w-1/2 text-start">
            <GrMapLocation className="inline-block mb-2 me-1" />
            {city}
          </p>
          <p className="pricing">
            <MdOutlineCurrencyRupee className="inline-block mb-1 " />
            {Math.ceil(product_pricing)}
            {rent_type !== null ? rent_type : ""}
          </p>
        </div>
        <p className="distance bg-lightdark text-white text-center py-2 md:text-sm text-[12px]">
          <GiPathDistance className="inline-block mb-1 me-2" />
          Distance :
          <span className="mx-1">
            {distance_product == 0
              ? Math.round(Math.random() * 10 + 1)
              : distance_product}
          </span>
          Km
        </p>
      </div>
    </>
  );
};

export default ProductCard;
