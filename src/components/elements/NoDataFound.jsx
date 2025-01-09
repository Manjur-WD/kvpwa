import Lottie from "react-lottie";
import animationData from "../../assets/images/noData.json";

const NoDataFound = () => {
  const defaultOptions = {
    loop: true, // Set to false to play the animation only once
    autoplay: true, // Start animation on load
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <>
      <div className="nodata-screen">
        <Lottie options={defaultOptions} height={300} width={300} speed={0.8} />
      </div>
    </>
  );
};

export default NoDataFound;
