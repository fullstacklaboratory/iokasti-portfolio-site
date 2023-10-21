import { Suspense } from "react";
import { getLandPage } from "@/lib/landpage";

export default async function Home() {
  const data = await getLandPage();

  return (
    <>
      <h2 className="p-4 text-2xl  relative z-10 text-white ">Who's Iokasti?</h2>

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
      <Suspense fallback={<div className="w-full h-screen flex justify-center items-center"><p>Loading video...</p></div> }>
        <video
          className="banner-video"
          autoPlay
          loop
          muted
        >
          <source src={data.video} type="video/webm" />
          Your browser does not support the video tag. Please use a modern
          browser.
        </video>
      </Suspense>

      <marquee
        direction="left"
        className="text-white absolute bottom-0 bg-blue-400 p-2"
      >
        //some text to move
      </marquee>
    </>
  );
}
