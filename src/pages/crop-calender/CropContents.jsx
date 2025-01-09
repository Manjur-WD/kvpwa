import { useTranslation } from "react-i18next"
import Header from "../../components/layouts/Header/Header";
import Footer from "../../components/layouts/Footer/Footer";
import { FaChevronRight } from "react-icons/fa6";
import breadcrumbImage from "../../assets/images/img_hero.jpg";
import axios from "axios";
import { useEffect } from "react";
import { cropData } from "../../../public/crop-calender/cropData";

import wheat from "../../assets/crop-calender/Wheat 1.jpg"
import chickpea from "../../assets/crop-calender/Chickpea.jpg"
import mustard from "../../assets/crop-calender/Mustard.jpg"
import barley from "../../assets/crop-calender/Barley.jpg"
import lineseed from "../../assets/crop-calender/Lineseed.jpg"

import rice from "../../assets/crop-calender/Rice.jpg"
import maize from "../../assets/crop-calender/Maize.jpg"
import cotton from "../../assets/crop-calender/Cotton.jpg"
import soybean from "../../assets/crop-calender/Soybeans.jpg"
import groundnut from "../../assets/crop-calender/Groundnut.jpg"

import watermelon from "../../assets/crop-calender/Watermelon.jpg"
import cucumber from "../../assets/crop-calender/Cucumber.jpg"
import muskmelon from "../../assets/crop-calender/Muskmelon.jpg"
import bittergourd from "../../assets/crop-calender/Bitter Gourd.jpg"
import pumpkin from "../../assets/crop-calender/Pumpkin.jpg"
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import BASE_URL from "../../../config";



