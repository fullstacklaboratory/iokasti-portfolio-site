"use client";
import { motion } from "framer-motion";

const Mariquue = () => {
  return (
    <div className="fixed w-full bottom-0 z-10  border-t-2 overflow-hidden p-4 backdrop-blur-sm">
      <motion.div
        className="text-white whitespace-nowrap text-4xl w-full"
        initial={{ x: "100%" }} // Starting position, outside of the screen on the right
        animate={{ x: "-250%" }} // Ending position, outside of the screen on the left
        transition={{ duration: 50, repeat: Infinity, ease: "linear" }} // Adjust the duration as needed
        whileHover={{ x: 'initial'}} // Pause the animation on hover
      >
        Lorem
      </motion.div>
    </div>
  );
};

export default Mariquue;
