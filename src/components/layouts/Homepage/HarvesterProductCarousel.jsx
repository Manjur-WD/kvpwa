import CategoryWiseProductCarousel from "./CategoryWiseProductCarousel";
import { useQuery } from "@tanstack/react-query";
import { loadAllCategoryWiseData } from "../../../services/api";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const tabs = ["rent", "old", "new"];

const HarvesterProductCarousel = () => {
  const [harvestorData, setharvestorData] = useState({});
  const token = useSelector((state) => state.auth.token);

  const { data } = useQuery({
    queryKey: ["category-list",token],
    queryFn: () => loadAllCategoryWiseData(token),
  });

  useEffect(() => {
    if (data) {
      setharvestorData(data.harvester); // Set tractor data from the API response
    }
  }, [data]);

  return (
    <>
      <CategoryWiseProductCarousel
        category_title="harvester"
        tabs={tabs}
        product_data={harvestorData}
        populer_brand_id="4"
        view_all_category="harvester"
      />
    </>
  );
};

export default HarvesterProductCarousel;

