import { getProject, getSlugsForProjects } from "@/lib/projects";
import BannerImageOrVideo from "@/components/BannerImageOrVideo";
import ProjectsImagesCard from "@/components/ProjectsImagesCard";
import styles from "@/app/about/about.module.scss";
import AboutContent from "@/components/AboutContent";
import { useLimitString } from "@/hooks/useLimitString";

const CMS_URL = process.env.NEXT_PUBLIC_ENV_VPS_SERVER;

export async function generateStaticParams() {
  // this will generate all the reviews paths on build. That means we don't have to rerender dynamic path component again
  const slugs = await getSlugsForProjects();
  return slugs.map((slug) => ({ slug }));
}

const ProjectPage = async ({ params }) => {
  const content = await getProject(params.title);
  const { mime, url, alternativeText, width, height } =
    content.images[0].attributes;
  const date = content.ending_date;

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
        <h2 className={styles.banner} title={content.title}>
          {useLimitString(content.title, 20)}
        </h2>
      </section>
      <ProjectsImagesCard images={content.images} />
      <AboutContent content={content} />
    </>
  );
};

export default ProjectPage;
