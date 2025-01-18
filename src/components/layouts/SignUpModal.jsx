import { useEffect, useState } from "react"
import "animate.css"
import Header from "./Header/Header"
import Footer from "./Footer/Footer"
import { Link } from "react-router-dom"
import { PiArrowBendUpLeftLight } from "react-icons/pi";
import appleStore from "../../../public/images/apple-store.png"
import playStore from "../../../public/images/GooglePlay.png"
import mockMobile from "../../../public/images/mockup-mobile.png"


const SignUpModal = () => {

    return (
        <>
            {/* <Header /> */}
            <Link to="/" className="text-3xl block text-center font-bold mt-5"><PiArrowBendUpLeftLight className="inline me-2" /> Back to Home</Link>
            <div className='container p-10 animate___animated animate__fadeIn animate__slower my-[50px] rounded-3xl shadow-lg' id="signup-form">
                <div className="flex sm:flex-row flex-col-reverse justify-center items-center gap-5">
                    <div className="">
                        <img src="https://krishivikas.com/assets/images/mockup-mobile.png" alt="image" className="h-[300px]" />
                    </div>
                    <div className="">
                        <h2 className="font-bold text-2xl border-0 text-center my-5 text-darkGreen">DOWNLOAD <br /> KRISHI VIKAS APP</h2>
                        <div className="flex items-center justify-center gap-2 flex-col sm:flex-row">
                            <a href="https://play.google.com/store/search?q=krishi+vikas&amp;c=apps" className="animate__animated animate__pulse animate__slower animate__infinite">
                                <img src="https://krishivikas.com/assets/images/Google-Play-Store-removebg-preview.png" alt="" width="150" />
                            </a>
                            <a href="https://apps.apple.com/in/app/krishi-vikas/id6449253442?platform=ipad" className="animate__animated animate__pulse animate__slower animate__infinite">
                                <img src="https://krishivikas.com/assets/images/apple-store.png" alt="" width="150" className="rounded" />
                            </a>
                        </div>
                        <p className="text-lg text-gray-500 mt-3 mb-0 text-center">AND</p>
                        <h3 className="font-bold text-lg text-center text-darkGreen flex items-center justify-center">
                            <svg style={{ width: '10%' }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M14 14.252V22H4C4 17.5817 7.58172 14 12 14C12.6906 14 13.3608 14.0875 14 14.252ZM12 13C8.685 13 6 10.315 6 7C6 3.685 8.685 1 12 1C15.315 1 18 3.685 18 7C18 10.315 15.315 13 12 13ZM18 17V14H20V17H23V19H20V22H18V19H15V17H18Z" />
                            </svg>
                            REGISTER YOURSELF
                        </h3>
                    </div>
                </div>
            </div>
            {/* <Footer /> */}

        </>
    )
}

export default SignUpModal
