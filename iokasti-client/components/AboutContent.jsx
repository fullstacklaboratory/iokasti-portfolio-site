"use client";
import styles from "@/app/about/about.module.scss";
import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";

const AboutContent = (content) => {
  useEffect(() => {
    const lenis = new Lenis();

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);
  return (
    <article
      className={styles.content}
      dangerouslySetInnerHTML={{ __html: content.content.body }}
    ></article>
  );
};

export default AboutContent;
