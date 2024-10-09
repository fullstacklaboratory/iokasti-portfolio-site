import Image from "next/image";
import styles from "@/components/bannerImageOrVideo.module.scss";

const BannerImageOrVideo = ({cms, background}) => {
  console.log("background", background);
  return (
    <>
      {typeof background === "string" ? (
        <div className={styles.videoBackground}>
          <div>
            <iframe
              src={
                background +
                "?autopause=0&autoplay=1&byline=0&controls=0&loop=1&muted=1&portrait=0&title=0"
              }
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen"
            ></iframe>
          </div>
        </div>
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
