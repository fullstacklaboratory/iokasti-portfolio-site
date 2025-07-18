"use client";
import Image from "next/image";
import Link from "next/link";
import styles from "@/components/projectCard.module.scss";
import { useLimitString } from "@/hooks/useLimitString";
import { useTransform, motion, useScroll } from "framer-motion";
import { useRef } from "react";
import { lora } from "@/app/fonts.js";


let CMS_URL;

if (process.env.NODE_ENV === "development") {
  CMS_URL = process.env.NEXT_PUBLIC_ENV_VPS_SERVER_DEV;
} else {
  CMS_URL = process.env.NEXT_PUBLIC_ENV_VPS_SERVER_PROD;
}

const ProjectCard = ({
  i,
  title,
  description,
  images,
  slug,
  category,
  progress,
  range,
  targetScale,
  width,
}) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "start start"],
  });

  const useLimitDescription = useLimitString(description, 160);

  const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1]);
  const scale = useTransform(progress, range, [1, targetScale]);

  // Check if dimensions and content have arrived

  return (
    <div ref={container} className={`${styles.cardContainer} ${lora.className}`}>
      <motion.div
        // initial={false}
        style={{
          // backgroundColor: "yellow",
          scale,
          top:
            width < 431
              ? `calc(8vh + ${i * 25}px)`
              : `calc(-5vh + ${i * 25}px)`,
        }}
        className={styles.card}
      >
        <Link href={`/${category}s/${slug}`}>
          <h3>{title}</h3>
          <div className={styles.body}>
            <div className={styles.description}>
              <p>{useLimitDescription}</p>
              <span>
                Read more
                <svg
                  width="22"
                  height="12"
                  viewBox="0 0 22 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21.5303 6.53033C21.8232 6.23744 21.8232 5.76256 21.5303 5.46967L16.7574 0.696699C16.4645 0.403806 15.9896 0.403806 15.6967 0.696699C15.4038 0.989592 15.4038 1.46447 15.6967 1.75736L19.9393 6L15.6967 10.2426C15.4038 10.5355 15.4038 11.0104 15.6967 11.3033C15.9896 11.5962 16.4645 11.5962 16.7574 11.3033L21.5303 6.53033ZM0 6.75L21 6.75V5.25L0 5.25L0 6.75Z"
                    fill="black"
                  />
                </svg>
              </span>
            </div>

            <div className={styles.imageContainer}>
              <motion.div
                className={styles.inner}
                style={{ scale: imageScale }}
              >
                <Image
                  width={images[0].attributes.width}
                  height={images[0].attributes.height}
                  src={`${CMS_URL}${images[0].attributes.url}`}
                  alt="image"
                />
              </motion.div>
            </div>
          </div>
        </Link>
      </motion.div>
    </div>
  );
};

export default ProjectCard;
