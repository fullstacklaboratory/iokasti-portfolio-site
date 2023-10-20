import { getProjects } from "@/lib/projects";
import Image from "next/image";
import Link from "next/link";
import React from "react";


const Projects = async () => {
  const projects = await getProjects();

  const displayProjects = (cat) => {
    return projects.map((item, index) => {
      if (item.category === cat) {
        return (
          <li key={item.slug} className="flex">
            <Link href={`/projects/${item.slug}`}>
              {" "}
              <Image
                src={item.image}
                width="480"
                height="280"
                priority={index === 0}
                alt="image"
              />
            </Link>
            <div className="w-1/2 flex justify-evenly">
              <h1 className="text-center text-white text-4xl">{item.title}</h1>
              <p className="text-center text-white text-2xl">
                {item.description}
              </p>
            </div>
          </li>
        );
      }
    });
  };

  return (
    <div className="bg-gray-700 flex flex-col items-center">
      <h1 className="text-5xl text-center text-white">Projects</h1>
      <div>
        <ul className="flex flex-col gap-4 items-center">
          <h2 className="text-white text-4xl">Individual Projects</h2>
          {projects.map((item, index) => {
            return (
              <li
                key={item.slug}
                className={
                  index % 2 === 0
                    ? `flex-col flex  sm:flex-row sm:w-5/6`
                    : `flex-col sm:flex sm:flex-row-reverse sm:w-5/6 `
                }
              >
                <div className="w-full sm:w-5/6 ">
                  <h1 className="text-center text-white text-4xl mb-4">
                    {item.title}
                  </h1>
                  <Link href={`/projects/${item.slug}`} className="self-center">
                    <Image
                      src={item.image}
                      width="640"
                      height="280"
                      priority={index === 0}
                      alt="image"
                    />
                  
                  </Link>
                </div>
                <div className="w-full flex flex-col justify-evenly">
                  <p className="text-center text-white text-2xl">
                    {item.description}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Projects;