const CropContents = () => {
    const { t } = useTranslation();
    // const getCrosContent = async () => {
    //     const response = await axios.get("../../../public/crop-calender/crop-data.json");
    //     console.log(response.data);

    // }

    // useEffect(() => {
    //     getCrosContent();
    // }, [])
    const navigate = useNavigate();
    const languageSet = localStorage.getItem("i18nextLng");
    console.log(languageSet);
    const location = useLocation();
    const currentUrl = location.pathname;

    useEffect(() => {
        if (languageSet === "bn") {
            const updatedCropName = cropName;
            let status1 = currentUrl.endsWith("b");
            let status2 = currentUrl.endsWith("h");
            if (status1) {
                navigate(currentUrl);
            }
            else if (status2) {
                navigate(currentUrl.slice(0, currentUrl.length - 1) + languageSet[0]);
            }
            else {
                navigate(currentUrl + languageSet[0])
            }
        }
        else if (languageSet === "hn") {
            const updatedCropName = cropName;

            let status1 = currentUrl.endsWith("h");
            let status2 = currentUrl.endsWith("b");

            if (status1) {
                navigate(currentUrl);
            }
            else if (status2) {
                navigate(currentUrl.slice(0, currentUrl.length - 1) + languageSet[0]);
            }
            else {
                navigate(currentUrl + languageSet[0])
            }
        }
        else if (languageSet === "en") {
            const updatedCropName = cropName;

            let status1 = currentUrl.endsWith("h");
            let status2 = currentUrl.endsWith("b");

            if (status1) {
                navigate(currentUrl.slice(0, currentUrl.length - 1));
            }
            else if (status2) {
                navigate(currentUrl.slice(0, currentUrl.length - 1));
            }
        }

    }, [languageSet])

    const { cropCategory, cropName } = useParams();
    // console.log(cropCategory);
    // console.log(cropName);

    // This gives you the path of the current URL
    // console.log('Current URL:', currentUrl);



    // console.log(cropData.rabi.subcategory1);

    const cropContent = cropData[cropCategory]?.[cropName];

    return (
        <>
            <Header />

            <section
                className="breadcrumb flex justify-center items-center md:h-[300px] h-[200px]"
                style={{
                    backgroundImage: `linear-gradient(#13693a, #13693a6e),url(${breadcrumbImage})`,
                    backgroundSize: "cover", // Ensures the image covers the entire section
                    backgroundPosition: "center", // Centers the image
                }}
            >
                <div className="breadcrumb-content">
                    <div className="breadcrumb-links flex justify-center items-center text-2xl text-white">
                        <p className="hover:text-lightgreen px-3 md:text-lg text-sm uppercase">{t('Home')}</p>
                        <FaChevronRight />
                        <p className="hover:text-lightgreen px-3 capitalize md:text-lg text-sm">
                            {t('CROP CALENDER')}
                        </p>
                        <FaChevronRight />
                        <p className="hover:text-lightgreen px-3 capitalize md:text-lg text-sm">
                            {t('CROPS')}
                        </p>
                    </div>
                    <p
                        className="text-lightgreen md:text-6xl text-4xl font-bold text-center mt-3 uppercase"
                        style={{ textShadow: "0 0 15px black" }}
                    >
                        {t('CROPS')}
                    </p>
                </div>
            </section>
            <section className="crop-content container grid gap-10 lg:grid-cols-[1fr,300px] md:grid-cols-[1fr,200px] grid-cols-1 md:p-10 p-4">
                <div
                    className="crop-info"
                    dangerouslySetInnerHTML={{ __html: cropContent }}
                />

                <div className="crops-navigation">
                    <div className="other-crops-option">
                        <div className="rabi-option">
                            <h4>RABI</h4>
                            <Link to={
                                languageSet === "hn" ? `${BASE_URL}/crop-calender/rabi/subcategory1h` :
                                    languageSet === "bn" ? `${BASE_URL}/crop-calender/rabi/subcategory1b` :
                                        `${BASE_URL}/crop-calender/rabi/subcategory1`
                            } className="rabi-crop">
                                <div className="crops-box flex items-center">
                                    <img
                                        src={wheat}
                                        alt="wheat-image"
                                        className="img-fluid rounded-circle"
                                    />
                                    <h3>{t('Wheat')}</h3>
                                </div>
                            </Link>
                            <Link to={
                                languageSet === "hn" ? `${BASE_URL}/crop-calender/rabi/subcategory2h` :
                                    languageSet === "bn" ? `${BASE_URL}/crop-calender/rabi/subcategory2b` :
                                        `${BASE_URL}/crop-calender/rabi/subcategory2`
                            } className="rabi-crop">
                                <div className="crops-box flex items-center">
                                    <img
                                        src={chickpea}
                                        alt="wheat-image"
                                        className="img-fluid rounded-circle"
                                    />
                                    <h3>{t('Chickpea')}</h3>
                                </div>
                            </Link>
                            <Link to={
                                languageSet === "hn" ? `${BASE_URL}/crop-calender/rabi/subcategory3h` :
                                    languageSet === "bn" ? `${BASE_URL}/crop-calender/rabi/subcategory3b` :
                                        `${BASE_URL}/crop-calender/rabi/subcategory3`
                            } className="rabi-crop">
                                <div className="crops-box flex items-center">
                                    <img
                                        src={mustard}
                                        alt="wheat-image"
                                        className="img-fluid rounded-circle"
                                    />
                                    <h3>{t('Mustard')}</h3>
                                </div>
                            </Link>
                            <Link to={
                                languageSet === "hn" ? `${BASE_URL}/crop-calender/rabi/subcategory4h` :
                                    languageSet === "bn" ? `${BASE_URL}/crop-calender/rabi/subcategory4b` :
                                        `${BASE_URL}/crop-calender/rabi/subcategory4`
                            } className="rabi-crop">
                                <div className="crops-box flex items-center">
                                    <img
                                        src={barley}
                                        alt="wheat-image"
                                        className="img-fluid rounded-circle"
                                    />
                                    <h3>{t('Barley')}</h3>
                                </div>
                            </Link>
                            <Link to={
                                languageSet === "hn" ? `${BASE_URL}/crop-calender/rabi/subcategory5h` :
                                    languageSet === "bn" ? `${BASE_URL}/crop-calender/rabi/subcategory5b` :
                                        `${BASE_URL}/crop-calender/rabi/subcategory5`
                            } className="rabi-crop">
                                <div className="crops-box flex items-center">
                                    <img
                                        src={lineseed}
                                        alt="wheat-image"
                                        className="img-fluid rounded-circle"
                                    />
                                    <h3>{t('Linseed')}</h3>
                                </div>
                            </Link>
                        </div>
                        <div className="kharif-option">
                            <h4>KHARIF</h4>
                            <Link to={
                                languageSet === "hn" ? `${BASE_URL}/crop-calender/kharif/subcategory1h` :
                                    languageSet === "bn" ? `${BASE_URL}/crop-calender/kharif/subcategory1b` :
                                        `${BASE_URL}/crop-calender/kharif/subcategory1`
                            } className="kharif-crop">
                                <div className="crops-box flex items-center">
                                    <img
                                        src={rice}
                                        alt="rice-image"
                                        className="img-fluid rounded-circle"
                                    />
                                    <h3>{t('Rice')}</h3>
                                </div>
                            </Link>
                            <Link to={
                                languageSet === "hn" ? `${BASE_URL}/crop-calender/kharif/subcategory2h` :
                                    languageSet === "bn" ? `${BASE_URL}/crop-calender/kharif/subcategory2b` :
                                        `${BASE_URL}/crop-calender/kharif/subcategory2`
                            } className="kharif-crop">
                                <div className="crops-box flex items-center">
                                    <img
                                        src={maize}
                                        alt="maize-image"
                                        className="img-fluid rounded-circle"
                                    />
                                    <h3>{t('Maize')}</h3>
                                </div>
                            </Link>
                            <Link to={
                                languageSet === "hn" ? `${BASE_URL}/crop-calender/kharif/subcategory3h` :
                                    languageSet === "bn" ? `${BASE_URL}/crop-calender/kharif/subcategory3b` :
                                        `${BASE_URL}/crop-calender/kharif/subcategory3`
                            } className="kharif-crop">
                                <div className="crops-box flex items-center">
                                    <img
                                        src={cotton}
                                        alt="cotton-image"
                                        className="img-fluid rounded-circle"
                                    />
                                    <h3>{t('Cotton')}</h3>
                                </div>
                            </Link>
                            <Link to={
                                languageSet === "hn" ? `${BASE_URL}/crop-calender/kharif/subcategory4h` :
                                    languageSet === "bn" ? `${BASE_URL}/crop-calender/kharif/subcategory4b` :
                                        `${BASE_URL}/crop-calender/kharif/subcategory4`
                            } className="kharif-crop">
                                <div className="crops-box flex items-center">
                                    <img
                                        src={soybean}
                                        alt="soyabean-image"
                                        className="img-fluid rounded-circle"
                                    />
                                    <h3>{t('Soyabean')}</h3>
                                </div>
                            </Link>
                            <Link to={
                                languageSet === "hn" ? `${BASE_URL}/crop-calender/kharif/subcategory5h` :
                                    languageSet === "bn" ? `${BASE_URL}/crop-calender/kharif/subcategory5b` :
                                        `${BASE_URL}/crop-calender/kharif/subcategory5`
                            } className="kharif-crop">
                                <div className="crops-box flex items-center">
                                    <img
                                        src={groundnut}
                                        alt="groundnut-image"
                                        className="img-fluid rounded-circle"
                                    />
                                    <h3>{t('Groundnut')}</h3>
                                </div>
                            </Link>
                        </div>
                        <div className="zaid-option">
                            <h4>ZAID</h4>
                            <Link to={
                                languageSet === "hn" ? `${BASE_URL}/crop-calender/zaid/subcategory1h` :
                                    languageSet === "bn" ? `${BASE_URL}/crop-calender/zaid/subcategory1b` :
                                        `${BASE_URL}/crop-calender/zaid/subcategory1`
                            } className="zaid-crop">
                                <div className="crops-box flex items-center">
                                    <img
                                        src={watermelon}
                                        alt="watermelon-image"
                                        className="img-fluid rounded-circle"
                                    />
                                    <h3>{t('Watermelon')}</h3>
                                </div>
                            </Link>
                            <Link to={
                                languageSet === "hn" ? `${BASE_URL}/crop-calender/zaid/subcategory2h` :
                                    languageSet === "bn" ? `${BASE_URL}/crop-calender/zaid/subcategory2b` :
                                        `${BASE_URL}/crop-calender/zaid/subcategory2`
                            } className="zaid-crop">
                                <div className="crops-box flex items-center">
                                    <img
                                        src={cucumber}
                                        alt="cucumber-image"
                                        className="img-fluid rounded-circle"
                                    />
                                    <h3>{t('Cucumber')}</h3>
                                </div>
                            </Link>
                            <Link to={
                                languageSet === "hn" ? `${BASE_URL}/crop-calender/zaid/subcategory3h` :
                                    languageSet === "bn" ? `${BASE_URL}/crop-calender/zaid/subcategory3b` :
                                        `${BASE_URL}/crop-calender/zaid/subcategory3`
                            } className="zaid-crop">
                                <div className="crops-box flex items-center">
                                    <img
                                        src={muskmelon}
                                        alt="muskmelon-image"
                                        className="img-fluid rounded-circle"
                                    />
                                    <h3>{t('Muskmelon')}</h3>
                                </div>
                            </Link>
                            <Link to={
                                languageSet === "hn" ? `${BASE_URL}/crop-calender/zaid/subcategory4h` :
                                    languageSet === "bn" ? `${BASE_URL}/crop-calender/zaid/subcategory4b` :
                                        `${BASE_URL}/crop-calender/zaid/subcategory4`
                            } className="zaid-crop">
                                <div className="crops-box flex items-center">
                                    <img
                                        src={bittergourd}
                                        alt="bittergourd-image"
                                        className="img-fluid rounded-circle"
                                    />
                                    <h3>{t('Bitter Gourd')}</h3>
                                </div>
                            </Link>
                            <Link to={
                                languageSet === "hn" ? `${BASE_URL}/crop-calender/zaid/subcategory5h` :
                                    languageSet === "bn" ? `${BASE_URL}/crop-calender/zaid/subcategory5b` :
                                        `${BASE_URL}/crop-calender/zaid/subcategory5`
                            } className="zaid-crop">
                                <div className="crops-box flex items-center">
                                    <img
                                        src={pumpkin}
                                        alt="pumpkin-image"
                                        className="img-fluid rounded-circle"
                                    />
                                    <h3>{t('Pumpkin')}</h3>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>


            </section>
            <Footer />
        </>
    )
}

export default CropContents
