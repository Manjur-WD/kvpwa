import CategoryWiseProductCarousel from "./CategoryWiseProductCarousel";
import { useQuery } from "@tanstack/react-query";
import { loadAllCategoryWiseData } from "../../../services/api";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const tabs = ["old", "new"];

const TyreProductsSlider = () => {
  const [tyresData, setTyresData] = useState({});
  const token = useSelector((state) => state.auth.token);

  const { data } = useQuery({
    queryKey: ["category-list",token],
    queryFn: () => loadAllCategoryWiseData(token),
  });


  

  useEffect(() => {
    if (data) {
      setTyresData(data.tyre); // Set tractor data from the API response
    }
  }, [data]);

  return (
    <>
      <CategoryWiseProductCarousel
        category_title="tyres"
        tabs={tabs}
        product_data={tyresData}
        populer_brand_id="7"
        view_all_category="tyre"
      />
    </>
  );
};

export default TyreProductsSlider;

