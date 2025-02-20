import qs from "qs";
import { marked } from "marked";

const CMS_URL = process.env.BACKEND;
export const CMS_PROJECTS = "projects";
export const CMS_PROJECTS_PAGE = "project-page";

export async function getProject(slug) {
  try {
    const query = qs.stringify(
      {
        filters: { slug: { $eq: slug } },
        fields: [
          "title",
          "body",
          "description",
          "category",
          "ending_date",
          "starting_date",
          "video_link",
          "slug",
        ],
        populate: {
          images: { fields: ["width", "height", "mime", "url"] },
          banner_image: { fields: ["url"] },
        },
        pagination: { pageSize: 2 },
      },
      { encodeValuesOnly: true }
    );
    const url = `${CMS_URL}/api/projects?${query}`;

    const response = await fetch(url, {
      next: {
        tags: [CMS_PROJECTS],
      },
    });
    const { data } = await response.json();

    if (data.length === 0) {
      return null;
    }

    const { attributes } = data[0];
    return {
      title: attributes.title,
      body: marked(attributes.body),
      description: attributes.description,
      starting_date: attributes.starting_date,
      ending_date: attributes.ending_date,
      // bannerImage: CMS_URL + attributes.banner_Image.data.attributes.url,
      images: attributes.images.data,
      video_link: attributes.video_link,
      slug: attributes.slug,
    };
  } catch (error) {
    console.error(`Error in getProject: ${error.message}`);
    return null;
  }
}

export async function getProjectsByCategory(category) {
  const query = qs.stringify(
    {
      filters: { category: { $eq: category } },
      fields: [
        "title",
        "slug",
        "description",
        "category",
        "starting_date",
        "ending_date",
      ],
      populate: {
        images: { fields: ["width", "height", "mime", "url"] },
      },
      sort: ["starting_date:desc"],
    },
    { encodeValuesOnly: true }
  );
  const url = `${CMS_URL}/api/projects?${query}`;

  const response = await fetch(url, {
    next: {
      tags: [CMS_PROJECTS],
    },
  });
  const { data } = await response.json();

  return data.map(({ attributes }) => ({
    title: attributes.title,
    description: attributes.description,
    starting_date: attributes.starting_date,
    ending_date: attributes.ending_date,
    slug: attributes.slug,
    category: attributes.category,
    images: attributes.images.data,
  }));
}

// Now you can get projects and collaborations like this:
// const projects = await getProjectsByCategory("project");
// const collabs = await getProjectsByCategory("collaboration");

export async function getSlugsForProjects() {
  const url =
    `${CMS_URL}/api/projects?` +
    qs.stringify(
      {
        filters: { category: { $eq: "project" } },
        fields: ["slug"],
        sort: ["starting_date:desc"],
        pagination: { pageSize: 100 },
      },
      { encodeValuesOnly: true }
    );

  const res = await fetch(url, {
    next: {
      tags: [CMS_PROJECTS],
    },
  });
  if (!res.ok) {
    throw new Error(`CMS returned ${res.status} for ${url}`);
  }
  const { data } = await res.json();

  return data.map((item) => item.attributes.slug);
}

export async function getProjectPage() {
  const url =
    `${CMS_URL}/api/project-page?` +
    qs.stringify({
      fields: [
        "projectVideoUrl",
        "collaborationVideoUrl",
        "facilitatingVideoUrl",
      ],
      populate: {
        facilitatingImage: { fields: ["width", "height", "mime", "url"] },
        projecstImage: { fields: ["width", "height", "mime", "url"] },
        collaborationImage: { fields: ["width", "height", "mime", "url"] },
      },
    });

  const response = await fetch(url, {
    next: {
      tags: [CMS_PROJECTS_PAGE],
    },
  });
  const { data } = await response.json();
  console.log("project page data", data);
  const { attributes } = data;

  return {
    facilitating_Image: attributes.facilitatingImage,
    project_Image: attributes.projecstImage,
    collab_Image: attributes.collaborationImage,
    project_video: attributes.projectVideoUrl,
    collab_video: attributes.collaborationVideoUrl,
    facilitating_video: attributes.facilitatingVideoUrl,
  };
}
