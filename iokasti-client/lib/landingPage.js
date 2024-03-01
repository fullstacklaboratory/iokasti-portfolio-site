import qs from "qs";
import { marked } from "marked";


const CMS_URL = process.env.NEXT_PUBLIC_ENV_VPS_SERVER;

export const getLandingPage = async () => {
  const url = `${CMS_URL}/api/landing-page?populate=video&populate=sections.home_section_image`;
  const res = await fetch(url);
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    const error = "Fetch failed because: " + res.statusText;
    return { error: error };
  }
  return res.json();
};

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
  const url = `${CMS_URL}/api/landing-page?`;

  const response = await fetch(url);

  if (!response.ok) {
    // This will activate the closest `error.js` Error Boundary
    const error = "Fetch failed because: " + response.statusText;
    return { error: error };
  }

  const { data } = await response.json();
  const { attributes } = data;
  return {
    siteTitle: attributes.site_name || "",
    instagram: attributes.instagram_link || "",
    vimeo: attributes.vimeo_link || "",
    email: attributes.email || "",
  };
};

const today = new Date()

export const getNewsData = async () => {
  const url =
    "http://localhost:1337/api/projects" +
    "?" +
    qs.stringify({
      filters: { ending_date: { $gt: today } },
      fields: ["title", "starting_date", "ending_date", "slug"],
      sort: ["ending_date:desc"],
    });

  const response = await fetch(url);
  const { data } = await response.json();
  return data.map(({ attributes }) => ({
    title: attributes.title,
    starting_date: attributes.starting_date,
    ending_date: attributes.ending_date,
    slug : attributes.slug
  }));
};
