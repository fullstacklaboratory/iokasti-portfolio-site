import qs from "qs";
import { marked } from "marked";
import { AiTwotoneAccountBook } from "react-icons/ai";

const CMS_URL = "http://localhost:1337";

export const getLandPage = async () => {
  const url =
    `${CMS_URL}/api/land-page?` +
    qs.stringify({
      populate: {
        Video: { fields: ["url"] },
      },
    });
  const response = await fetch(url);
  const { data } = await response.json();

  const { attributes } = data;
  return {
    name: attributes.Name,
    instagramLink: attributes.Instagram_Link,
    vimeoLink: attributes.vimeo_link,
    email: attributes.Email,
    video: CMS_URL + attributes.Video.data[0].attributes.url,
  };
};

export const getNavData = async () => {
    const url =
      `${CMS_URL}/api/land-page?` 
    
    const response = await fetch(url);
    const { data } = await response.json();
  
    const { attributes } = data;
    return {
      name: attributes.Name,
      instagramLink: attributes.Instagram_Link,
      vimeoLink: attributes.vimeo_link,
      email: attributes.Email,
    };
  };
