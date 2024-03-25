//PROJECTS LIST PAGE

import { getProjects, getProjectPage } from "@/lib/projects";
import BannerImageOrVideo from "@/components/BannerImageOrVideo";
import styles from "@/app/projects/projects.module.scss";
import ProjectPageSection from "@/components/ProjectPageSection";

const CMS_URL = process.env.NEXT_PUBLIC_ENV_VPS_SERVER;

const Projects = async () => {
  const header = await getProjectPage();
  const projects = await getProjects();
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
