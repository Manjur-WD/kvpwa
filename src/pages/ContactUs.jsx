import toast from "react-hot-toast";
import Footer from "../components/layouts/Footer/Footer"
import Header from "../components/layouts/Header/Header"
import BASE_URL from "../../config";
import { useNavigate } from "react-router-dom";
import kvBanner from "../assets/images/KV bnr.jpg";
import breadcrumbImage from "../assets/images/img_hero.jpg";
import { useTranslation } from "react-i18next";
import { FaChevronRight } from "react-icons/fa6";
import { BsFillSendFill } from "react-icons/bs";

const ContactUs = () => {
    const scriptURL = 'https://script.google.com/macros/s/AKfycbwiaiaCo_E-WLM3jva6reqJM2cd4t5EtUQby00TZY735H0AKhbNvzVyK9Z8Qobc0j67/exec';

    const navigate = useNavigate();
    const {t} = useTranslation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        toast('Submitting...', '#333');

        const form = e.target;
        try {
            const response = await fetch(scriptURL, {
                method: 'POST',
                body: new FormData(form),
            });

            if (response.ok) {
                toast.success('Your data is successfully submitted', '#4CAF50');
                form.reset();
                setTimeout(() => {
                    navigate(`${BASE_URL}/contact`);
                }, 1000);
            } else {
                const errorText = await response.text();
                throw new Error(errorText);
            }
        } catch (error) {
            toast.error(`Error: ${error.message}`, '#F44336');
        }
    };

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
                            {t('contact us')}
                        </p>
                    </div>
                    <p
                        className="text-lightgreen md:text-6xl text-4xl font-bold text-center mt-3 uppercase"
                        style={{ textShadow: "0 0 15px black" }}
                    >
                        {t('contact us')}
                    </p>
                </div>
            </section>
            <section id="contact" className="contact my-5">
                <div className="container" data-aos="fade-up">
                    <div>
                        <img
                            src={kvBanner}
                            alt="kv-contact"
                            className="img-fluid w-full rounded-3xl"
                        />
                    </div>

                    <div className="row mt-5">
                        <div className="col-lg-4">
                            <div className="info grid md:grid-cols-3 grid-cols-1 shadow bg-white p-5 rounded-3xl">
                                <div className="address mb-4">
                                    <i className="fa-solid fa-location-dot text-xl"></i>
                                    <h4 className="font-semibold text-lg">Location:</h4>
                                    <p>6B Janak Road, Kolkata- 700029</p>
                                </div>

                                <div className="email mb-4">
                                    <i className="fa-solid fa-envelope text-xl"></i>
                                    <h4 className="font-semibold text-lg">Email:</h4>
                                    <p>support@krishivikas.com</p>
                                </div>

                                <div className="phone">
                                    <i className="fa-solid fa-phone-volume text-xl"></i>
                                    <h4 className="font-semibold text-lg">Call:</h4>
                                    <p>8100975657</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-8 mt-5 mt-lg-0 bg-white p-5 rounded-3xl shadow">
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            name="name"
                                            className="form-control block w-full border rounded py-2 px-3"
                                            placeholder="Your Name"
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type="number"
                                            name="phone_no"
                                            className="form-control block w-full border rounded py-2 px-3"
                                            placeholder="Your Phone No."
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <select
                                            className="form-select block w-full border rounded py-2 px-3 text-gray-500"
                                            name="business_category"
                                            required
                                        >
                                            <option value="">Select Business Type</option>
                                            <option value="Dealer">Dealer</option>
                                            <option value="Exchanger">Exchanger</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            name="city"
                                            className="form-control block w-full border rounded py-2 px-3"
                                            placeholder="Enter City"
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type="number"
                                            name="pincode"
                                            className="form-control block w-full border rounded py-2 px-3"
                                            placeholder="Enter Pincode"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="text-center mt-3">
                                    <button
                                        type="submit"
                                        className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 bg-gradient-green"
                                    >
                                       <BsFillSendFill className="inline"/> Send Message
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    )
}

export default ContactUs
