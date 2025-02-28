import { getProjectsByCategory, getProjectPage } from "@/lib/projects";
import BannerImageOrVideo from "@/components/BannerImageOrVideo";
import styles from "@/app/projects/projects.module.scss";
import ProjectPageSection from "@/components/ProjectPageSection";
import { bokor, germania } from "@/app/fonts";

let CMS_URL;

if (process.env.NODE_ENV === "development") {
  CMS_URL = process.env.NEXT_PUBLIC_ENV_VPS_SERVER_DEV;
} else {
  CMS_URL = process.env.NEXT_PUBLIC_ENV_VPS_SERVER_PROD;
}

export const metadata = {
  title: "Projects",
  description:
    "Projects",
  alternates: { canonical: `/projects` },
  keywords: "projects, iokasti, mantzog, performer, dancer, trainer",
  openGraph: {
    title: "Projects",
    description:
      "Projects",
    images: [`/public/opengraph-image.jpg`],
  },
};

const Projects = async () => {
  const header = await getProjectPage();
  const { loadingImage } = await getProjectPage();
  const projects = await getProjectsByCategory("project");

  return (
    <>
      <section className={styles.header}>
        <BannerImageOrVideo
          cms={CMS_URL}
          background={
            header.project_video || header.project_Image.data.attributes
          }
          loadingImage={loadingImage}
        />
        <h2
          className={`${styles.banner} ${germania.className}`}
          title="Projects"
        >
          Projects
        </h2>
      </section>
      <ProjectPageSection projects={projects} />
    </>
  );
};

export default Projects;
