import Instagram from "@/components/Instagram";
import { getNotebookPage } from "@/lib/notebook";
import styles from "./notebook.module.scss";
import { notFound } from "next/navigation";
import { germania } from "../fonts";

export const metadata = {
  title: "pelagos",
  description:
    "Dive into a visual and poetic journey through 'Pelagos', a collection of evocative images and words crafted by Iokasti Mantzog: a Greek queer non-binary dancer, performer, and trainer based in Berlin.",
  alternates: { canonical: `/pelagos` },
  keywords: "pelagos, notes, notebook, iokasti, mantzog",
  openGraph: {
    title: "pelagos",
    description:
      "Dive into a visual and poetic journey through 'Pelagos', a collection of evocative images and words crafted by Iokasti Mantzog: a Greek queer non-binary dancer, performer, and trainer based in Berlin.",
    images: [`/public/opengraph-image.jpg`],
  },
};

const Pelagos = async () => {
  const data = await getNotebookPage();
  if (!data) {
    notFound();
  }

  const pageTitle = data.pageTitle;
  const notebookEntries = data.notebookEntries.map((entry) => {
    console.log(entry.image.data.attributes);
    {
      return {
        entryTitle: entry.title,
        entryDate: entry.date,
        entryDescription: entry.description,
        // entryImage: entry.image.data.attributes.url,
        // entryImageWidth: entry.image.data.attributes.width,
        // entryImageHeight: entry.image.data.attributes.height,
        // entryAlternativeText: entry.image.data.attributes.alternativeText,
        // entryMime: entry.image.data.attributes.mime,
        // entryVideo: entry.videoUrl,
        backround: entry.videoUrl
          ? entry.videoUrl
          : entry.image.data.attributes,
      };
    }
  });

  return (
    <div className={styles.container}>
      <h1 className={germania.className}>{pageTitle}</h1>
      <Instagram entries={notebookEntries} />
    </div>
  );
};
export default Pelagos;
