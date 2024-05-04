import qs from "qs";

const CMS_URL = process.env.NEXT_PUBLIC_ENV_VPS_SERVER;
export const CMS_NOTEBOOK = "notebook";

export const getNotebookPage = async () => {
  const url =
    "http://localhost:1337/api/notebook" +
    "?" +
    qs.stringify({
      fields: ["pageTitle"],

      populate: {
        notebookEntry: {
          populate: {
            image: { fields: ["width", "height", "url", "mime", "alternativeText"] },
          },
        },
      },
    });

  const response = await fetch(url, {
    next: {
      tags: [CMS_NOTEBOOK],
    }
  });
  const { data } = await response.json();
  const { attributes } = data;
  return {
    pageTitle: attributes.pageTitle,
    notebookEntries: attributes.notebookEntry,
  };
};
