import { useParams } from "react-router-dom";
import breadcrumbImage from "../../assets/images/img_hero.jpg";
import { FaChevronRight } from "react-icons/fa6";
import { useTranslation } from "react-i18next";

const BreadCrumb = () => {
  const { category, type } = useParams();
  const {t} = useTranslation();

  return (
    <>
      <section
        className="breadcrumb flex justify-center items-center md:h-[300px] h-[200px]"
        style={{
          backgroundImage: `linear-gradient(#13693a, #13693a6e),url(${breadcrumbImage})`,
          backgroundSize: "cover", // Ensures the image covers the entire section
          backgroundPosition: "center", // Centers the image
        }}
      >
        <div className="breadcrumb-content">
          <div className="breadcrumb-links flex justify-center items-center md:text-2xl text-white">
            <p className="hover:text-lightgreen px-3">{t('Home')}</p>
            <FaChevronRight />
            <p className="hover:text-lightgreen px-3 capitalize ">
              {category === "goods-vehicle" ? "goods vehicle" : category === "agri-inputs" ? t('agri inputs') : t(category)}
            </p>
          </div>
          <p
            className="text-lightgreen md:text-6xl text-3xl font-bold text-center mt-3 uppercase"
            style={{ textShadow: "0 0 15px black" }}
          >
            {category === "goods-vehicle"
              ? `${type === "old" ? t("used") : t(type)} ${t("goods vehicle")}`
              : category === "agri-inputs"
              ? t(type)
              : `${type === "old" ? t("used") : t(type)} ${t(category)}`}
          </p>
        </div>
      </section>
    </>
  );
};

export default BreadCrumb;
