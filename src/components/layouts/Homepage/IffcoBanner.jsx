import { Link } from "react-router-dom";
import iffcoBanner from "../../../assets/images/iffco-bner-10.webp";
import BASE_URL from "../../../../config";
import { useContext } from "react";
import { CompanyDataContext } from "../../../context/CompanyData/CompanyDataContext";
const IffcoBanner = () => {

  const { setCompanyLogo } = useContext(CompanyDataContext);
  return (
    <>
      <section className="iffco-banner">
        <Link to={`${BASE_URL}/company/1`} onClick={() => { setCompanyLogo("https://krishivikas.com//storage/company/2023-09-07-12-53-496191WhatsApp%20Image%202023-09-05%20at%2012.47.58.jpg") }}>
          <img
            src={iffcoBanner}
            alt="this is iffco banner"
            className="company-image"
          />
        </Link>
      </section>
    </>
  );
};

export default IffcoBanner;
