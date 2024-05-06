"use client";
// Import hooks at the top
import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { useTransform, useScroll, motion } from "framer-motion";
import Lenis from "@studio-freight/lenis";
import useDimensions from "@/hooks/useDimensions";
import Modal from "./Modal";
import styles from "./instagram.module.scss";
import useLoadImages from "@/hooks/useLoadImages";

let CMS_URL;

if (process.env.NODE_ENV === 'development') {
  CMS_URL = process.env.NEXT_PUBLIC_ENV_VPS_SERVER_DEV;
} else {
  CMS_URL = process.env.NEXT_PUBLIC_ENV_VPS_SERVER_PROD;
}

const Instagram = ({ entries }) => {
  const container = useRef(null);
  const { height, width } = useDimensions();
  // const [imagesLoaded, setImagesLoaded] = useState(false);
  const [windowHeight, setWindowHeight] = useState(0);
  const [modalContent, setModalContent] = useState({
    url: null,
    width: null,
    height: null,
    alt: null,
  });

  // Use Lenis for smooth scroll
  useEffect(() => {
    const lenis = new Lenis();
    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
  }, []);

  const imagesLoaded = useLoadImages(entries, CMS_URL);

  useEffect(() => {
    setWindowHeight(window.innerHeight);
  }, [imagesLoaded]);

  const openModal = useCallback((entry) => {
    const { entryImage, entryAlternativeText, entryImageWidth, entryImageHeight, entryDescription } = entry;
    setModalContent({
      url: CMS_URL + entryImage,
      alt: entryAlternativeText,
      width: entryImageWidth,
      height: entryImageHeight,
      description: entryDescription
    });
  }, []);

  const closeModal = useCallback(() => {
    setModalContent({ url: null, alt: null, width: null, height: null });
  }, []);

  const numColumns = width <= 768 ? 2 : 4;
  const numImagesPerColumn = Math.ceil(entries.length / numColumns);
  const columns = Array.from({ length: numColumns }, (_, i) =>
    entries.slice(i * numImagesPerColumn, (i + 1) * numImagesPerColumn)
  );

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });

  const yValues = [
    useTransform(scrollYProgress, [0, 1], [0, windowHeight * 0.65]),
    useTransform(scrollYProgress, [0, 1], [0, windowHeight * 0]),
    useTransform(scrollYProgress, [0, 1], [0, windowHeight * 0.75]),
    useTransform(scrollYProgress, [0, 1], [0, windowHeight * 0]),
  ].slice(0, numColumns);

  return (
    <>
      {modalContent.url && (
        <Modal modalContent={modalContent} onClose={closeModal} />
      )}
      <div className={styles.spacer} />
      <motion.section
        ref={container}
        className={styles.image_gallery}
        style={{ minHeight: "100vh" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {imagesLoaded &&
          columns.map((columnEntries, i) => (
            <Column
              key={i}
              entries={columnEntries}
              y={imagesLoaded ? yValues[i] : 0}
              openModal={openModal}
            />
          ))}
      </motion.section>
      <div className={styles.spacer} />
    </>
  );
};

const Column = ({ entries, y = 0, openModal }) => {
  return (
    <motion.div style={{ y }} className={styles.gallery_column}>
      {entries.map((entry, index) => (
        <div
          key={index} // use uuid for unique key
          className={styles.imageContainer}
          onClick={() => openModal(entry)}
          role="button" // Add role="button" for accessibility
          tabIndex={0} // Add tabIndex={0} for keyboard accessibility
          aria-label={entry.entryTitle} // Add aria-label for accessibility
        >
          <div className={styles.overlay}>
            <div className={styles.overlay_text}>
              {entry.entryTitle && <h3>{entry.entryTitle}</h3>}
            </div>
          </div>
          {entry.entryMime.startsWith("video/") ? (
            <video
              src={CMS_URL + entry.entryImage}
              alt={entry.entryAlternativeText}
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
