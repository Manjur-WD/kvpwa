import CategoryWiseProductCarousel from "./CategoryWiseProductCarousel";
import { useQuery } from "@tanstack/react-query";
import { loadAllCategoryWiseData } from "../../../services/api";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const tabs = ["seeds", "pesticides", "fertilizers"];

const AgriInputsProductSlider = () => {
  const [agriInputsData, setAgriInputsData] = useState({});
  const token = useSelector((state) => state.auth.token);

  const { data } = useQuery({
    queryKey: ["category-list",token],
    queryFn: () => loadAllCategoryWiseData(token),
  });

  useEffect(() => {
    if (data) {
      setAgriInputsData(data.agri_inputs); // Set tractor data from the API response
    }
  }, [data]);

  return (
    <>
      <CategoryWiseProductCarousel
        category_title="agri inputs"
        tabs={tabs}
        product_data={agriInputsData}
        view_all_category="agri-inputs"
      />
    </>
  );
};

export default AgriInputsProductSlider;

