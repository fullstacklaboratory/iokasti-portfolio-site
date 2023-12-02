import React from "react";
import Instagram from "@/components/Instagram";
import { getNotebookPage } from "@/lib/notebook";

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
      };
    }
  });

  console.log(notebookEntries)
  // const images = data.images.map((item) => {
  //   {
  //     return item.attributes.url;
  //   }
  // });

  return (
    <>
      <h1>{pageTitle}</h1>
      <Instagram entries={notebookEntries} />
    </>
  );
};
export default Notebook;

{
  /* <Instagram images={images} /> */
}
