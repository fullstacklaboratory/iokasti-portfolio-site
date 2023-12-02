import qs from "qs";
import { marked } from "marked";

const CMS_URL = process.env.NEXT_PUBLIC_ENV_VPS_SERVER;

export const getNotebook = async () => {
  const url =
    `${CMS_URL}/api/notebook?` +
    qs.stringify({
      populate: {
        images: { fields: ["url"] },
      },
    });
  const response = await fetch(url);
  const { data } = await response.json();

  const { attributes } = data;

  return {
    images: attributes.images.data,
  };
};
