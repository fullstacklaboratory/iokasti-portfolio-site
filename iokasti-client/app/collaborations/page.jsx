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
  description: "Projects and collaborations",
  alternates: { canonical: `/collaborations` },
  keywords: "collaborations, iokasti, mantzog, performer, dancer, trainer",
  openGraph: {
    title: "collaborations",
    description: "Projects and collaborations",
    images: [`/public/opengraph-image.jpg`],
  },
};

const Collabs = async () => {
  try {
    const header = await getProjectPage();
    const { loadingImage } = await getProjectPage();
    const collabs = await getProjectsByCategory("collaboration");

    const background =
      header.collab_video ||
      (header.collab_Image &&
        header.collab_Image.data &&
        header.collab_Image.data.attributes);

    return (
      <>
        <section className={styles.header}>
          <BannerImageOrVideo
            cms={CMS_URL}
            background={background}
            loadingImage={loadingImage}
          />
          <h2 className={`${styles.banner} ${germania.className}`}>
            Collaborations
          </h2>
        </section>
        <ProjectPageSection projects={collabs} />
      </>
    );
  } catch (error) {
    console.error(`Error in Collabs: ${error.message}`);
    return (
      <div className={styles.error}>
        <h1>Error loading content</h1>
        <p>There was an error loading the content. Please try again later.</p>
      </div>
    );
  }
};

export default Collabs;
