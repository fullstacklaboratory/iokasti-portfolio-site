import qs from "qs";
import { marked } from "marked";

const CMS_URL = process.env.NEXT_PUBLIC_ENV_VPS_SERVER;
export const CMS_ABOUT = "about";

export const getAbout = async () => {
  const url =
    `${CMS_URL}/api/about?` +
    qs.stringify({
      fields: ["title", "artistic_statement"],
      populate: {
        banner_image_or_video: { fields: ["width", "height", "mime", "url"] },
        cv: { fields: ["url"] },
      },
    });
  const response = await fetch(url, {
    next: {
      tags: [CMS_ABOUT],
    }
  });
  const { data } = await response.json();
  const { attributes } = data;

  return {
    title: attributes.title,
    body: marked(attributes.artistic_statement),
    images: attributes.banner_image_or_video.data,
    cv: attributes.cv.data,
  };
};
