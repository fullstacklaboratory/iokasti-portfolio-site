import { getProject, getSlugsForProjects } from "@/lib/projects";
import BannerImageOrVideo from "@/components/BannerImageOrVideo";
// import ProjectsImagesCard from "@/components/ProjectsImagesCard";
import styles from "@/app/about/about.module.scss";
import AboutContent from "@/components/AboutContent";
import { useLimitString } from "@/hooks/useLimitString";
import { notFound } from "next/navigation";

let CMS_URL;

if (process.env.NODE_ENV === 'development') {
  CMS_URL = process.env.NEXT_PUBLIC_ENV_VPS_SERVER_DEV;
} else  {
  CMS_URL = process.env.NEXT_PUBLIC_ENV_VPS_SERVER_PROD;
}

export const generateMetadata = async ({ params }) => {
  try {
    const content = await getProject(params.title);
    const { url } = content.images[0].attributes;
    if (!content)
      return {
        title: "Project not found",
        description: "This project does not exist",
      };
    return {
      title: content.title,
      description: content.description,
      alternates: { canonical: `/projects/${content.slug}` },
      keywords: "projects, iokasti, portfolio",
      openGraph: {
        title: content.title,
        description: content.description,
        images: [`${CMS_URL}${url}`],
      },
    };
  } catch (error) {
    console.error(error);
    return {
      title: "Project not found",
      description: "This project does not exist",
    };
  }
};

export const generateStaticParams = async () => {
  // this will generate all the reviews paths on build. That means we don't have to rerender dynamic path component again
  const slugs = await getSlugsForProjects();
  return slugs.map((slug) => ({ slug }));
};

const ProjectPage = async ({ params }) => {
  try {
    const content = await getProject(params.title);
    if (!content) {
      throw new Error("No data received from CMS");
    }
    const limitedTitle = useLimitString(content.title, 20);
    const { mime, url, alternativeText, width, height } =
      content.images[0]?.attributes;
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
            {limitedTitle}
          </h2>
        </section>
        {/* <ProjectsImagesCard images={content.images} /> */}
        <AboutContent content={content} />
      </>
    );
  } catch (error) {
    console.error(`Error in ProjectPage: ${error.message}`);
    return notFound();
  }
};

export default ProjectPage;
