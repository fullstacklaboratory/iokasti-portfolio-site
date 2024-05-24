import Image from "next/image";
import styles from "@/components/bannerImageOrVideo.module.scss";

const BannerImageOrVideo = ({ videoUrl }) => {
  console.log("videoUrl", videoUrl);
  return (
    <div className={styles.videoBackground}>
      <div>
        <iframe
          src={videoUrl + "?autopause=0&autoplay=1&byline=0&controls=0&loop=1&muted=1&portrait=0&title=0"}
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen"
        ></iframe>
      </div>
    </div>
  );
};

export default BannerImageOrVideo;


