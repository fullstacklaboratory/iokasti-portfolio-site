"use client";
import styles from "./instagram.module.scss";
import Image from "next/image";
import { useTransform, useScroll, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Lenis from "@studio-freight/lenis";
import useDimensions from "@/hooks/useDimensions";
import BannerImageOrVideo from "./BannerImageOrVideo";
import Modal from "./Modal";

const CMS_URL = process.env.NEXT_PUBLIC_ENV_VPS_SERVER;

const truncate = (str, n) => {
  return str.length > n ? str.substr(0, str.lastIndexOf(" ", n)) + "..." : str;
};

const Instagram = ({ entries }) => {
  const [modalImageUrl, setModalImageUrl] = useState({
    url: null,
    width: null,
    height: null,
    alt: null,
  });

  const openModal = (url, alt, width, height) => {
    console.log("url ", url);
    console.log("url ");
    setModalImageUrl({
      url: url,
      alt: alt,
      width: width,
      height: height,
    });
  };

  const closeModal = () => {
    setModalImageUrl({
      url: null,
      alt: null,
      width: null,
      height: null,
    });
  };
  const container = useRef(null);
  const { height, width } = useDimensions();

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, height * -0.5]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, height * 0.65]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, height * -0.75]);
  const y4 = useTransform(scrollYProgress, [0, 1], [0, height * 0]);

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
      {modalImageUrl.url ? (
        <Modal modalImageUrl={modalImageUrl} onClose={closeModal} />
      ) : null}
      <div className={`${styles.spacer}`}> </div>
      <section ref={container} className={styles.image_gallery}>
        <Column
          entries={entries.slice(0, 5)}
          y={width <= 768 ? y : y}
          openModal={openModal}
        />
        <Column
          entries={entries.slice(5, 10)}
          y={width <= 768 ? y4 : y2}
          openModal={openModal}
        />
        <Column
          entries={entries.slice(10, 15)}
          y={width <= 768 ? y : y3}
          openModal={openModal}
        />
        <Column
          entries={entries.slice(15, 20)}
          y={width <= 768 ? y4 : y4}
          openModal={openModal}
        />
      </section>
      <div className={`${styles.spacer}`}> </div>
    </>
  );
};

const Column = ({ entries, y = 0, openModal }) => {
  return (
    <motion.div style={{ y }} className={styles.gallery_column}>
      {entries.map((entry, index) => (
        <div
          key={index}
          className={styles.imageContainer}
          onClick={() =>
            openModal(
              CMS_URL + entry.entryImage,
              entry.entryAlternativeText,
              entry.entryImageWidth,
              entry.entryImageHeight
            )
          }
        >
          <div className={styles.overlay}>
            <div
              className={styles.overlay_text}
              role="button" // Add role="button" for accessibility
              tabIndex={0} // Add tabIndex={0} for keyboard accessibility
            >
              <h3>{entry.entryTitle}</h3>
              {entry.entryDescription && (
                <p>{truncate(entry.entryDescription, 180)}</p>
              )}
              {/* <p>{entry.entryDate}</p> */}
            </div>
          </div>
          {entry.entryMime.startsWith("video/") ? (
            <video
              src={CMS_URL + entry.entryImage}
              alt={entry.entryAlternativeText}
              // autoPlay
              loop
              muted
              background="true"
            />
          ) : entry.entryMime.startsWith("image/") ? (
            <Image
              src={CMS_URL + entry.entryImage}
              width={entry.entryImageWidth}
              height={entry.entryImageHeight}
              alt={entry.entryAlternativeText}
            />
          ) : null}
        </div>
      ))}
    </motion.div>
  );
};

export default Instagram;
