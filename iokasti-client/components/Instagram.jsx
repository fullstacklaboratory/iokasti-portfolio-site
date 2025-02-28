"use client";

import { Suspense, useState, useEffect } from "react";
import BannerImageOrVideo from "@/components/BannerImageOrVideo";
import Modal from "./Modal";
import styles from "./instagram.module.scss";
import Lenis from "@studio-freight/lenis";
import { lora } from "@/app/fonts.js";

const Instagram = ({ cms, entries, loadingImage }) => {
  console.log("instagram", cms);
  const [modalContent, setModalContent] = useState(null);

  // Use Lenis for smooth scroll
  useEffect(() => {
    const lenis = new Lenis();
    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
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
      entryVideoUrl,
    } = entry;
    setModalContent({
      url: entryVideoUrl ? entryVideoUrl : cms + entryImage,
      alt: entryAlternativeText,
      width: entryImageWidth,
      height: entryImageHeight,
      description: entryDescription,
      isVideo: !!entryVideoUrl,
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
                <div className={`${styles.overlay_text} ${lora.className}`}>
                  {entry.entryTitle && <div>{entry.entryTitle}</div>}
                </div>
              </div>
              <BannerImageOrVideo
                cms={cms}
                background={entry && entry.background}
                loadingImage={loadingImage}
              />
            </div>
          ))}
        </Suspense>
      </section>
      <div className={styles.spacer} />
    </>
  );
};

export default Instagram;
