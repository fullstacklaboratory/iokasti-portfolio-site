import qs from "qs";
import { marked } from "marked";

const CMS_URL = "http://localhost:1337";

export async function getProject(title) {
  const url =
    `${CMS_URL}/api/projects?` +
    qs.stringify(
      {
        filters: { Title: { $eq: title } },
        fields: ["title", "body", "category", "date"],
        populate: {
          images: { fields: ["url"] },
          banner_Image: { fields: ["url"] },
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
  return {
    title: attributes.Title,
    body: marked(attributes.body),
    date: attributes.date,
    bannerImage: CMS_URL + attributes.banner_Image.data.attributes.url,
    images: attributes.images.data,
  };
}

export async function getProjects() {
  const url =
    `${CMS_URL}/api/projects?` +
    qs.stringify(
      {
        fields: ["title", "description", "category", "date"],
        populate: {
          banner_Image: { fields: ["url"] },
        },
        pagination: { pageSize: 10 },
        sort: ["date:desc"],
      },
      { encodeValuesOnly: true }
    );

  const response = await fetch(url);
  const { data } = await response.json();
  return data.map(({ attributes }) => ({
    title: attributes.Title,
    description: attributes.description,
    date: attributes.date,
    image: CMS_URL + attributes.banner_Image.data.attributes.url,
  }));
}
