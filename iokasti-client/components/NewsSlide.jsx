"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import {
  animate,
  calcLength,
  motion,
  useAnimationControls,
} from "framer-motion";

const NewsSlide = ({ item }) => {
  const controls = useAnimationControls();

  useEffect(() => {
    controls.start({ x: "-10%" });
  }, []);

  const handleHover = () => {
    controls.start({ x: "" });
  };

  const handleHoverEnd = (e) => {
    console.log(e.screenX);
    controls.start({ x: "-10%", initial: { x: "100%" } });
  };

  return (
    <div
      key={item.starting_date}
      className="text-white fixed bottom-0 p-2 backdrop-blur-sm border-t border-t-white w-screen"
    >
      <motion.div
        className="w-screen"
        initial={{ x: "100%" }}
        animate={controls}
        onHoverStart={handleHover}
        onHoverEnd={handleHoverEnd}
        transition={{
          duration: 12,
          ease: "linear",
          repeat: Infinity,
          repeatDelay: 1,
        }}
      >
        <Link href={`projects/${item.slug}`}>
          {new Date(item.starting_date).toLocaleDateString()}: {item.title}
        </Link>
      </motion.div>
    </div>
  );
};

export default NewsSlide;
