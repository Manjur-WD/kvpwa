import Lottie from "react-lottie";
import animationData from "../../assets/images/success.json";

const SuccessAnime = () => {
    const defaultOptions = {
        loop: false, // Set to false to play the animation only once
        autoplay: true, // Start animation on load
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };

    return (
        <div className="success-animation">
            <Lottie
                options={defaultOptions}
                height={200}
                width={200}
                speed={0.8}
            />
        </div>
    )
}

export default SuccessAnime
