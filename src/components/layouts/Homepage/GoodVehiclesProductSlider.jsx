import { useEffect, useState } from "react";
import { loadAllCategoryWiseData } from "../../../services/api";
import CategoryWiseProductCarousel from "./CategoryWiseProductCarousel";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";

const tabs = ["rent", "old", "new"];

const GoodVehiclesProductSlider = () => {
  const [goodsVehicleData, setGoodVenhicleData] = useState({});
  const token = useSelector((state) => state.auth.token);

  const { data } = useQuery({
    queryKey: ["category-list",token],
    queryFn: () => loadAllCategoryWiseData(token),
  });

  useEffect(() => {
    if (data) {
      setGoodVenhicleData(data.good_vehicles);
    } 
  }, [data]);

  return (
    <>
      <CategoryWiseProductCarousel
        category_title="Goods Vehicle"
        tabs={tabs}
        product_data={goodsVehicleData}
        populer_brand_id="3"
        view_all_category="goods-vehicle"
      />
    </>
  );
};

export default GoodVehiclesProductSlider;
