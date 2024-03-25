import { useState, useEffect } from "react";

const useLoadImages = (entries, CMS_URL) => {
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    const loadImages = async () => {
      try {
        await Promise.all(
          entries.map((entry) => {
            return new Promise((resolve, reject) => {
              const img = new window.Image();
              img.src = CMS_URL + entry.entryImage;
              img.onload = resolve;
              img.onerror = reject;
            });
          })
        );
        setImagesLoaded(true);
      } catch (error) {
        console.error("Failed to load images", error);
      }
    };
    loadImages();
  }, [entries, CMS_URL]);

  return imagesLoaded;
};

export default useLoadImages;