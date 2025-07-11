import {
  getProject,
  getSlugsForProjects,
  getProjectPage,
} from "@/lib/projects";
import BannerImageOrVideo from "@/components/BannerImageOrVideo";
import styles from "@/app/about/about.module.scss";
import AboutContent from "@/components/AboutContent";
import { useLimitString } from "@/hooks/useLimitString";
import { notFound } from "next/navigation";
import { germania } from "@/app/fonts";

let CMS_URL;

if (process.env.NODE_ENV === "development") {
  CMS_URL = process.env.NEXT_PUBLIC_ENV_VPS_SERVER_DEV;
} else {
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
  const { loadingImage } = await getProjectPage();
  const content = await getProject(params.title);

  if (!content) {
    return notFound();
  }

  const limitedTitle = useLimitString(content.title, 20);
  const backgroundVideo = content.video_link;
  const backgroundImage = content.images[0]?.attributes;
  const date = content.ending_date;

  const background = backgroundVideo ? backgroundVideo : backgroundImage;

  return (
    <>
      <section className={styles.header}>
        <BannerImageOrVideo
          cms={CMS_URL}
          background={background}
          loadingImage={loadingImage}
        />
        <h2 className={`${styles.banner} ${germania.className}`}>
          {limitedTitle}
        </h2>
      </section>
      <AboutContent content={content} />
    </>
  );
};

export default ProjectPage;
