"use client";
import styles from "./instagram.module.scss";
import Image from "next/image";
import { useTransform, useScroll, motion } from "framer-motion";
import { useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";
import useDimensions from "@/hooks/useDimensions";

const CMS_URL = process.env.NEXT_PUBLIC_ENV_VPS_SERVER;

const Instagram = ({ images }) => {
  const container = useRef(null);
  const { height } = useDimensions();

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, height * 2]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, height * 3.3]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, height * 1.25]);
  const y4 = useTransform(scrollYProgress, [0, 1], [0, height * 2.5]);

  useEffect(() => {
    const lenis = new Lenis();

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  return (
    <>
      <div className={`${styles.spacer}`}> </div>
      <section ref={container} className={styles.image_gallery}>
        <Column images={images.slice(0, 5)} y={y} />
        <Column images={images.slice(5, 10)} y={y2} />
        <Column images={images.slice(10, 15)} y={y3} />
        <Column images={images.slice(15, 20)} y={y4} />
      </section>
      <div className={`${styles.spacer}`}> </div>
    </>
  );
};

const Column = ({ images, y = 0 }) => {
  return (
    <motion.div style={{ y }} className={styles.gallery_column}>
      {images.map((src, index) => (
        <div key={index} className={styles.imageContainer}>
          <Image src={CMS_URL + src} fill alt="image" />
        </div>
      ))}
    </motion.div>
  );
};

export default Instagram;
