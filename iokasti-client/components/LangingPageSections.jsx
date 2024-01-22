"use client";
import styles from "./landPageSections.module.scss";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState, variants } from "react";

const CMS_URL = process.env.NEXT_PUBLIC_ENV_VPS_SERVER;

const LandingPageSections = ({ sections }) => {


    const  myVariants = {
        offscreen: {
          opacity: 0,
          scale : 0.5
        },
        onscreen: {
          opacity: 1,
          scale : 1,
          transition: {
            type: "ease",
            bounce: 0.4,
            duration: 1.2
          }
        }
      };



  const [index, setIndex] = useState(0);
  const [isIntervalActive, setIsIntervalActive] = useState(false);

  const newData = sections.map((section) => ({
    ...section,
    home_section_image: section.home_section_image.data.map(
      (item) => item.attributes.url
    ),
  }));

  console.log(newData);

  useEffect(() => {
    const intervalFunction = () => {
      if (index === newData[0].home_section_image.length - 1) {
        setIndex(0);
      } else {
        setIndex((curr) => curr + 1);
      }
    };

    const interval = isIntervalActive && setInterval(intervalFunction, 2000);

    return () => {
      clearInterval(interval);
    };
  }, [index, isIntervalActive]);

  const stopInterval = () => {
    setIsIntervalActive(false);
  };

  return (
    <>
      {newData.map((section) => {
        return (
          <div
            className={
              section.align_content === "right"
                ? `${styles.section} ${styles.reverse}`
                : `${styles.section} ${styles.no_reverse}`
            }
          >
            <div className={`${styles.content}`}>
              <h2>{section.title}</h2>
              <p>{section.home_section_description}</p>
            </div>
            <motion.div className={`${styles.imageContainer}`}
             whileHover={{ scale: 1.02 }}
             initial="offscreen"
             whileInView="onscreen"
             viewport={{ once: true, amount: 0.8 }}
             variants={myVariants}
             onMouseOver={() => setIsIntervalActive(false)}
             onMouseLeave={() => setIsIntervalActive(true)}
             key={index}>
              <Image
                width={380}
                height={480}
                src={CMS_URL + section.home_section_image[index]}
               
              />
            </motion.div>
          </div>
        );
      })}
    </>
  );
};

export default LandingPageSections;
