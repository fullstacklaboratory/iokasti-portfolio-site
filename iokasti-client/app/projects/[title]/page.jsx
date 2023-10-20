import { getProject, getSlugs } from "@/lib/projects";
import Image from "next/image";
import React from "react";

const CMS_URL = process.env.NEXT_PUBLIC_ENV_VPS_SERVER;


export async function generateStaticParams() {
  // this will generate all the reviews paths on build. That means we don't have to rerender dynamic path component again
  const slugs = await getSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function ProjectPage({ params }) {
  const project = await getProject(params.title);
  return (
    <div>
      <h1>{project.title}</h1>
      <Image src={project.bannerImage} width="480" height="280" alt="image" />
      <article
        dangerouslySetInnerHTML={{ __html: project.body }}
        className="text-3xl"
      ></article>

      <h2>Carousel</h2>
      {project.images.map((item) => {
        return (
          <Image
            src={CMS_URL + item.attributes.url}
            width="280"
            height="180"
            alt="image"
          />
        );
      })}
    </div>
  );
}
