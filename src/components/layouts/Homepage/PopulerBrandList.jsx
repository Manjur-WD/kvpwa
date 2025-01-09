import { useContext, useEffect, useState } from "react";
import { loadAllPopulerBrandAndCompanyData } from "../../../services/api";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../../../../config";
import { useDispatch, useSelector } from "react-redux";
import { addBrand, addPopulerBrand } from "../../../redux/features/filterProducts/FilterSlice";
import { CompanyDataContext } from "../../../context/CompanyData/CompanyDataContext";
const PopulerBrandList = ({ populer_brand_id, company_id, tab }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [brandData, setBrandData] = useState([]);
  const token = useSelector((state)=> state.auth.token);
  // console.log(populer_brand_id);
  const { data } = useQuery({
    queryKey: ["populer-brand-and-company"],
    queryFn: () => loadAllPopulerBrandAndCompanyData(token),
  });

  useEffect(() => {
    if (data && populer_brand_id) {
      setBrandData(data.brand[+populer_brand_id]);
    } else if (data && company_id) {
      setBrandData(data.company[+company_id]);
    }
  }, [data, populer_brand_id, company_id]);


  const getCategoryName = (cat_id) => {
    const categoryId = +cat_id;
    switch (categoryId) {
      case 1:
        return "tractor";
      case 3:
        return "goods-vehicle";
      case 4:
        return "harvester";
      case 5:
        return "implements";
      case 7:
        return "tyre";
      case 6:
      case 8:
      case 9:
        return "agri-inputs";
    }
  };

  const {companyLogo,setCompanyLogo} = useContext(CompanyDataContext);





  return (
    <>
      <div className="populer-brand-list px-2 flex items-center container overflow-x-auto mt-3">
        {brandData.map((brand) => (
          <div
            className="w-[150px] shadow shadow-lightgreen flex gap-2 justify-center items-center brand-card py-2 px-3 bg-white my-2 me-5 rounded-2xl hover:scale-95 flex-shrink-0 flex-grow-0 cursor-pointer"
            key={brand.id}
            onClick={() => {
              dispatch(addBrand(brand.id));
              dispatch(addPopulerBrand(brand.id));
              setCompanyLogo(brand.logo)
              // console.log(companyLogo);
              brand.category === "6" || brand.category === "8" || brand.category === "9" ?
                navigate(

                  `${BASE_URL}/company/${brand.id}`

                ) :
                navigate(


                  `${BASE_URL}/${getCategoryName(brand.category_id)}/${tab}`
                )
                ;
            }}

          >
            <img
              src={brand.logo}
              alt="populer-brand-logo"
              className="w-[50px] h-[50px] object-contain"
            />
            <p className="brand-title text-[12px] uppercase">{brand.name}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default PopulerBrandList;
