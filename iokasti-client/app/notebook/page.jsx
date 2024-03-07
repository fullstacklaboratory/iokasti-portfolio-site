import Instagram from "@/components/Instagram";
import { getNotebookPage } from "@/lib/notebook";
import styles from "./notebook.module.scss";

const Notebook = async () => {
  const data = await getNotebookPage();
  const pageTitle = data.pageTitle;
  const notebookEntries = data.notebookEntries.map((entry) => {
    {
      return {
        entryTitle: entry.title,
        entryDate: entry.date,
        entryDescription: entry.description,
        entryImage: entry.image.data.attributes.url,
        entryImageWidth: entry.image.data.attributes.width,
        entryImageHeight: entry.image.data.attributes.height,
        entryAlternativeText: entry.image.data.attributes.alternativeText,
        entryMime : entry.image.data.attributes.mime
      };
    }
  });

  return (
    <div className={styles.container}>
      <h1>{pageTitle}</h1>
      <Instagram entries={notebookEntries} />
    </div>
  );
};
export default Notebook;