import Image from "next/image";
import styles from "@/components/bannerImageOrVideo.module.scss";

const BannerImageOrVideo = ({ mime, src, alt, width, height }) => {
  return mime.startsWith("video/") ? (
    <video className={styles.banner} autoPlay loop muted background="true">
      <source src={src} alt={alt} type={mime} />
      Your browser does not support videos. Please use a modern browser.
    </video>
  ) : mime.startsWith("image/") ? (
    <Image
      className={styles.banner}
      src={src}
      alt={alt}
      width={width}
      height={height}
    />
  ) : null;
};

export default BannerImageOrVideo;
