import { TbPhoneCall } from "react-icons/tb";
import { MdMarkEmailUnread } from "react-icons/md";
import { HiLocationMarker } from "react-icons/hi";
import { TbLanguage } from "react-icons/tb";
import { FaFacebook } from "react-icons/fa6";
import { AiFillInstagram } from "react-icons/ai";
import { FaXTwitter } from "react-icons/fa6";
import { IoIosArrowDown } from "react-icons/io";
import LanguageSelector from "../../../elements/LanguageSelector";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const TopHeadSection = () => {
  const { t } = useTranslation();
  const user = useSelector((state) => state.auth.user);
  // console.log(user);
  
  return (
    <>
      <section className="top-header bg-lightdark md:block hidden px-3">
        <div className="container flex justify-between py-1">
          <div className="header__phone__email">
            <a href="#" className="text-white me-2  border-e pe-2">
              <MdMarkEmailUnread className="inline me-1 text-lightgreen" />
              support@krishivikas.com
            </a>
            <a href="#" className="text-white">
              <TbPhoneCall className="inline me-1 text-lightgreen" />
              8100975657
            </a>
          </div>
          <div className="header__pincode__language__social">
            <a href="#" className="text-white me-2 border-e pe-2">
              <HiLocationMarker className="inline me-1 text-lightgreen" />
              {user.district_name} {user.zipcode}
            </a>
            <LanguageSelector />
            <div className="header__social--links inline ms-2">
              <a href="#">
                <FaFacebook className="inline me-4 text-white hover:text-lightgreen hover:scale-150" />
              </a>
              <a href="#">
                <AiFillInstagram className="inline me-4 text-white hover:text-lightgreen hover:scale-150" />
              </a>
              <a href="#">
                <FaXTwitter className="inline text-white hover:text-lightgreen hover:scale-150" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TopHeadSection;
