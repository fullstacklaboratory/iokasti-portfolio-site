import qs from "qs";
import { CMS_PROJECTS } from "./projects";

const CMS_URL = process.env.BACKEND;
export const CMS_LANDING_PAGE = "landing-page";

export const getLandingPage = async () => {
  try {
    const query = qs.stringify({
      populate: ["video", "sections.home_section_image"],
    });

    const url = `${CMS_URL}/api/landing-page?${query}`;

    const res = await fetch(url, {
      next: {
        tags: [CMS_LANDING_PAGE],
      },
    });

    if (!res.ok) {
      throw new Error("Fetch failed because: " + res.statusText);
    }
    return res.json();
  } catch (error) {
    console.error(error);
    return { error: error.message };
  }
};

export const getNavData = async () => {
  const url = `${CMS_URL}/api/landing-page?`;

  try {
    const response = await fetch(url, {
      next: {
        tags: [CMS_LANDING_PAGE],
      },
    });

    if (!response.ok) {
      throw new Error(`Fetch failed with status: ${response.status}`);
    }

    const { data } = await response.json();
    const { attributes } = data;
    return {
      siteTitle: attributes.site_name || "",
      instagram: attributes.instagram_link || "",
      vimeo: attributes.vimeo_link || "",
      email: attributes.email || "",
    };
  } catch (error) {
    console.error(error);
    return { error: error.message };
  }
};

export const getNewsData = async () => {
  const today = new Date();
  const query = qs.stringify({
    filters: { ending_date: { $gt: today } },
    fields: ["title", "starting_date", "ending_date", "slug"],
    sort: ["ending_date:desc"],
  });
  const url = `${CMS_URL}/api/projects?${query}`;
  try {
    const response = await fetch(url, {
      next: {
        tags: [CMS_PROJECTS],
      },
    });

    if (!response.ok) {
      throw new Error(`Fetch failed with status: ${response.status}`);
    }

    const { data } = await response.json();
    return data.map(({ attributes }) => ({
      title: attributes.title,
      starting_date: attributes.starting_date,
      ending_date: attributes.ending_date,
      slug: attributes.slug,
    }));
  } catch (error) {
    console.error(error);
    return { error: error.message };
  }
};
