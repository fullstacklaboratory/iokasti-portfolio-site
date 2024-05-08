"use client";
import styles from "@/components/projectPageSection.module.scss";
import ProjectCard from "@/components/ProjectCard";
import { useScroll } from "framer-motion";
import { Suspense, useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";
import useDimensions from "@/hooks/useDimensions";

const ProjectPageSection = ({ projects }) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const lenis = new Lenis();

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  });

  const { width, height } = useDimensions();

  return (
    <Suspense
      fallback={
        <div className={"text-white flex justify-center items-center"}>
          Loading...
        </div>
      }
    >
      {width && (
        <section ref={container} className={styles.card_container}>
          {projects.map((project, i) => {
            const targetScale = 1 - (projects.length - i) * 0.05;
            return (
              <ProjectCard
                key={`p_${i}`}
                i={i}
                {...project}
                width={width}
                progress={scrollYProgress}
                range={[0, 1]}
                targetScale={targetScale}
                slug={project.slug}
                category={project.category}
              />
            );
          })}
        </section>
      )}
    </Suspense>
  );
};

export default ProjectPageSection;
