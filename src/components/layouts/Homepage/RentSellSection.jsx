import sell_icon from "../../../assets/images/sell.svg";
import rent_icon from "../../../assets/images/rent.svg";
import rentSellBanner from "../../../assets/images/rent-sell-banner.jpg";
import { useTranslation } from "react-i18next";

const RentSellSection = () => {
  const { t } = useTranslation();
  return (
    <>
      <section className="rent-sell-cta md:h-[400px] h-[250px]  flex justify-top flex-col pt-10 " style={{ background: `url(${rentSellBanner}) no-repeat bottom/cover` }}>
        <h2 className="md:text-6xl capitalize text-2xl px-5 text-center font-black text-white mb-5">
          {t('what would you like to do')}?
        </h2>
        <div className="rent-sell-btn flex justify-center gap-5">
          <a
            href="#"
            className=" bg-lightgreen uppercase md:text-2xl text-white md:px-10 px-5 py-3 rounded-3xl border animate-pulse hover:animate-none"
          >
            <img
              src={rent_icon}
              alt="this is a sell icon"
              className="inline me-1"
              width={25}
            />
            {t('rent')}
          </a>
          <a
            href="#"
            className=" bg-lightgreen uppercase md:text-2xl text-white md:px-10 px-5 py-3 rounded-3xl border animate-pulse hover:animate-none shadow"
          >
            <img
              src={sell_icon}
              alt="this is a sell icon"
              className="inline me-1"
              width={25}
            />
            {t('sell')}
          </a>
        </div>
      </section>
    </>
  );
};

export default RentSellSection;
