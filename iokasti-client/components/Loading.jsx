"use client";
import { useEffect, useState } from "react";
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
      <LoadingAnim />
    </div>
  );
};

export default Loading;
