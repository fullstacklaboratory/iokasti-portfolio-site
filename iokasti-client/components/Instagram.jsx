"use client";

import { Suspense, useState, useEffect } from "react";
import Image from "next/image";
import BannerImageOrVideo from "@/components/BannerImageOrVideo";
import Modal from "./Modal";
import styles from "./instagram.module.scss";
import Lenis from "@studio-freight/lenis";

const CMS_URL =
  process.env.NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_ENV_VPS_SERVER_DEV
    : process.env.NEXT_PUBLIC_ENV_VPS_SERVER_PROD;

const Instagram = ({ entries }) => {
  const [modalContent, setModalContent] = useState(null);

  // Use Lenis for smooth scroll
  useEffect(() => {
    const lenis = new Lenis();
    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      document.documentElement.style.setProperty("--scroll", scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const openModal = (entry) => {
    const {
      entryImage,
      entryAlternativeText,
      entryImageWidth,
      entryImageHeight,
      entryDescription,
    } = entry;
    setModalContent({
      url: CMS_URL + entryImage,
      alt: entryAlternativeText,
      width: entryImageWidth,
      height: entryImageHeight,
      description: entryDescription,
    });
  };

  const closeModal = () => {
    setModalContent(null);
  };

  return (
    <>
      {modalContent && (
        <Modal modalContent={modalContent} onClose={closeModal} />
      )}
      <div className={styles.spacer} />
      <section className={styles.image_gallery}>
        <Suspense fallback={<div>Loading...</div>}>
          {entries.map((entry, index) => (
            <div
              key={entry.id || index}
              className={`${styles.imageContainer} ${
                index % 2 === 0 ? styles.parallax : ""
              }`}
              onClick={() => openModal(entry)}
              role="button"
              tabIndex={0}
              aria-label={entry.entryTitle}
            >
              <div className={styles.overlay}>
                <div className={styles.overlay_text}>
                  {entry.entryTitle && <div>{entry.entryTitle}</div>}
                </div>
              </div>
              {console.log(entry)}
              <BannerImageOrVideo cms={CMS_URL} background={entry.backround} />
            </div>
          ))}
        </Suspense>
      </section>
      <div className={styles.spacer} />
    </>
  );
};

export default Instagram;
