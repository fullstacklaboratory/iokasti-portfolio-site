//COLLABS

import { getCollabs, getProjectPage } from "@/lib/projects";
import BannerImageOrVideo from "@/components/BannerImageOrVideo";
import styles from "@/app/projects/projects.module.scss";
import ProjectPageSection from "@/components/ProjectPageSection";
const CMS_URL = process.env.NEXT_PUBLIC_ENV_VPS_SERVER;

const Collabs = async () => {
  const header = await getProjectPage();
  const projects = await getCollabs();
  console.log(projects)
  const { mime, url, alternativeText, width, height } = header.banner[1].attributes;

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
        <h2 className={styles.banner}>Collaborations</h2>
      </section>
      <ProjectPageSection projects={projects} />
    </>
  );
};

export default Collabs;
