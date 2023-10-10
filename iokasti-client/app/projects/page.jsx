import { getProjects } from "@/lib/projects";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Projects = async () => {
  const projects = await getProjects();
  return (
    <div className="bg-gray-700 flex flex-col items-center">
      <h1 className="text-4xl text-center text-white">Projects</h1>
      <ul className="flex flex-col w-10/12 gap-4 items-center">
        {projects.map((item, index) => {
          return (
            <li
              key={item.title}
              className={` justify-between  w-full flex ${
                index % 2 === 0 && "flex-row-reverse"
              }`}
            >
              <Link href={`/projects/${item.title}`}>
                {" "}
                <Image
                  src={item.image}
                  width="480"
                  height="280"
                  priority={index === 0}
                  alt="image"
                 
                />
              </Link>
              <div>
                <h1 className="text-center text-white text-4xl">
                  {item.title}
                </h1>
                <p className="text-center text-white text-3xl">
                  {item.description}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Projects;
