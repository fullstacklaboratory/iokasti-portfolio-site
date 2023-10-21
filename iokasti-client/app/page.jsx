import { Suspense } from "react";
import { getLandPage, getLandingPage } from "@/lib/landpage";
import Link from "next/link";
import Image from "next/image";

const CMS_URL = process.env.NEXT_PUBLIC_ENV_VPS_SERVER;

export default async function Home() {
  // const data = await getLandPage();
  const {data} = await getLandingPage();
  
  const {attributes} = data;
  const landingpageData = attributes;
  console.log(landingpageData.video.data[0].attributes.url);

  return (
    <>
   
      <div className="text-white">
        <section className="min-h-screen pt-[5rem] snap-start">
          <h2 className="absolute bottom-14 left-8 z-10 text-5xl">
            Who's Iokasti?
          </h2>
          {/* it doesn't autoplay on refresh? */}
          {/* <div style={{ padding: "56.25% 0 0 0", position: "relative" }}>
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
          ></iframe> */}
          <Suspense
            fallback={
              <div className="w-full h-screen flex justify-center items-center">
                <p>Loading video...</p>
              </div>
            }
          >
            <video className="banner-video" autoPlay loop muted>
              <source src={CMS_URL + landingpageData.video.data[0].attributes.url} type="video/webm"/>
              Your browser does not support videos. Please use a modern
              browser.
            </video>
          </Suspense>
        </section>

        {/* Home page sections */}

        {landingpageData.section.length > 0 && (  
          landingpageData.section.map((section) => {
            return (
              <section
                key={section.id}
                className="min-h-screen pt-[5rem] snap-start"
              >
                <h2 className="p-4  text-3xl ">{section.title}</h2>
                <h3>{section.subtitle}</h3>
                <p>{section.description}</p>
                <Image
                src={section.home_section_image}
                width="480"
                height="280"
                alt="image"
              />
                
                <Link href={`/${section.home_section_url}`}>See their projects</Link>
              </section>
            );
          })
        )  
        }
        <section className="min-h-screen pt-[5rem] snap-start">
          <h2 className="p-4  text-3xl ">Dancer</h2>
          <h3>Title for Dancer</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi ipsam
            harum id corporis quia! Blanditiis est natus facere ea perferendis,
            laboriosam accusantium eaque nisi explicabo ab voluptate eligendi eos
            sunt?
          </p>
          <Link href="/projects">See their projects</Link>
        </section>
        <section className="min-h-screen pt-[5rem] snap-start">
          <h2 className="p-4  text-3xl">Trainer</h2>
          <h3>Title for trainer</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi ipsam
            harum id corporis quia! Blanditiis est natus facere ea perferendis,
            laboriosam accusantium eaque nisi explicabo ab voluptate eligendi eos
            sunt?
          </p>
          <img src="" alt="" />
          <Link href="/projects">More about trainings</Link>
        </section>
      </div>
      <marquee
        direction="left"
        className="text-white fixed bottom-0 bg-blue-400 p-2"
      >
        //some text to move
      </marquee>
    </>
  );
}
