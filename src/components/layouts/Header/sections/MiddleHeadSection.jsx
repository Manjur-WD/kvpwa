import logo from "../../../../assets/images/kv-logo.png";
import google_play_store from "../../../../assets/images/Google-Play-Store.png";
import apple__store from "../../../../assets/images/apple-store.png";
import { PiHeartHalfLight } from "react-icons/pi";
import { PiUserCircleDashedFill } from "react-icons/pi";
import AnimateButton from "../../../animation/AnimateButton";
import { CgMenuLeft } from "react-icons/cg";
import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { NavTogglerContext } from "../../../../context/HeaderMenuContext/NavTogglerContext";
import { Link, useNavigate } from "react-router-dom";
import logInImg from "../../../../assets/images/login-img.webp";
import { ImProfile } from "react-icons/im";
import { IoMdHeartHalf } from "react-icons/io";
import { HiOutlineLogout } from "react-icons/hi";
import toastError from "../../../../assets/images/toastError.jpg";

import { Button } from "@/components/ui/button"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import LoginStepForm from "../../../elements/LoginStepForm";
import { useDispatch, useSelector } from "react-redux";
import { setLogInState, setToken, setUsers } from "../../../../redux/features/Auth/AuthSlice";
import { useQuery } from "@tanstack/react-query";
import { getProfileDetails, getWishList } from "../../../../services/api";
import BASE_URL from "../../../../../config";
import { updateWishListItems } from "../../../../redux/features/wishlist/WishlistSlice";
import LanguageSelector from "../../../elements/LanguageSelector";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";

