import { getAbout } from "@/lib/about";
import { getProjectPage } from "@/lib/projects";
import BannerImageOrVideo from "@/components/BannerImageOrVideo";
import styles from "@/app/about/about.module.scss";
import AboutContent from "@/components/AboutContent";
import { notFound } from "next/navigation";
import { bokor, germania } from "@/app/fonts";

export const metadata = {
  title: "About",
  description:
    "About",
  alternates: { canonical: `/about` },
  keywords: "about, iokasti, mantzog, performer, dancer, trainer, pilates",
  openGraph: {
    title: "About",
    description:
      "About",
    images: [`/public/opengraph-image.jpg`],
  },
};

let CMS_URL;

if (process.env.NODE_ENV === "development") {
  CMS_URL = process.env.NEXT_PUBLIC_ENV_VPS_SERVER_DEV;
} else {
  CMS_URL = process.env.NEXT_PUBLIC_ENV_VPS_SERVER_PROD;
}

const About = async () => {
  const content = await getAbout();
  const { loadingImage } = await getProjectPage();
  if (!content) notFound();

  return (
    <>
      <section className={styles.header}>
        <BannerImageOrVideo
          cms={CMS_URL}
          background={content.videoUrl}
          loadingImage={loadingImage}
        />
        <h2 className={`${styles.banner} ${germania.className}`}>
          {content.title}
        </h2>
      </section>
      <AboutContent content={content} />
    </>
  );
};

export default About;
