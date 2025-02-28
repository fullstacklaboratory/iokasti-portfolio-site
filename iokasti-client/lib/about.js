import qs from "qs";
import { marked } from "marked";

const CMS_URL = process.env.BACKEND;
export const CMS_ABOUT = "about";

export const getAbout = async () => {
  const url =
    `${CMS_URL}/api/about?` +
    qs.stringify({
      fields: ["title", "artistic_statement", "videoUrl"],
      populate: {
        cv: { fields: ["url"] },
      },
    });
  const response = await fetch(url, {
    next: {
      tags: [CMS_ABOUT],
    },
  });
  const { data } = await response.json();
  const { attributes } = data;

  return {
    title: attributes.title,
    body: marked(attributes.artistic_statement),
    cv: attributes.cv.data,
    videoUrl: attributes.videoUrl,
  };
};
