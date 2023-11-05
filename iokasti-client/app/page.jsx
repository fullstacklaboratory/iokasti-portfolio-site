import { Suspense } from "react";
import { getLandingPage, getNewsData } from "@/lib/landingPage";
import Link from "next/link";
import Image from "next/image";
import LoadingAnim from "@/components/loadingAnim";
import { motion } from "framer-motion";
import "./globals.css";
import NewsSlide from "@/components/NewsSlide";

const CMS_URL = process.env.NEXT_PUBLIC_ENV_VPS_SERVER;

export default async function Home() {
  const data = await getLandingPage();
  const news = await getNewsData();
  console.log("News", news);
  const landingpageData = data.data.attributes;

  if (!data.error) {
    return (
      <>
        <div className="text-white">
          <section className="min-h-screen pt-[5rem] snap-start">
            <h2 className="absolute bottom-14 left-8 z-10 text-5xl">
              Who's Iokasti?
            </h2>
            <Suspense
              fallback={
                <div className="w-full h-screen flex justify-center items-center z-50">
                  <LoadingAnim />
                </div>
              }
            >
              <video className="banner-video" autoPlay loop muted>
                <source
                  src={CMS_URL + landingpageData.video.data[0].attributes.url}
                  alt={landingpageData.video.data[0].attributes.alternativeText}
                  type="video/webm"
                />
                Your browser does not support videos. Please use a modern
                browser.
              </video>
            </Suspense>
          </section>

          {/* Home page sections */}

          {landingpageData.sections &&
            landingpageData.sections.map((section) => {
              const sectionImage = section.home_section_image.data.attributes;
              {
                console.log(section.home_section_description);
              }
              return (
                <section
                  key={section.id}
                  className="min-h-screen pt-[5rem] pb-[5rem]  snap-start flex flex-col justify-center items-center relative "
                >
                  <div className="flex flex-col items-start w-[33%]">
                    <h2 className="text-5xl">{section.title}</h2>
                    <h3>{section.subtitle}</h3>
                    <div className="flex flex-row flex-wrap">
                      <p>{section.home_section_description}</p>
                      <Image
                        src={CMS_URL + sectionImage.url}
                        width="500"
                        height="600"
                        alt={sectionImage.alternativeText}
                      />
                    </div>

                    <Link href={`/${section.home_section_url}`}>
                      See their projects
                    </Link>
                  </div>
                </section>
              );
            })}
        </div>
        {news.map((item) => {
          return <NewsSlide item={item}/>;
        })}
      </>
    );
  } else {
    return <div className="text-white">{data.error}</div>;
  }
}

{
  /* Iframe video embed example code
  <div style={{ padding: "56.25% 0 0 0", position: "relative" }}>
          <iframe
            src="https://player.vimeo.com/video/368412716?h=9e28e76ddd&autoplay=1&loop=1&autopause=0&muted=1&background=1"
            style={{
              position: "absolute",
              top: "0",
              left: "0",
              width: "100%",
              height: "100%",
            }}
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
          ></iframe> 
          </div>*/
}
