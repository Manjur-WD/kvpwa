import { FaChevronRight } from "react-icons/fa6"

import breadcrumbImage from "../../assets/images/img_hero.jpg";
import "animate.css"

import { useTranslation } from "react-i18next";
import Header from "../../components/layouts/Header/Header";
import Footer from "../../components/layouts/Footer/Footer";

import rabiIcon from "../../assets/crop-calender/rabi.png"
import kharifIcon from "../../assets/crop-calender/kharif.webp"
import zaidIcon from "../../assets/crop-calender/zaid.png"

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


import { useState } from "react";
import { Link } from "react-router-dom";
import BASE_URL from "../../../config";




const CropCalenderMenus = () => {
    const { t } = useTranslation();

    const [cropmenu, setCropMenu] = useState(1);

    const handleCropMenu = (id) => {
        setCropMenu(id);
    }

    const languageSet = localStorage.getItem("i18nextLng");



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
                        <p className="hover:text-lightgreen px-3">{t('Home')}</p>
                        <FaChevronRight />
                        <p className="hover:text-lightgreen px-3 capitalize">
                            {t('CROP CALENDER')}
                        </p>
                    </div>
                    <p
                        className="text-lightgreen md:text-6xl text-4xl font-bold text-center mt-3 uppercase"
                        style={{ textShadow: "0 0 15px black" }}
                    >
                        {t('CROP CALENDER')}
                    </p>
                </div>
            </section>

            <section className="crop-calender-menus">
                <div className="crop-calender-heading text-center">
                    <h2 className="text-center border-2 p-3 font-bold uppercase border-black inline-block my-5 mx-auto text-xl">{t('SEASON CATEGORY')}</h2>
                </div>
                <div className="container">
                    <div className="menus flex justify-around">
                        <div className={cropmenu === 1 ? "rabi text-center active" : "rabi text-center"} onClick={() => { handleCropMenu(1) }}>
                            <div className="bg-[#8cbf4552] rounded-3xl p-5 shadow shadow-[#8cbf44]">
                                <img src={rabiIcon} alt="rabi" className="bg-white md:w-[100px] h-[50px] w-[50px] md:h-[100px]  rounded-full block" />
                            </div>
                            <p className="my-3 text-lg">{t('RABI')}</p>
                        </div>
                        <div className={cropmenu === 2 ? "kharif text-center active" : "kharif text-center"} onClick={() => { handleCropMenu(2) }}>
                            <div className="bg-[#8cbf4552] rounded-3xl p-5 shadow shadow-[#8cbf44]">
                                <img src={kharifIcon} alt="rabi" className="bg-white  md:w-[100px] h-[50px] w-[50px] md:h-[100px]  rounded-full block" />
                            </div>
                            <p className="my-3 text-lg">{t('KHARIF')}</p>
                        </div>
                        <div className={cropmenu === 3 ? "zaid text-center active" : "zaid text-center"} onClick={() => { handleCropMenu(3) }}>
                            <div className="bg-[#8cbf4552] rounded-3xl p-5 shadow shadow-[#8cbf44]">
                                <img src={zaidIcon} alt="rabi" className="bg-white  md:w-[100px] h-[50px] w-[50px] md:h-[100px]  rounded-full block" />
                            </div>
                            <p className="my-3 text-lg">{t('ZAID')}</p>
                        </div>
                    </div>

                    <div className="menu-content">
                        <div className={cropmenu === 1 ? "rabi-crops-menus container p-3 animate__animated animate__fadeIn" : "rabi-crops-menus hidden container p-3"}>

                            <div className="bg-[#8dbf4530] rounded-3xl lg:p-10 text-center p-5">
                                <h3 className="text-center text-lightgreen border-b-2 border-lightgreen inline-block mb-5 text-2xl">{t('RABI CROPS')}</h3>
                                <div className="flex justify-center flex-wrap gap-x-10 gap-y-5">
                                    <Link to={
                                        languageSet === "hn" ?
                                            `${BASE_URL}/crop-calender/rabi/subcategory1h` :
                                            languageSet === "bn" ?
                                                `${BASE_URL}/crop-calender/rabi/subcategory1b` :
                                                `${BASE_URL}/crop-calender/rabi/subcategory1`
                                    } className="rabi-crop">

                                        <img src={wheat} alt="wheat" />
                                        <p>{t('Wheat')}</p>

                                    </Link>
                                    <Link to={
                                        languageSet === "hn" ?
                                            `${BASE_URL}/crop-calender/rabi/subcategory2h` :
                                            languageSet === "bn" ?
                                                `${BASE_URL}/crop-calender/rabi/subcategory2b` :
                                                `${BASE_URL}/crop-calender/rabi/subcategory2`
                                    } className="rabi-crop">
                                        <img src={chickpea} alt="chickpea" />
                                        <p>{t('Chickpea')}</p>
                                    </Link>
                                    <Link to={
                                        languageSet === "hn" ?
                                            `${BASE_URL}/crop-calender/rabi/subcategory3h` :
                                            languageSet === "bn" ?
                                                `${BASE_URL}/crop-calender/rabi/subcategory3b` :
                                                `${BASE_URL}/crop-calender/rabi/subcategory3`
                                    } className="rabi-crop">
                                        <img src={mustard} alt="mustard" />
                                        <p>{t('Mustard')}</p>
                                    </Link>
                                    <Link to={
                                        languageSet === "hn" ?
                                            `${BASE_URL}/crop-calender/rabi/subcategory4h` :
                                            languageSet === "bn" ?
                                                `${BASE_URL}/crop-calender/rabi/subcategory4b` :
                                                `${BASE_URL}/crop-calender/rabi/subcategory4`
                                    } className="rabi-crop">
                                        <img src={barley} alt="barley" />
                                        <p>{t('Barley')}</p>
                                    </Link>
                                    <Link to={
                                        languageSet === "hn" ?
                                            `${BASE_URL}/crop-calender/rabi/subcategory5h` :
                                            languageSet === "bn" ?
                                                `${BASE_URL}/crop-calender/rabi/subcategory5b` :
                                                `${BASE_URL}/crop-calender/rabi/subcategory5`
                                    } className="rabi-crop">
                                        <img src={lineseed} alt="lineseed" />
                                        <p>{t('Linseed')}</p>
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <div className={cropmenu === 2 ? "kharif-crops-menus container p-3 animate__animated animate__fadeIn" : "kharif-crops-menus hidden container p-3"}>

                            <div className="bg-[#8dbf4530] rounded-3xl lg:p-10 text-center p-5">
                                <h3 className="text-center text-lightgreen border-b-2 border-lightgreen inline-block mb-5 text-2xl">{t('KHARIF CROPS')}</h3>
                                <div className="flex justify-center flex-wrap gap-x-10 gap-y-5">
                                <Link to={
                                        languageSet === "hn" ?
                                            `${BASE_URL}/crop-calender/kharif/subcategory1h` :
                                            languageSet === "bn" ?
                                                `${BASE_URL}/crop-calender/kharif/subcategory1b` :
                                                `${BASE_URL}/crop-calender/kharif/subcategory1`
                                    } className="kharif-crop">
                                        <img src={rice} alt="rice" />
                                        <p>{t('Rice')}</p>
                                    </Link>
                                    <Link to={
                                        languageSet === "hn" ?
                                            `${BASE_URL}/crop-calender/kharif/subcategory2h` :
                                            languageSet === "bn" ?
                                                `${BASE_URL}/crop-calender/kharif/subcategory2b` :
                                                `${BASE_URL}/crop-calender/kharif/subcategory2`
                                    } className="kharif-crop">
                                        <img src={maize} alt="maize" />
                                        <p>{t('Maize')}</p>
                                    </Link>
                                    <Link to={
                                        languageSet === "hn" ?
                                            `${BASE_URL}/crop-calender/kharif/subcategory3h` :
                                            languageSet === "bn" ?
                                                `${BASE_URL}/crop-calender/kharif/subcategory3b` :
                                                `${BASE_URL}/crop-calender/kharif/subcategory3`
                                    } className="kharif-crop">
                                        <img src={cotton} alt="cotton" />
                                        <p>{t('Cotton')}</p>
                                    </Link>
                                    <Link to={
                                        languageSet === "hn" ?
                                            `${BASE_URL}/crop-calender/kharif/subcategory4h` :
                                            languageSet === "bn" ?
                                                `${BASE_URL}/crop-calender/kharif/subcategory4b` :
                                                `${BASE_URL}/crop-calender/kharif/subcategory4`
                                    } className="kharif-crop">
                                        <img src={soybean} alt="soybean" />
                                        <p>{t('Soyabean')}</p>
                                    </Link>
                                    <Link to={
                                        languageSet === "hn" ?
                                            `${BASE_URL}/crop-calender/kharif/subcategory5h` :
                                            languageSet === "bn" ?
                                                `${BASE_URL}/crop-calender/kharif/subcategory5b` :
                                                `${BASE_URL}/crop-calender/kharif/subcategory5`
                                    } className="kharif-crop">
                                        <img src={groundnut} alt="groundnut" />
                                        <p>{t('Groundnut')}</p>
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <div className={cropmenu === 3 ? "zaid-crops-menus container p-3 animate__animated animate__fadeIn" : "zaid-crops-menus hidden container p-3"}>

                            <div className="bg-[#8dbf4530] rounded-3xl lg:p-10 text-center p-5">
                                <h3 className="text-center text-lightgreen border-b-2 border-lightgreen inline-block mb-5 text-2xl">{t('ZAID CROPS')}</h3>
                                <div className="flex justify-center flex-wrap gap-x-10 gap-y-5">
                                <Link to={
                                        languageSet === "hn" ?
                                            `${BASE_URL}/crop-calender/zaid/subcategory1h` :
                                            languageSet === "bn" ?
                                                `${BASE_URL}/crop-calender/zaid/subcategory1b` :
                                                `${BASE_URL}/crop-calender/zaid/subcategory1`
                                    } className="zaid-crop">
                                        <img src={watermelon} alt="watermelon" />
                                        <p>{t('Watermelon')}</p>
                                    </Link>
                                    <Link to={
                                        languageSet === "hn" ?
                                            `${BASE_URL}/crop-calender/zaid/subcategory2h` :
                                            languageSet === "bn" ?
                                                `${BASE_URL}/crop-calender/zaid/subcategory2b` :
                                                `${BASE_URL}/crop-calender/zaid/subcategory2`
                                    } className="zaid-crop">
                                        <img src={cucumber} alt="cucumber" />
                                        <p>{t('Cucumber')}</p>
                                    </Link>
                                    <Link to={
                                        languageSet === "hn" ?
                                            `${BASE_URL}/crop-calender/zaid/subcategory3h` :
                                            languageSet === "bn" ?
                                                `${BASE_URL}/crop-calender/zaid/subcategory3b` :
                                                `${BASE_URL}/crop-calender/zaid/subcategory3`
                                    } className="zaid-crop">
                                        <img src={muskmelon} alt="muskmelon" />
                                        <p>{t('Muskmelon')}</p>
                                    </Link>
                                    <Link to={
                                        languageSet === "hn" ?
                                            `${BASE_URL}/crop-calender/zaid/subcategory4h` :
                                            languageSet === "bn" ?
                                                `${BASE_URL}/crop-calender/zaid/subcategory4b` :
                                                `${BASE_URL}/crop-calender/zaid/subcategory4`
                                    } className="zaid-crop">
                                        <img src={bittergourd} alt="bittergourd" />
                                        <p>{t('Bitter Gourd')}</p>
                                    </Link>
                                    <Link to={
                                        languageSet === "hn" ?
                                            `${BASE_URL}/crop-calender/zaid/subcategory5h` :
                                            languageSet === "bn" ?
                                                `${BASE_URL}/crop-calender/zaid/subcategory5b` :
                                                `${BASE_URL}/crop-calender/zaid/subcategory5`
                                    } className="zaid-crop">
                                        <img src={pumpkin} alt="pumpkin" />
                                        <p>{t('Pumpkin')}</p>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    )
}

export default CropCalenderMenus
