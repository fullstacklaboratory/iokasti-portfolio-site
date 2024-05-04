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

  // useEffect(() => {
  //   // Apply styles or additional logic after the content is loaded
  //   const imgElements = document.querySelectorAll('.content > img');

  //   imgElements.forEach((img) => {
  //     img.style.marginTop = '3rem';
  //     // Add any other styles you want to apply to the img element
  //   });
  // }, [content]);

  return (
    <article
      className={styles.content}
      dangerouslySetInnerHTML={{ __html: content.content.body }}
    ></article>
  );
};

export default AboutContent;
