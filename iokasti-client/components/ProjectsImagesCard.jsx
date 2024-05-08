"use client";
import Image from "next/image";
import BannerImageOrVideo from "@/components/BannerImageOrVideo";
import { useEffect, useState } from "react";
import { motion, useScroll } from "framer-motion";

let CMS_URL;

if (process.env.NODE_ENV === "development") {
  CMS_URL = process.env.NEXT_PUBLIC_ENV_VPS_SERVER_DEV;
} else {
  CMS_URL = process.env.NEXT_PUBLIC_ENV_VPS_SERVER_PROD;
}

const ProjectsImagesCard = ({ images }) => {
  const { scrollYProgress } = useScroll();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const updateImageIndex = () => {
      const index = Math.floor(scrollYProgress.get() * (images.length - 1));
      setCurrentImageIndex(index);
    };

    updateImageIndex();

    return scrollYProgress.onChange(updateImageIndex);
  }, [scrollYProgress, images]);

  return (
    <motion.div
      className="image-card"
      // initial={{ opacity: 0 }}
      // animate={{ opacity: 1 }}
      // transition={{ duration: 0.5 }}
    >
      <BannerImageOrVideo
        mime={images[currentImageIndex].attributes.mime}
        src={CMS_URL + images[currentImageIndex].attributes.url}
        alt={images[currentImageIndex].attributes.alternativeText}
        width={images[currentImageIndex].attributes.width}
        height={images[currentImageIndex].attributes.height}
      />
      {/* <Image
        src={CMS_URL + images[currentImageIndex].attributes.url}
        width={images[currentImageIndex].attributes.width}
        height={images[currentImageIndex].attributes.height}
        alt="Dynamic"
      /> */}
    </motion.div>
  );
};

export default ProjectsImagesCard;
