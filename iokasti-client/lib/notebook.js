import qs from "qs";

const CMS_URL = process.env.BACKEND;
export const CMS_NOTEBOOK = "notebook";

export const getNotebookPage = async () => {
  const url =
    `${CMS_URL}/api/notebook` +
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

  try {
    const response = await fetch(url, {
      next: {
        tags: [CMS_NOTEBOOK],
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const { data } = await response.json();
    const { attributes } = data;
    return {
      pageTitle: attributes.pageTitle,
      notebookEntries: attributes.notebookEntry,
    };
  } catch (error) {
    console.error("Error fetching notebook page:", error);
    throw error;
  }
};