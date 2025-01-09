import Lottie from "react-lottie";
import animationData from "../../assets/images/Flow 1.json";

const SplashScreen = ({setLoading}) => {
  const defaultOptions = {
    loop: false, // Set to false to play the animation only once
    autoplay: true, // Start animation on load
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const handleAnimationComplete = () => {
    setLoading(false); // Hide the splash screen once animation is done
  };

  return (
    <div
      className="splash-screen fixed h-screen w-screen bg-white top-0 flex justify-center items-center "
      style={{ zIndex: "999999" }}
    >
      <Lottie
        options={defaultOptions}
        height={300}
        width={300}
        speed={0.8}
        eventListeners={[
          {
            eventName: "complete",
            callback: handleAnimationComplete, // Handle completion of the animation
          },
        ]}
      />
    </div>
  );
};

export default SplashScreen;
