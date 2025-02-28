import Instagram from "@/components/Instagram";
import { getNotebookPage } from "@/lib/notebook";
import { getProjectPage } from "@/lib/projects";
import styles from "./notebook.module.scss";
import { notFound } from "next/navigation";
import { germania } from "../fonts";

export const metadata = {
  title: "pelagos",
  description:
    "Pelagos",
  alternates: { canonical: `/pelagos` },
  keywords: "pelagos, notes, notebook, iokasti, mantzog",
  openGraph: {
    title: "pelagos",
    description:
      "Pelagos",
    images: [`/public/opengraph-image.jpg`],
  },
};

let CMS_URL;

if (process.env.NODE_ENV === "development") {
  CMS_URL = process.env.NEXT_PUBLIC_ENV_VPS_SERVER_DEV;
} else {
  CMS_URL = process.env.NEXT_PUBLIC_ENV_VPS_SERVER_PROD;
}

const Pelagos = async () => {
  const { loadingImage } = await getProjectPage();
  try {
    const data = await getNotebookPage();
    if (!data) {
      notFound();
    }

    const pageTitle = data.pageTitle;
    const notebookEntries = data.notebookEntries.map((entry) => {
      const imageAttributes = entry.image?.data?.attributes || {};
      return {
        entryTitle: entry.title,
        entryDate: entry.date,
        entryDescription: entry.description,
        entryImage: imageAttributes.url,
        entryImageWidth: imageAttributes.width,
        entryImageHeight: imageAttributes.height,
        entryAlternativeText: imageAttributes.alternativeText,
        entryMime: imageAttributes.mime,
        entryVideoUrl: entry.videoUrl,
        background: entry.videoUrl ? entry.videoUrl : imageAttributes,
      };
    });

    return (
      <div className={styles.container}>
        <h1 className={germania.className}>{pageTitle}</h1>
        <Instagram
          cms={CMS_URL}
          entries={notebookEntries}
          loadingImage={loadingImage}
        />
      </div>
    );
  } catch (error) {
    console.error("Failed to load notebook data:", error);
    return <div>Error loading notebook data.</div>;
  }
};

export default Pelagos;
