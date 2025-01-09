import CategoryWiseProductCarousel from "./CategoryWiseProductCarousel";
import { useQuery } from "@tanstack/react-query";
import { loadAllCategoryWiseData } from "../../../services/api";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const tabs = ["rent", "old", "new"];

const ImplementsProductsSlider = () => {
  const [implemetsData, setImplementsData] = useState({});
  const token = useSelector((state) => state.auth.token);

  const { data } = useQuery({
    queryKey: ["category-list",token],
    queryFn: () => loadAllCategoryWiseData(token),
  });

  useEffect(() => {
    if (data) {
      setImplementsData(data.implements); // Set tractor data from the API response
    }
  }, [data]);

  return (
    <>
      <CategoryWiseProductCarousel
        category_title="implements"
        tabs={tabs}
        product_data={implemetsData}
        populer_brand_id="5"
        view_all_category="implements"
      />
    </>
  );
};

export default ImplementsProductsSlider;

