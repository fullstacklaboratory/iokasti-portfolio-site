import { getProjectsByCategory, getProjectPage } from "@/lib/projects";
import BannerImageOrVideo from "@/components/BannerImageOrVideo";
import styles from "@/app/projects/projects.module.scss";
import ProjectPageSection from "@/components/ProjectPageSection";

let CMS_URL;

if (process.env.NODE_ENV === 'development') {
  CMS_URL = process.env.NEXT_PUBLIC_ENV_VPS_SERVER_DEV;
} else  {
  CMS_URL = process.env.NEXT_PUBLIC_ENV_VPS_SERVER_PROD;
}

export const metadata = {
  title: "Projects",
  description:
    "Explore the dynamic projects of Iokasti Mantzog: a Greek queer non-binary dancer, performer, and trainer based in Berlin.",
  alternates: { canonical: `/projects` },
  keywords: "projects, iokasti, mantzog, performer, dancer, trainer",
  openGraph: {
    title: "Projects",
    description:
      "Explore the dynamic projects of Iokasti Mantzog: a Greek queer non-binary dancer, performer, and trainer based in Berlin.",
    images: [`/public/opengraph-image.jpg`],
  },
};

const Projects = async () => {
  const header = await getProjectPage();
  const projects = await getProjectsByCategory("project");
  const { mime, url, alternativeText, width, height } =
    header.banner[0].attributes;

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
        <h2 className={styles.banner} title="Projects">
          Projects
        </h2>
      </section>
      <ProjectPageSection projects={projects} />
    </>
  );
};

export default Projects;
