import qs from "qs";
import { marked } from "marked";

const CMS_URL = process.env.NEXT_PUBLIC_ENV_VPS_SERVER

export const getAbout = async () => {
  const url =
    `${CMS_URL}/api/about?` +
    qs.stringify({
      //  fields: ["title", "artistic_statement"],
      populate: {
        images: { fields: ["url"] },
        cv: { fields: ["url"] },
        pagination: { pageSize: 1, withCount: false },
      },
    });
  const response = await fetch(url);
  const { data } = await response.json();

  const { attributes } = data;
  

  return {
    title: attributes.title,
    body: marked(attributes.artistic_statement),
    images: attributes.images.data,
    cv: CMS_URL + attributes.cv.data.attributes.url,
  };
};