const MiddleHeadSection = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { setActiveNav } = useContext(NavTogglerContext);
  const authState = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);
  // console.log(user);


  // const token = localStorage.getItem("token");

  const handleLogOut = () => {
    localStorage.removeItem("KV_SESSION");
    localStorage.removeItem("isLoggedIn");
    dispatch(setLogInState(false));
    dispatch(setToken("31402|ycaBoacBD1m2hb4cBPIpGBTphlQ6TCmQIiBe1E1V0834bbfd"));
    navigate(`${BASE_URL}/`);
    setTimeout(() => {
      location.reload();
    }, 2000)
  }

  // console.log(authState);

  const wishlistItems = useSelector((state) => state.wishlistings)
  // console.log(wishlistItems);

  const fetchWishList = async () => {
    const response = await getWishList(token);
    if (response && response.success === 1) {
      // console.log(response.response);
      dispatch(updateWishListItems(response.response));
    }
  }

  useLayoutEffect(() => {
    fetchWishList();
  }, [])


  const isLoggedIn = localStorage.getItem("isLoggedIn");

  const { data: profile } = useQuery({
    queryKey: ["get-profile", token],
    queryFn: () => getProfileDetails(token)
  })

  if (profile) {
    dispatch(setUsers(profile));
    // console.log(authState.user);
  }




  // console.log(profile);



  return (
    <>
      <section className="relative middle-header  py-3 lg:px-5 md:px-3 bg-white md:shadow-none shadow">
        <div className="navbar container flex  justify-between md:p-0 px-2">
          <div className="navtoggler-and-logo flex gap-2">
            <button
              type="button"
              className="lg:hidden block nav-toggler px-2 rounded-lg shadow shadow-gray-300"
              onClick={() => setActiveNav(true)}
            >
              <CgMenuLeft className="text-2xl text-slate-200" />
            </button>
            <Link to="/krishi-vikas-udyog/">
              <img
                src={logo}
                alt="this is brand logo"
                className="md:w-[200px] w-[150px] kv-logo"
              />
            </Link>
          </div>
          <div className="header__app--link items-center lg:flex hidden">
            <p className="text-lightdark me-2">{t('DOWNLOAD KRISHI VIKAS APP')}</p>
            <a href="#" className="me-1">
              <AnimateButton>
                <img
                  src={google_play_store}
                  alt="this is google play store icon"
                  className="w-[130px]"
                />
              </AnimateButton>
            </a>
            <a href="#">
              <AnimateButton>
                <img
                  src={apple__store}
                  alt="this is google apple store icon"
                  className="w-[130px]"
                />
              </AnimateButton>
            </a>
          </div>
          <div className="header__wishlist-login items-center flex">
            <button className="language-selector md:hidden inline">
              <LanguageSelector />
            </button>

            {
              wishlistItems.wishlist?.length != 0 && authState?.isLoggedIn ?
                (
                  <button
                    type="button"
                    className=" hover:scale-95 md:px-4 py-1 relative md:block hidden cursor-pointer"
                    onClick={() => navigate(`${BASE_URL}/wishlist`)}
                  >
                    <span className="wishlist--count bg-lightdark text-white px-2 rounded-full absolute left-8 text-sm top-0">
                      {wishlistItems.wishlist?.length}
                    </span>
                    <PiHeartHalfLight className="me-2 inline align-bottom text-3xl text-lightgreen" />
                    <span className="text-lg ms-2">{t('Wishlist')}</span>
                  </button>
                ) :
                (<button
                  type="button"
                  className=" hover:scale-95 md:px-4 py-1 relative md:block hidden cursor-pointer"
                  onClick={() => toast.error("You are not Logged in !!",
                    {
                      duration: 4000,
                      style: {
                        // border: '2px solid #9c0a0d',
                        boxShadow: '0 0  25px #9c0a0d',
                        padding: '16px',
                        fontSize: '18px',
                        color: 'white',
                        // backgroundColor: '#d1e7dd',
                        background: `url(${toastError}) no-repeat center/cover`,
                        borderRadius: '8px',
                      },
                    }
                  )}
                >
                  <PiHeartHalfLight className="me-2 inline align-bottom text-3xl text-lightgreen" />
                  <span className="text-lg ms-2">{t('Wishlist')}</span>
                </button>)
            }




            {
              authState.isLoggedIn && isLoggedIn ?
                (
                  <div className="user-button-wrapper">
                    <div className="user-button truncate md:max-w-[220px] max-w-[120px] border border-dashed border-transparent hover:border-gray-200 hover:scale-95 px-4 py-1">
                      {
                        profile && profile.profile_img ?
                          (
                            <img src={profile?.profile_img} alt="profile-image" className="inline w-[32px] h-[32px] object-cover rounded-full me-2" />
                          )
                          :
                          (
                            <PiUserCircleDashedFill className="me-2 inline align-bottom text-3xl text-lightgreen" />
                          )
                      }
                      <span className="md:text-lg text-sm ">{profile?.name}</span>
                    </div>
                    <ul className="user-menus border shadow animate__animated animate__fadeIn animate__faster">
                      <li><Link to={`${BASE_URL}/profile`}><ImProfile className="me-2 inline" />My Profile</Link></li>
                      <li>
                        <Link to={`${BASE_URL}/wishlist`}><IoMdHeartHalf className="me-2 inline" />My Wishlist</Link>
                      </li>
                      <li onClick={handleLogOut} className="cursor-pointer"><HiOutlineLogout className="me-2 inline" />Logout</li>
                    </ul>
                  </div>
                ) :
                (
                  <Dialog >
                    <DialogTrigger className="border border-dashed border-transparent hover:border-gray-200 hover:scale-95 md:px-4 px-2 py-1">
                      <PiUserCircleDashedFill className="me-1 inline align-bottom text-3xl text-lightgreen" />
                      <span className="md:text-lg inline-block md:pb-0 pb-1">{t('Login')}</span>
                    </DialogTrigger>
                    <DialogContent >
                      {/* <DialogHeader>
                  <DialogTitle>Are you absolutely sure?</DialogTitle>
                  <DialogDescription>
                    This action cannot be undone. This will permanently delete your account
                    and remove your data from our servers.
                  </DialogDescription>
                </DialogHeader> */}

                      <div className="login-screen p-1  grid md:grid-cols-2 grid-cols-1 bg-white rounded-3xl">
                        <div className="login-banner md:h-full w-full rounded-3xl flex flex-col   p-5 " style={{ background: `linear-gradient(#13693a, #8cbf44b8),url(${logInImg}) center/cover` }}>
                          <h1 className="text-6xl font-semibold uppercase text-white px-4">Welcome <span className="text-lightgreen">Back!</span></h1>
                          <p className="px-4 text-white pt-3 text-2xl">Login to manage your agricultural needs.</p>

                        </div>
                        <LoginStepForm />

                      </div>
                    </DialogContent>
                  </Dialog>
                )
            }


            {/* <button
              type="button"
              className="md:block hidden border border-dashed border-transparent hover:border-gray-200 hover:scale-95 px-4 py-1"
            >
              <PiUserCircleDashedFill className="me-2 inline align-bottom text-3xl text-lightgreen" />
              <span className="text-lg">Login</span>
            </button> */}
          </div>
        </div>
      </section>
      {/* LOGIN SECTION DIALOG */}



    </>
  );
};

export default MiddleHeadSection;
