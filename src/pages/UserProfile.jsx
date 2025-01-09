import Footer from "../components/layouts/Footer/Footer"
import Header from "../components/layouts/Header/Header"
import MobileScreenNav from "../components/layouts/Header/MobileScreenNav"
import kvBanner from "../assets/images/KV bnr.jpg"
import { TiUser } from "react-icons/ti";
import { TbDeviceMobileFilled } from "react-icons/tb";
import { MdEmail } from "react-icons/md";
import { FaMapLocationDot } from "react-icons/fa6";
import { TbLocationFilled } from "react-icons/tb";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const UserProfile = () => {



    const user = useSelector((state) => state.auth.user)

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    return (
        <>
            <Header />
            {/* <MobileScreenNav /> */}
            <section className="profile-kv md:p-5 p-2">
                <div className="container rounded-3xl overflow-hidden shadow bg-white">
                    <img src={kvBanner} alt="krishi vikas banner" className="w-full" />
                    <div className="profile-desc mb-5 ms-5 me-5">
                        <div className="img-box text-center">
                            <img src={user?.profile_img} alt="this is profile image" className="md:w-[200px] w-[100px] md:h-[200px] h-[100px] object-cover mx-auto border border-4 border-white rounded-full shadow relative md:-top-[80px] -top-[30px]" />
                        </div>
                        <div className="rounded-3xl text-darkGreen text-lg shadow m-5 relative md:-top-[80px] -top-[30px] p-5">
                            <h2 className=" text-2xl text-center "><TiUser className="inline mb-1" /><span className="uppercase">{user?.name}</span></h2>
                            <div className="text-center mt-5 text-sm md:text-lg">
                                {
                                    user.mobile ?
                                        (
                                            <p><TbDeviceMobileFilled className="inline mb-1 me-1" />Mobile: <span className="text-black">{user?.mobile}</span></p>
                                        )
                                        :
                                        (null)
                                }
                                {
                                    user.email ?
                                        (
                                            <p><MdEmail className="inline mb-1 me-1" />Email: <span className="text-black">{user?.email}</span></p>
                                        )
                                        :
                                        (null)
                                }
                                <p><FaMapLocationDot className="inline mb-1 me-1" />Address: <span className="text-black">{user?.city_details},{user?.district_name},{user?.state_name}</span></p>
                                <p><TbLocationFilled className="inline mb-1 me-1" />Pincode: <span className="text-black">{user?.zipcode}</span></p>
                            </div>
                        </div>
                    </div>
                </div>


            </section>
            <Footer />
        </>
    )
}

export default UserProfile
