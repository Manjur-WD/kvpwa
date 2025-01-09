import { useContext, useState } from "react";
import { SortStatusContext } from "../../context/SortingProductContext/SortProductContext";
import { useTranslation } from "react-i18next";

// eslint-disable-next-line react/prop-types
const SortProductTabs = ({ sort_btn_state, sortBtnActive, setSortBtnActive }) => {
  // Set the initial active button index to 0 (first button active initially)
  const [activeButton, setActiveButton] = useState(0);
  const { setPriceSort } = useContext(SortStatusContext);

  // Function to handle button click
  const handleButtonClick = (index) => {
    setActiveButton(index); // Set the clicked button as active
    switch (index) {
      case 1:
        setPriceSort("desc");
        setSortBtnActive(!sortBtnActive)
        window.scrollTo(0, 0);
        break;
      case 2:
        setPriceSort("asc");
        setSortBtnActive(!sortBtnActive)
        window.scrollTo(0, 0);
        break;
      case 3:
        setPriceSort("nf");
        setSortBtnActive(!sortBtnActive)
        window.scrollTo(0, 0);
        break;
      default:
        break;
    }
  };


  const {t} = useTranslation();

  return (
    <>
      <section className="sort-product-tab-section  md:sticky top-[155px] z-10 lg:py-2 bg-whitesmoke">
        <div
          className={
            sort_btn_state
              ? "active bg-white mx-3 mt-1 flex lg:flex-row flex-col items-center rounded-3xl md:gap-5"
              : " bg-white mx-3 mt-1 flex lg:flex-row flex-col items-center rounded-3xl md:gap-5"
          }
        >
          <p className="label-sort truncate text-white bg-darkGreen px-5 py-2 rounded-3xl m-2">
            {t('Sort By')}
          </p>
          <div className="sort-buttons flex lg:flex-row items-center flex-col">
            <button
              onClick={() => handleButtonClick(1)} // Set first button as active
              className={`px-4 py-2 m-2 ${activeButton === 1
                  ? "border-b border-darkGreen text-darkGreen"
                  : "border-b text-black"
                }`}
            >
              {t('Price- High to Low')}
            </button>

            <button
              onClick={() => handleButtonClick(2)} // Set second button as active
              className={`px-4 py-2 m-2 ${activeButton === 2
                  ? "border-b border-darkGreen text-darkGreen"
                  : "border-b text-black"
                }`}
            >
              {t('Price- Low to High')}
            </button>

            <button
              onClick={() => handleButtonClick(3)} // Set third button as active
              className={`px-4 py-2 m-2 ${activeButton === 3
                  ? "border-b border-darkGreen text-darkGreen"
                  : "border-b text-black"
                }`}
            >
              {t('Newest First')}
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default SortProductTabs;
