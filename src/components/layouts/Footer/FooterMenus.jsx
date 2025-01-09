import { TbPhoneCall } from "react-icons/tb";
import logo from "../../../assets/images/kv with R.png";
import { MdMarkEmailUnread } from "react-icons/md";
import AnimateButton from "../../animation/AnimateButton";
import google_play_store from "../../../assets/images/Google-Play-Store.png";
import apple__store from "../../../assets/images/apple-store.png";
import { FaFacebookF } from "react-icons/fa6";
import { RiInstagramFill } from "react-icons/ri";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";

import makeInIndia from "../../../assets/images/make-in-india-logo-make-in-india-icon-free-free-vector-removebg-preview.png";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import BASE_URL from "../../../../config";

const FooterMenus = () => {

  const { t } = useTranslation();

  return (
    <>
      <div className="footermenus bg-darkGreen py-10 px-10">
        <div className="container grid md:grid-cols-2 lg:grid-cols-4 md:p-0 p-5 grid-cols-1">
          <div className="footermenus__box lg:mb-0 mb-5">
            <img
              src={logo}
              alt="this is the logo on footer"
              className="bg-white w-1/2 rounded-lg mb-3"
            />
            <a href="#" className="text-white block text-lg">
              <TbPhoneCall className="inline me-1 text-lightgreen" />
              8100975657
            </a>
            <a href="#" className="text-white me-2 block text-lg">
              <MdMarkEmailUnread className="inline me-1 text-lightgreen" />
              support@krishivikas.com
            </a>

            <div className="footer_social my-5">
              <p className="uppercase text-lg text-white">Follow Us</p>
              <div className="footer__social_icons text-white flex gap-3 mt-2">
                <a href="#">
                  <FaFacebookF />
                </a>
                <a href="#">
                  <RiInstagramFill />
                </a>
                <a href="#">
                  <FaXTwitter />
                </a>
                <a href="#">
                  <FaLinkedinIn />
                </a>
                <a href="#">
                  <FaYoutube />
                </a>
              </div>
            </div>

            <div className="install_link">
              <p className="text-white text-lg me-2 mb-2">
                {t('DOWNLOAD KRISHI VIKAS APP')}
              </p>

              <div className="flex">
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
                      className="w-[130px] rounded"
                    />
                  </AnimateButton>
                </a>
              </div>
            </div>
          </div>
          <div className="footermenus__box md:mb-0 mb-5">
            <p className="text-2xl uppercase text-white mb-5">{t('SELL PRODUCTS')}</p>
            <div className="sell__links text-white uppercase">
              <Link to="#">{t('New Tractor')}</Link>
              <Link to="#">{t('Used Tractor')}</Link>
              <Link to="#">{t('New Goods Vehicle')}</Link>
              <Link to="#">{t('Used Goods Vehicle')}</Link>
              <Link to="#">{t('New Harvester')}</Link>
              <Link to="#">{t('Used Harvester')}</Link>
              <Link to="#">{t('New Implements')}</Link>
              <Link to="#">{t('Used Implements')}</Link>
              <Link to="#">{t('New Tyres')}</Link>
              <Link to="#">{t('Used Tyres')}</Link>
              <Link to="#">{t('seeds')}</Link>
              <Link to="#">{t('pesticides')}</Link>
              <Link to="#">{t('fertilizers')}</Link>
            </div>
          </div>
          <div className="footermenus__box md:mb-0 mb-5">
            <p className="text-2xl uppercase text-white mb-5">{t('BUY PRODUCTS')}</p>
            <div className="buy__links text-white uppercase">
              <Link to={`${BASE_URL}/tractor/new`}>{t('New Tractor')}</Link>
              <Link to={`${BASE_URL}/tractor/old`}>{t('Used Tractor')}</Link>
              <Link to={`${BASE_URL}/goods-vehicle/new`}>{t('New Goods Vehicle')}</Link>
              <Link to={`${BASE_URL}/goods-vehicle/old`}>{t('Used Goods Vehicle')}</Link>
              <Link to={`${BASE_URL}/harvester/new`}>{t('New Harvester')}</Link>
              <Link to={`${BASE_URL}/harvester/old`}>{t('Used Harvester')}</Link>
              <Link to={`${BASE_URL}/implements/new`}>{t('New Implements')}</Link>
              <Link to={`${BASE_URL}/implements/old`}>{t('Used Implements')}</Link>
              <Link to={`${BASE_URL}/tyre/new`}>{t('New Tyres')}</Link>
              <Link to={`${BASE_URL}/tyre/new`}>{t('Used Tyres')}</Link>
              <Link to={`${BASE_URL}/agri-inputs/seeds`}>{t('seeds')}</Link>
              <Link to={`${BASE_URL}/agri-inputs/pesticides`}>{t('pesticides')}</Link>
              <Link to={`${BASE_URL}/agri-inputs/fertilizer`}>{t('fertilizers')}</Link>
            </div>
          </div>
          <div className="footermenus__box md:mb-0 mb-5">
            <p className="text-2xl uppercase text-white mb-5">{t('RENT PRODUCTS')}</p>
            <div className="rent__links text-white uppercase">
              <Link to={`${BASE_URL}/tractor/rent`}>{t('Tractor')}</Link>
              <Link to={`${BASE_URL}/goods-vehicle/rent`}>{t('Goods Vehicle')}</Link>
              <Link to={`${BASE_URL}/harvester/rent`}>{t('Harvester')}</Link>
              <Link to={`${BASE_URL}/implements/rent`}>{t('Implements')}</Link>
            </div>
            <p className="text-2xl uppercase text-white my-5">{t('useful links')}</p>
            <div className="rent__links text-white uppercase">
              <Link to={`${BASE_URL}/contact`}>{t('contact us')}</Link>
              <Link to={`${BASE_URL}/about`}>{t('about us')}</Link>
              <Link to={`${BASE_URL}/privacy-policy`}>PRIVACY POLICY</Link>
              <Link to={`${BASE_URL}/terms-of-use`}>TERMS OF USE</Link>
              <Link to={`${BASE_URL}/data-retention-policy`}>DATA PRIVACY</Link>
            </div>
          </div>
        </div>
        <hr className="w-[90%] mx-auto my-10 h-[2px] bg-whitesmoke opacity-50" />
        <div className="container flex justify-between items-center md:flex-row flex-col gap-3 md:pb-0 pb-[100px]">
          <img
            src={makeInIndia}
            alt="make in india logo"
            width={100}
            className="invert"
          />
          <p className="text-white text-center">
            Copyright © 2023-24 | ABYBABY E-COM PRIVATE LIMITED | ALL RIGHTS
            RESERVED
          </p>
        </div>
      </div>
    </>
  );
};

export default FooterMenus;
