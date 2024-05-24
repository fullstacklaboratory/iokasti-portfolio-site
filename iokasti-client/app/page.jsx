import { Suspense } from "react";
import { getLandingPage, getNewsData } from "@/lib/landingPage";
import LoadingAnim from "@/components/LoadingAnim";
import NewsScroll from "@/components/NewsScroll";
import styles from "./landingPage.module.scss";
import BannerImageOrVideo from "@/components/BannerImageOrVideo";
// Page transition test, pls. don't delete!
// import { Transition } from "@/components/Transition";

let CMS_URL;

if (process.env.NODE_ENV === "development") {
  CMS_URL = process.env.NEXT_PUBLIC_ENV_VPS_SERVER_DEV;
} else {
  CMS_URL = process.env.NEXT_PUBLIC_ENV_VPS_SERVER_PROD;
}

// const CMS_URL = process.env.NEXT_PUBLIC_ENV_VPS_SERVER;

export default async function Home() {
  const data = await getLandingPage();
  const news = await getNewsData();
  const landingPageData = data.data.attributes;
  if (!data.error) {
    return (
      <>
        {/* Page transition test, don't delete! */}
        {/* <Transition /> */}
        <div className="text-white">
          <section className="h-screen">
            <Suspense
              fallback={
                <div className="w-full h-screen flex justify-center items-center z-50">
                  <LoadingAnim />
                </div>
              }
            >
              <BannerImageOrVideo videoUrl={data.data.attributes.videoUrl} />
            </Suspense>
          </section>
          {/* DONT DELETE THIS!!! */}
          {/* {landingPageData.sections &&
            landingPageData.sections.map((section) => {
              const sectionImage = section.home_section_image.data.attributes;

              return (
                <section
                  key={section.id}
                  className="h-screen pt-[5rem] pb-[5rem]  snap-start grid grid-cols-12 grid-rows-6"
                >
                  <h2 className="text-5xl">{section.title}</h2>
                  <h3>{section.subtitle}</h3>

                  <p className="col-start-2 col-span-4 row-start-5 ">
                    {section.home_section_description}
                  </p>
                  <Image
                    src={CMS_URL + sectionImage.url}
                    width="500"
                    height="600"
                    alt={sectionImage.alternativeText}
                  />

                  <Link href={`/${section.home_section_url}`}>
                    See their projects
                  </Link>
                </section>
              );
            })} */}
        </div>
        {news.length > 0 && <NewsScroll news={news} />}
      </>
    );
  } else {
    return <div className="text-white">{data.error}</div>;
  }
}
