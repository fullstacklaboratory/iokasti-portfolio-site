"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "@/components/loading.module.scss";
import LoadingAnim from "./LoadingAnim";

const Loading = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setIsVisible(false), 5000); // Display for at least 5 seconds
    return () => clearTimeout(timeout);
  }, []);

  if (!isVisible) return null;

  return (
    <div className={styles.text_container}>
      <Image
        src={"/photo_2025-02-21_15-01-57.jpg"}
        layout="fill"
        objectFit="cover"
      />
      {/* <LoadingAnim /> */}
    </div>
  );
};

export default Loading;
