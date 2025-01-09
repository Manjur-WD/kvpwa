import { FaChevronRight } from "react-icons/fa6"
import Footer from "../components/layouts/Footer/Footer"
import Header from "../components/layouts/Header/Header"
import MobileScreenNav from "../components/layouts/Header/MobileScreenNav"
import breadcrumbImage from "../assets/images/img_hero.jpg";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../components/elements/ProductCard";
import { Link } from "react-router-dom";
import BASE_URL from "../../config";
import { GrMapLocation } from "react-icons/gr";
import { MdOutlineCurrencyRupee } from "react-icons/md";
import { FaRegEye } from "react-icons/fa6";
import { CiTrash } from "react-icons/ci";
import toast, { Toaster } from "react-hot-toast";
import { getWishList, removeFromWishList } from "../services/api";
import { updateWishListItems } from "../redux/features/wishlist/WishlistSlice";
import { useEffect, useState } from "react";
import emptywishlist from "../assets/images/empty-wishlist.webp"
import toastBg from "../assets/images/toast-bg.jpg";
import { useTranslation } from "react-i18next";

const WishListPage = () => {
    const [isLoading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const wishListItems = useSelector((state) => state.wishlistings.wishlist)
    const token = useSelector((state) => state.auth.token)
    // console.log(wishListItems);

    const getCategory = (id) => {
        switch (id) {
            case "1":
                return "tractor";
            case "3":
                return "goods-vehicle"
            case "4":
                return "harvester"
            case 5:
                return "implements"
            case "7":
                return "tyre"
            case "6":
                return "agri-inputs"
            case "8":
                return "agri-inputs"
            case "9":
                return "agri-inputs"
        }
    }


    const getType = (id) => {
        switch (id) {
            case "6":
                return "seeds"
            case "8":
                return "pesticides"
            case "9":
                return "fertilizer"
        }
    }


    const handleRemove = async (categoryId, id) => {
        toast("Removing.....");
        setLoading(true);
        const response = await removeFromWishList(categoryId, id, token);

        if (response && response.success === 1) {
            setLoading(false);
            toast.success("Removed from wishlist!",
                {
                    duration: 4000,
                    style: {
                        border: '2px solid red',
                        boxShadow: '0 0  25px red',
                        padding: '16px',
                        fontSize: '18px',
                        color: 'white',
                        // backgroundColor: '#d1e7dd',
                        background: `url(${toastBg}) no-repeat center/cover`,
                        borderRadius: '8px',
                    },
                }
            );
            fetchWishList();
        }
    }

    const fetchWishList = async () => {
        const response = await getWishList(token);
        dispatch(updateWishListItems(response.response));
    }

    useEffect(() => {
        fetchWishList();
    }, [])

    return (
        <>
            <Header />
            <Toaster position="bottom-center"
                reverseOrder={false} />
            {/* <MobileScreenNav /> */}
            <main>
                <section
                    className="breadcrumb flex justify-center items-center md:h-[300px] h-[200px]"
                    style={{
                        backgroundImage: `linear-gradient(#13693a, #13693a6e),url(${breadcrumbImage})`,
                        backgroundSize: "cover", // Ensures the image covers the entire section
                        backgroundPosition: "center", // Centers the image
                    }}
                >
                    <div className="breadcrumb-content">
                        <div className="breadcrumb-links flex justify-center items-center text-2xl text-white">
                            <p className="hover:text-lightgreen px-3">{t('Home')}</p>
                            <FaChevronRight />
                            <p className="hover:text-lightgreen px-3 capitalize">
                                {t('Wishlist')}
                            </p>
                        </div>
                        <p
                            className="text-lightgreen md:text-6xl text-4xl font-bold text-center mt-3 uppercase"
                            style={{ textShadow: "0 0 15px black" }}
                        >
                            {t('Wishlist')}
                        </p>
                    </div>
                </section>

                {
                    !wishListItems ?
                        (

                            <img src={emptywishlist} alt="empty-wishlist" className=" md:w-[350px] w-full aspect-square rounded-3xl my-5  md:mx-auto p-2" />

                        )
                        :
                        <section className="wishlist-section grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 md:px-5  px-2 md:gap-x-4 gap-x-2 container my-5">{
                            wishListItems?.map((item) => (

                                <div className="wishlist-card-wrapper m-2 p-1 rounded-2xl shadow border" key={item.id}>
                                    <div className="wishlist-card grid grid-cols-[120px,1fr] md:grid-cols-1 gap-3">
                                        {
                                            item?.category_id === "6" || item?.category_id === "7" || item?.category_id === "8" || item?.category_id === "9" ?
                                                <img src={item?.image1} alt="this is wishlist product image" className="w-full aspect-square object-cover object-center rounded-2xl" /> :
                                                <img src={item?.front_image} alt="this is wishlist product image" className="w-full aspect-square object-cover object-center rounded-2xl" />

                                        }

                                        <div className="wishlist-desc truncate p-1 pe-0">
                                            <h2 className="truncate text-lg  md:text-center text-start px-2">{`${item.brand_name} ${item.model_name}` ===
                                                "Others Others" ||
                                                `${item.brand_name} ${item.model_name}` ===
                                                "undefined undefined" ||
                                                `${item.brand_name} ${item.model_name}` ===
                                                "null null"
                                                ? item.title
                                                : `${item.brand_name} ${item.model_name}`}</h2>
                                            <div className="flex items-center justify-between wishlist-price-location text-sm p-2 text-white mt-1 rounded-xl">
                                                <p>
                                                    <GrMapLocation className="inline-block mb-2 me-1" />
                                                    {item.city_name}
                                                </p>
                                                <p className="">
                                                    <MdOutlineCurrencyRupee className="inline-block mb-1 " />
                                                    {item.price}
                                                    {
                                                        item?.category_id === "6" || item?.category_id === "7" || item?.category_id === "8" || item?.category_id === "9" ?
                                                            "" :
                                                            ` ${item.rent_type === null || undefined ? "" : `/ ${item.rent_type?.slice(4)}`}`
                                                    }
                                                </p>
                                            </div>
                                            <div className="wishlist-action flex justify-center gap-3 px-5 mt-2">
                                                <Link
                                                    to={`${BASE_URL}/${getCategory(item?.category_id)}/${["6", "8", "9"].includes(item.category_id) ? getType(item?.category_id) : item.type}/${item.id}`}
                                                    type="button"
                                                    className="bg-lightdark text-white text-sm px-2 py-1 rounded-3xl shadow active:scale-95"
                                                >
                                                    <FaRegEye className="inline mb-1" /> View
                                                </Link>

                                                <button type="button" className="bg-red-700 text-white text-sm px-2 py-1 rounded-3xl shadow active:scale-95" onClick={() => { handleRemove(item?.category_id, item?.id) }}><CiTrash className="inline mb-1" />Remove</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            ))}
                        </section>

                }

            </main>
            <Footer />
        </>
    )
}

export default WishListPage
