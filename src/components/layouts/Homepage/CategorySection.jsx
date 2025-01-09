import { BsGridFill } from "react-icons/bs";
import { useQuery } from "@tanstack/react-query";
import { getCategoryList } from "../../../services/api";
import Preloader from "../../elements/Preloader";
import { Link } from "react-router-dom";
import BASE_URL from "../../../../config";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const categoryLinks = [
  `${BASE_URL}/tractor/old`, // Link for first category
  `${BASE_URL}/goods-vehicle/old`, // Link for second category
  `${BASE_URL}/agri-inputs/seeds`, // Link for third category
  `${BASE_URL}/agri-inputs/pesticides`, // Link for fourth category
  `${BASE_URL}/agri-inputs/fertilizer`, // and so on...
  `${BASE_URL}/harvester/old`,
  `${BASE_URL}/implements/old`,
  `${BASE_URL}/tyre/old`,
];

const CategorySection = () => {

  const { t } = useTranslation();
  const token = useSelector((state) => state.auth.token);
  // Use the useQuery hook to fetch data
  const {
    data: categoryList,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["category-list", 1, token], // Add the languageId to the queryKey for better cache management
    queryFn: () => getCategoryList(1, token), // Pass a function that calls getCategoryList
  });

  // Handle loading and error states
  if (isLoading) {
    return <Preloader />;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <section className="category-section md:w-[95%] mx-auto md:py-10 py-5 md:px-10 px-3">
      <div className="container">
        <h2 className="text-3xl text-center mb-10 md:block hidden">
          <BsGridFill className="inline pb-1 me-1" />
          <span>{t('Top Categories')}</span>
        </h2>
        <div className="categories md:grid flex justify-start place-content-center lg:grid-cols-4 md:grid-cols-2 gap-y-5 md:gap-x-8 gap-2 overflow-x-auto pb-5">
          {categoryList && categoryList.length > 0 ? (
            categoryList.map((item, index) => (
              <Link to={categoryLinks[index]} key={item.category_id}>
                <div
                  // Ensure a unique key for each element
                  className="category hover:scale-95 md:flex md:flex-row flex-col items-center gap-4 bg-white shadow-lg p-5 md:rounded-3xl rounded-2xl transition-shadow border md:w-auto w-[100px] h-full flex-grow-0 flex-shrink-0"
                >
                  <div className="category-image">
                    <img
                      src={item.category_icon}
                      alt="this is category icon"
                      className="md:w-[70px] md:h-[70px] w-[40px] h-[40px] object-contain md:p-3 rounded-full mx-auto"
                    />
                  </div>
                  <p className="uppercase  text-darkGreen md:text-lg text-xs md:text-left text-center md:p-0 pt-1">
                    {t(item.category_name)}
                  </p>
                </div>
              </Link>
            ))
          ) : (
            <div>No categories available</div> // Fallback message if categoryList is empty
          )}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
