import Image from "next/image";
import styles from "@/components/bannerImageOrVideo.module.scss";
import Loading from "./Loading";

const BannerImageOrVideo = ({ cms, background }) => {
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
        <Image
          className={styles.banner}
          src={cms + background.url}
          alt={background.alt}
          width={background.width}
          height={background.height}
          // layout="fill"
          // objectFit="cover"
          // objectPosition="center"
        />
      )}
    </>
  );
};

export default BannerImageOrVideo;
