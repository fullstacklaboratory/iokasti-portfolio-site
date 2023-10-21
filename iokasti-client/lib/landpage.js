import qs from "qs";
import { marked } from "marked";

const CMS_URL = process.env.NEXT_PUBLIC_ENV_VPS_SERVER;

export const getLandingPage = async () => {
  const url = `${CMS_URL}/api/land-page?populate=video&populate=section.home_section_image`;
    const res = await fetch(url)
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.
   
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data')
    }
    // console.log(res)
    return res.json()
  }

// export const getLandPage = async () => {
//   const url =
//     `${CMS_URL}/api/land-page?populate=?populate=*` +
//     qs.stringify({
//       populate: {
//         video: { fields: ["url"] },
//         section: {fields: ["title", "subtitle", "home_section_image", "home_section_description", "home_section_url", "align_content"]},
//       },
//     });

//   const response = await fetch(url);
  
//   const { data } = await response.json();
//   console.log(data.attributes)
//   const { attributes } = data;
//   // console.log(data.attributes.section[0])

//   return {
//     // video: CMS_URL + attributes.video.data[0].attributes.url,
//     video: "" ,
//     sections: attributes.section
//   };
// };

export const getNavData = async () => {
  const url = `${CMS_URL}/api/land-page?`;

  const response = await fetch(url);
  const { data } = await response.json();


  const { attributes } = data;
  return {
    siteTitle: attributes.site_name || "",
    instagram: attributes.instagram_link || "",
    vimeo: attributes.vimeo_link || "",
    email: attributes.email || "",
  };
};
