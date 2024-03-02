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
  // console.log(content.images)
  const { mime, url, alternativeText, width, height } =
    content.images[0].attributes;
  const date = content.ending_date;

  return (
    <>
      <section className={styles.header}>
        {/* <ProjectsImagesCard images={content.images} /> */}
        
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

// return (
//   <div className="text-white">
//     <h1>{project.title}</h1>
//     {/* <Image src={project.bannerImage} width="480" height="280" alt="image" /> */}
//     <article
//       dangerouslySetInnerHTML={{ __html: project.body }}
//       className="text-3xl"
//     ></article>
//     <h1>dates</h1>
//     <p>
//       from : {new Date(project.starting_date).toLocaleDateString()} to{" "}
//       {new Date(project.ending_date).toLocaleDateString()}
//     </p>
//     {project.video_link && (
//       <iframe
//         src={`https://player.vimeo.com/video/${
//           project.video_link.split("/")[3]
//         }?h=a7b727b73e&color=ffffff&title=0&byline=0&portrait=0&badge=0`}
//         width="640"
//         height="360"
//         frameborder="0"
//         allow="autoplay; fullscreen; picture-in-picture"
//         allowfullscreen
//       ></iframe>
//     )}

//     <h2>Carousel</h2>
//     {project.images.map((item) => {
//       return (
//         <Image
//           src={CMS_URL + item.attributes.url}
//           width="280"
//           height="180"
//           alt="image"
//         />
//       );
//     })}
//   </div>
// );
