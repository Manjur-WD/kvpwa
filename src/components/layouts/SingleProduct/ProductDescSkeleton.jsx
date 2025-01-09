import { FaMapLocationDot } from "react-icons/fa6";
import { IoCalendar } from "react-icons/io5";
import { TbCurrencyRupee } from "react-icons/tb";
import { FiPhoneCall } from "react-icons/fi";

const ProductDescSkeleton = () => {
  return (
    <>
      <div className="product_description border shadow m-3 p-3 rounded-3xl bg-white">
              <h2 className="prod-name md:text-3xl text-2xl h-[40px] skeleton-loading-green font-black">
                
              </h2>
              <h3 className="uppercase my-2 md:text-xl">
                <FaMapLocationDot className="inline mb-2 text-darkGreen" />{" "}
                <span className="w-[80%] h-[30px] inline-block skeleton-loading-gray"></span>
              </h3>
              <h5 className="uppercase mb-2 md:text-xl">
                <IoCalendar className="inline mb-2 text-darkGreen" />{" "}
                <span className="w-[50%] h-[30px] inline-block skeleton-loading-gray"></span>
              </h5>
              <h4 className="uppercase mb-2 md:text-4xl text-2xl font-bold text-darkGreen ">
                <TbCurrencyRupee className="inline mb-2 text-darkGreen " />{" "}
                <span className="w-[30%] h-[40px] inline-block skeleton-loading-green"></span>
              </h4>
              <div className="grid md:grid-cols-2 grid-cols-1 gap-2">
                <div className="product_spec border border-[whitesmoke] overflow-hidden rounded-3xl shadow">
                  <p className="md:p-3 px-2 py-1 text-center heading shadow inline-block text-white m-2 rounded-3xl font-bold">
                    ....
                  </p>
                  <ul className="mt-2">
                    <li>
                      <span className="font-bold">....</span>
                      <span>
                       .....
                      </span>
                    </li>
                    <li>
                      <span className="font-bold">....</span>
                      <span>
                        ....
                      </span>
                    </li>
                    <li>
                      <span className="font-bold">....</span>{" "}
                      <span>
                       ....
                      </span>
                    </li>
                    <li>
                      <span className="font-bold">....</span>
                      <span>
                        ....
                      </span>
                    </li>
                    <li>
                      <span className="font-bold">....</span>
                      <span>
                        ....
                      </span>
                    </li>
                  </ul>
                </div>
                <div className="user-details overflow-hidden rounded-3xl shadow p-2 text-center border border-[whitesmoke]">
                  <div
                    className="h-[100px]  aspect-square rounded-full shadow p-1 mx-auto skeleton-loading-gray"
                  ></div>
                  <p className="name-user uppercase mt-5 font-bold flex items-center justify-center">
                   
                  <span className="w-[50%] h-[30px] inline-block skeleton-loading-gray"></span>
                   
                  </p>
                 
                    <p className="user-compaany-name uppercase mt-4">
                    <span className="w-[50%] h-[30px] inline-block skeleton-loading-gray"></span>
                    </p>
                
                  <a
                    href="#"
                    className="text-lg bg-black text-white py-2 px-3 my-5 inline-block rounded-3xl border call-user shadow-xl hover:scale-95 animate-pulse"
                  >
                    <FiPhoneCall className="inline me-2" />
                    .....
                  </a>
                </div>
              </div>
            </div>
    </>
  )
}

export default ProductDescSkeleton
