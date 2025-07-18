"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "@/components/loading.module.scss";
import LoadingAnim from "./LoadingAnim";

const Loading = ({ cms, loadingImage }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setIsVisible(false), 5000); // Display for at least 5 seconds
    return () => clearTimeout(timeout);
  }, []);

  if (!isVisible) return null;

  return (
    <div className={styles.text_container}>
      <Image
        src={`${cms}${loadingImage.url}`}
        alt={loadingImage.alt || "Loading image"}
        layout="fill"
        objectFit="cover"
      />
      <LoadingAnim />
    </div>
  );
};

export default Loading;
