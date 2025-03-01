import qs from "qs";
import { marked } from "marked";

const CMS_URL = process.env.BACKEND;
export const CMS_FACILITATINGS = "facilitatings";
export const CMS_FACILITATINGS_PAGE = "facilitating-page";

export async function getSlugsForFacilitating() {
  const url =
    `${CMS_URL}/api/facilitatings?` +
    qs.stringify(
      {
        fields: ["slug"],
        pagination: { pageSize: 100 },
      },
      { encodeValuesOnly: true }
    );

  const res = await fetch(url, {
    next: {
      tags: [CMS_FACILITATINGS],
    },
  });
  if (!res.ok) {
    throw new Error(`CMS returned ${res.status} for ${url}`);
  }
  const { data } = await res.json();

  return data.map((item) => item.attributes.slug);
}

export async function getFacilitating(slug) {
  try {
    const query = qs.stringify(
      {
        filters: { slug: { $eq: slug } },
        fields: ["title", "body", "slug"],
        populate: {
          backgroundImage: { fields: ["width", "height", "mime", "url"] },
        },
        pagination: { pageSize: 100 },
      },
      { encodeValuesOnly: true }
    );
    const url = `${CMS_URL}/api/facilitatings?${query}`;

    const response = await fetch(url, {
      next: {
        tags: [CMS_FACILITATINGS_PAGE],
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
      image: attributes.backgroundImage.data,
      slug: attributes.slug,
    };
  } catch (error) {
    console.error(`Error in getFacilitating: ${error.message}`);
    return null;
  }
}

export async function getFacilitatingTitles() {
  const url =
    `${CMS_URL}/api/facilitatings?` +
    qs.stringify(
      {
        fields: ["title", "slug"],
        populate: {
          backgroundImage: { fields: ["width", "height", "mime", "url"] },
        },
        pagination: { pageSize: 100 },
      },
      { encodeValuesOnly: true }
    );

  const res = await fetch(url, {
    next: {
      tags: [CMS_FACILITATINGS_PAGE],
    },
  });
  if (!res.ok) {
    throw new Error(`CMS returned ${res.status} for ${url}`);
  }
  const { data } = await res.json();

  return data.map(({ attributes }) => ({
    title: attributes.title,
    slug: attributes.slug,
    backgroundImage: attributes.backgroundImage.data,
  }));
}
