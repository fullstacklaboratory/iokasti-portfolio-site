import Image from "next/image";
import styles from "@/components/bannerImageOrVideo.module.scss";
import Loading from "./Loading";

const BannerImageOrVideo = ({ cms, background }) => {

  if (!background) {
    return null;
  }
  return (
    <>
      {typeof background === "string" ? (
        <>
          <Loading />
          <div className={styles.videoBackground}>
            <div>
              <iframe
                src={background + "?background=1"}
                frameBorder="0"
                allow="autoplay; fullscreen"
              ></iframe>
            </div>
          </div>
        </>
      ) : (
        background.url && (
          <Image
            className={styles.banner}
            src={cms + background.url}
            alt={background.alt || "image"}
            width={background.width || 1920}
            height={background.height || 1080}
            // layout="fill"
            // objectFit="cover"
            // objectPosition="center"
          />
        )
      )}
    </>
  );
};

export default BannerImageOrVideo;
