import { PiArrowBendUpLeftLight } from "react-icons/pi"
import { Link } from "react-router-dom"
import appleStore from "../../../public/images/apple-store.png"
import playStore from "../../../public/images/GooglePlay.png"
import mockMobile from "../../../public/images/mockup-mobile.png"
import sellList from "../../../public/images/sell-list.png"

const SellModal = () => {
    return (
        <>
            <div className="container">
                <Link to="/" className="md:text-3xl text-sm block text-center font-bold my-5 text-darkGreen"><PiArrowBendUpLeftLight className="inline me-2" /> Back to Home</Link>
                <section className="sell-cat bg-white p-10 active-sr rounded-3xl shadow">
                    <div className="container flex lg:flex-row flex-col items-center">
                        <div className="p-5">
                            <img src={sellList} alt="image" className="w-full" />
                        </div>
                        <div className="">
                            <div className="grid md:grid-cols-2 grid-cols-1 items-center">

                                <img src={mockMobile} alt="image" className="w-[250px]" />

                                <div className="">
                                    <h2 className="font-bold sm:text-2xl border-0 text-lg text-center mb-5 text-darkGreen">DOWNLOAD <br /> KRISHI VIKAS APP</h2>
                                    <div className="flex items-center justify-center gap-2 flex-col lg:flex-row">
                                        <a href="https://play.google.com/store/search?q=krishi+vikas&amp;c=apps" className="animate__animated animate__pulse animate__slower animate__infinite">
                                            <img src={playStore} alt="" width="150" />
                                        </a>
                                        <a href="https://apps.apple.com/in/app/krishi-vikas/id6449253442?platform=ipad" className="animate__animated animate__pulse animate__slower animate__infinite">
                                            <img src={appleStore} alt="" width="150" className="rounded" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

        </>
    )
}

export default SellModal
