import { getAbout } from "@/lib/about";
import BannerImageOrVideo from "@/components/BannerImageOrVideo";
import styles from "@/app/about/about.module.scss";
import AboutContent from "@/components/AboutContent";
import { notFound } from "next/navigation";

export const metadata = {
  title: "About",
  description:
    "Discover the captivating performances of Iokasti Mantzog: a Greek queer non-binary dancer, performer, and trainer based in Berlin.",
    alternates: { canonical: `/about` },
    keywords: "about, iokasti, mantzog, performer, dancer, trainer",
    openGraph: {
      title: "About",
      description: "Discover the captivating performances of Iokasti Mantzog: a Greek queer non-binary dancer, performer, and trainer based in Berlin.",
      images: [`/public/opengraph-image.jpg`],
    },
};

let CMS_URL;

if (process.env.NODE_ENV === 'development') {
  CMS_URL = process.env.NEXT_PUBLIC_ENV_VPS_SERVER_DEV;
} else  {
  CMS_URL = process.env.NEXT_PUBLIC_ENV_VPS_SERVER_PROD;
}

const About = async () => {
  const content = await getAbout();
  if (!content) notFound();
  const { mime, url, alternativeText, width, height } =
    content.images && content.images.attributes
      ? content.images.attributes
      : {};

  return (
    <>
      <section className={styles.header}>
        <BannerImageOrVideo
          mime={mime}
          src={CMS_URL + url}
          alt={alternativeText}
          width={width}
          height={height}
        />
        <h2 className={styles.banner}>{content.title}</h2>
      </section>
      <AboutContent content={content} />
    </>
  );
};

export default About;