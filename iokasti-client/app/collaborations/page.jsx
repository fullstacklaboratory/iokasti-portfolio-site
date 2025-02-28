import styles from "@/app/projects/projects.module.scss";
import BannerImageOrVideo from "@/components/BannerImageOrVideo";
import ProjectPageSection from "@/components/ProjectPageSection";
import { germania } from "@/app/fonts";
import { getProjectsByCategory, getProjectPage } from "@/lib/projects";

let CMS_URL;

if (process.env.NODE_ENV === "development") {
  CMS_URL = process.env.NEXT_PUBLIC_ENV_VPS_SERVER_DEV;
} else {
  CMS_URL = process.env.NEXT_PUBLIC_ENV_VPS_SERVER_PROD;
}

export const metadata = {
  title: "collaborations",
  description:
    "Engage with collaborations featuring Iokasti Mantzog: a Greek queer non-binary dancer, performer, and trainer based in Berlin.",
  alternates: { canonical: `/collaborations` },
  keywords: "collaborations, iokasti, mantzog, performer, dancer, trainer",
  openGraph: {
    title: "collaborations",
    description:
      "Engage with collaborations featuring Iokasti Mantzog: a Greek queer non-binary dancer, performer, and trainer based in Berlin.",
    images: [`/public/opengraph-image.jpg`],
  },
};

const Collabs = async () => {
  const header = await getProjectPage();
  const { loadingImage } = await getProjectPage();
  const collabs = await getProjectsByCategory("collaboration");
  // const { mime, url, alternativeText, width, height } =
  //   header.banner[1].attributes;

  return (
    <>
      <section className={styles.header}>
        <BannerImageOrVideo
          cms={CMS_URL}
          background={
            header.collab_video || header.collab_Image.data.attributes
          }
          loadingImage={loadingImage}
        />
        <h2 className={`${styles.banner} ${germania.className}`}>
          Collaborations
        </h2>
      </section>
      <ProjectPageSection projects={collabs} />
    </>
  );
};

export default Collabs;
