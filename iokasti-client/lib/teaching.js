import qs from "qs";
import { marked } from "marked";

const CMS_URL = process.env.NEXT_PUBLIC_ENV_WPS_SERVER;

export async function getTeachings() {
  const url =
    `${CMS_URL}/api/teachings?` +
    qs.stringify({
      populate: {
        upcoming_dates: { fields: ["*"] },
        image: { fields: ["url"] },
      },
    });
  const response = await fetch(url);
  const { data } = await response.json();

  return data.map(({ attributes }) => ({
    title: attributes.title,
    description: attributes.description,
    external_url: attributes.external_url,
    image: CMS_URL + attributes.image.data.attributes.url,
    place_name: attributes.place_name,
    map_url: attributes.map_url,
    regular_schedule: attributes.regular_schedule,
    weekday: attributes.weekday,
    from: attributes.from,
    to: attributes.to,
    upcoming_dates: attributes.upcoming_dates,
  }));
}
