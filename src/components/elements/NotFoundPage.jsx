import { Link } from "react-router-dom"
import BASE_URL from "../../../config"
import Footer from "../layouts/Footer/Footer"
import BreadCrumb from "./BreadCrumb"
import Header from "../layouts/Header/Header"

const NotFoundPage = () => {
    return (
        <>
            <Header />
            {/* <MobileScreenNav /> */}
            {/* <BreadCrumb /> */}
            <section className="error-page-wrap">
                <div className="container p-5 h-full flex justify-center items-center flex-col">
                    <div className="error-text flex text-darkGreen">
                        <span>4</span>
                        <div className="img-box-error">
                            <img
                                src="https://krishivikas.com/storage/error_page/broken-tractor.png"
                                alt="tractor"
                            />
                        </div>
                        <span>4</span>
                    </div>
                    <p className="md:text-2xl text-sm text-darkGreen my-5">Oops !!!! Page Not Found</p>
                    <Link
                        to={`${BASE_URL}`}
                        className="bg-black text-white py-3 px-5 my-5 hover:bg-darkGreen"
                    >
                        GO TO HOME
                    </Link>
                </div>
            </section>

            <Footer />

        </>
    )
}

export default NotFoundPage
