import qs from "qs";

const CMS_URL = process.env.NEXT_PUBLIC_ENV_VPS_SERVER;

export const getNotebookPage = async () => {
  const url =
    "http://localhost:1337/api/notebook" +
    "?" +
    qs.stringify({
      fields: ["pageTitle"],

      populate: {
        notebookEntry: {
          populate: {
            image: { fields: ["width", "height", "url", "alternativeText"] },
          },
        },
      },
    });

  const response = await fetch(url);
  const { data } = await response.json();
  const { attributes } = data;
  return {
    pageTitle: attributes.pageTitle,
    notebookEntries: attributes.notebookEntry,
  };
};
