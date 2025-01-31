import styles from "@/app/about/about.module.scss";
import AboutContent from "@/components/AboutContent";
import BannerImageOrVideo from "@/components/BannerImageOrVideo";
import { useLimitString } from "@/hooks/useLimitString";
import { getFacilitating, getSlugsForFacilitating } from "@/lib/facilitating";
import { notFound } from "next/navigation";

let CMS_URL;

if (process.env.NODE_ENV === "development") {
  CMS_URL = process.env.NEXT_PUBLIC_ENV_VPS_SERVER_DEV;
} else {
  CMS_URL = process.env.NEXT_PUBLIC_ENV_VPS_SERVER_PROD;
}

export const generateMetadata = async ({ params }) => {
  try {
    const content = await getFacilitating(params.title);
    const { url } = content.image.attributes;
    if (!content)
      return {
        title: "not found",
        description: "does not exist",
      };
    return {
      title: content.title,
      alternates: { canonical: `/facilitating/${content.slug}` },
      keywords: "Facilitating, iokasti, portfolio",
      openGraph: {
        title: content.title,
        images: [`${CMS_URL}${url}`],
      },
    };
  } catch (error) {
    console.error(error);
    return {
      title: "not found",
      description: "does not exist",
    };
  }
};

export const generateStaticParams = async () => {
  // this will generate all the reviews paths on build. That means we don't have to rerender dynamic path component again
  const slugs = await getSlugsForFacilitating();
  return slugs.map((slug) => ({ slug }));
};

const FacilitatingPage = async ({ params }) => {
  try {
    const content = await getFacilitating(params.title);
    console.log("facilitating content",  content)
    const backround = content.image.attributes
    if (!content) {
      throw new Error("No data received from CMS");
    }
    const limitedTitle = useLimitString(content.title, 20);
    

    return (
      <>
        <section className={styles.header}>
          <BannerImageOrVideo cms={CMS_URL} background={backround} />
          <h2 className={styles.banner} title={content.title}>
            {limitedTitle}
          </h2>
        </section>
        <AboutContent content={content} />
      </>
    );
  } catch (error) {
    console.error(`Error in ProjectPage: ${error.message}`);
    return notFound();
  }
};

export default FacilitatingPage;
