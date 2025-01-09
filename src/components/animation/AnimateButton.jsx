// FRAMER MOTION
import { motion } from "motion/react";

// eslint-disable-next-line react/prop-types
const AnimateButton = ({ children }) => {
  return (
    <>
      <motion.div whileTap={{ scale: 0.95 }}>{children}</motion.div>
    </>
  );
};

export default AnimateButton;
