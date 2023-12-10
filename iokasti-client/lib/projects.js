import qs from "qs";
import { marked } from "marked";

const CMS_URL = process.env.NEXT_PUBLIC_ENV_VPS_SERVER;

export async function getProject(slug) {
  const url =
    `${CMS_URL}/api/projects?` +
    qs.stringify(
      {
        filters: { slug: { $eq: slug } },
        fields: [
          "title",
          "body",
          "category",
          "ending_date",
          "starting_date",
          "video_link",
        ],
        populate: {
          images: { fields: ["url"] },
          banner_image: { fields: ["url"] },
        },
        pagination: { pageSize: 2 },
      },
      { encodeValuesOnly: true }
    );

  const response = await fetch(url);
  const { data } = await response.json();

  if (data.length === 0) {
    return null;
  }

  const { attributes } = data[0];
  console.log(attributes);
  return {
    title: attributes.Title,
    body: marked(attributes.body),
    starting_date: attributes.starting_date,
    ending_date: attributes.ending_date,
    bannerImage: CMS_URL + attributes.banner_Image.data.attributes.url,
    images: attributes.images.data,
    video_link: attributes.video_link,
  };
}

export async function getProjects() {
  const url =
    `${CMS_URL}/api/projects?` +
    qs.stringify(
      {
        filters: { category: { $eq: "project" } },
        fields: [
          "title",
          "slug",
          "description",
          "category",
          "starting_date",
          "ending_date",
        ],
        populate: {
          banner_Image: { fields: ["url"] },
        },
        pagination: { pageSize: 10 },
        sort: ["starting_date:desc"],
      },
      { encodeValuesOnly: true }
    );

  const response = await fetch(url);
  const { data } = await response.json();
  console.log(data)
  return data.map(({ attributes }) => ({
    title: attributes.Title,
    description: attributes.description,
    starting_date: attributes.starting_date,
    ending_date: attributes.ending_date,
    slug: attributes.slug,
    category: attributes.category,
    // banner_image: CMS_URL + attributes.banner_image.data.attributes.url,
  }));
}

export async function getSlugs() {
  const url =
    `${CMS_URL}/api/projects?` +
    qs.stringify(
      {
        fields: ["slug"],
        sort: ["starting_date:desc"],
        pagination: { pageSize: 100 },
      },
      { encodeValuesOnly: true }
    );

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`CMS returned ${res.status} for ${url}`);
  }
  const { data } = await res.json();

  return data.map((item) => item.attributes.slug);
}

export async function getCollabs() {
  const url =
    `${CMS_URL}/api/projects?` +
    qs.stringify(
      {
        filters: { category: { $eq: "collab" } },
        fields: [
          "title",
          "slug",
          "description",
          "category",
          "ending_date",
          "starting_date",
        ],
        populate: {
          // banner_image: { fields: ["url"] },
        },
        pagination: { pageSize: 10 },
        sort: ["starting_date:desc"],
      },
      { encodeValuesOnly: true }
    );

  const response = await fetch(url);
  const { data } = await response.json();
  return data.map(({ attributes }) => ({
    title: attributes.Title,
    description: attributes.description,
    starting_date: attributes.starting_date,
    ending_date: attributes.ending_date,
    slug: attributes.slug,
    category: attributes.category,
    // image: CMS_URL + attributes.banner_Image.data.attributes.url,
  }));
}

export async function getProjectPage() {
  const url =
    `${CMS_URL}/api/project-page?` +
    qs.stringify({
      populate: {
        banner_image_or_video: { fields: ["width", "height", "mime", "url"] },
      },
    });

  const response = await fetch(url);
  const { data } = await response.json();
  const { attributes } = data;

  return {
    banner: attributes.banner_image_or_video.data,
  };
}

// /api/project-page
