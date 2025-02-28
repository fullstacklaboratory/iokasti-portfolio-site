import Image from "next/image";
import { getProjectPage } from "@/lib/projects";
import styles from "@/components/bannerImageOrVideo.module.scss";
import Loading from "./Loading";

const BannerImageOrVideo = async ({ cms, background, loadingImage }) => {
  if (!background) {
    return null;
  }
  return (
    <>
      {typeof background === "string" ? (
        <>
          <Loading cms={cms} loadingImage={loadingImage} />
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
            // width={background.width}
            // height={background.height}
            layout="fill"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            objectPosition="center"
          />
        )
      )}
    </>
  );
};

export default BannerImageOrVideo;
