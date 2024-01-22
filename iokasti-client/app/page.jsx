import { Suspense } from "react";
import { getLandingPage, getNewsData } from "@/lib/landingPage";
import LoadingAnim from "@/components/LoadingAnim";
import NewsScroll from "@/components/NewsScroll";
import Image from "next/image";
import Link from "next/link";
import LandingPageSections from "@/components/LangingPageSections";
// Page transition test, pls. don't delete!
// import { Transition } from "@/components/Transition";


const CMS_URL = process.env.NEXT_PUBLIC_ENV_VPS_SERVER;

export default async function Home() {
  const landingpageData = await getLandingPage();
  const news = await getNewsData();

  if (!landingpageData.error) {
    return (
      <>
        {/* Page transition test, don't delete! */}
        {/* <Transition /> */}
        <div className="text-white">
          <section className="h-screen  grid grid-cols-12 grid-rows-6">
            <Suspense
              fallback={
                <div className="w-full h-screen flex justify-center items-center z-50">
                  <LoadingAnim />
                </div>
              }
            >
              <video
                className="banner-video col-start-1 col-end-13 row-span-full"
                autoPlay
                loop
                muted
                background="true"
              >
                <source
                  src={CMS_URL + landingpageData.video}
                  alt={landingpageData.video}
                  type="video/webm"
                />
                Your browser does not support videos. Please use a modern
                browser.
              </video>
              <h2 className="text-5xl col-start-2 col-span-4 row-start-5 self-end ">
                Who's Iokasti?
              </h2>
            </Suspense>
          </section>

        
           
        </div>
        {/* {news.length > 0 && <NewsScroll news={news} />} */}

        {landingpageData.sections && <LandingPageSections sections={landingpageData.sections} />}
      </>
    );
  } else {
    return <div className="text-white">{data.error}</div>;
  }
}
