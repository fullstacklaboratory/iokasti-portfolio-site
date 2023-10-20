import qs from "qs";
import { marked } from "marked";

const CMS_URL = process.env.NEXT_PUBLIC_ENV_WPS_SERVER


export async function getTeachings() {
    const url =
`${CMS_URL}/api/teachings?` +
qs.stringify({
  populate: {
    upcoming_dates : {fields : ["*"]},
    image: { fields: ["url"] },
  },
});
const response = await fetch(url);
const {data} = await response.json();

if (data.length === 0) {
    return null
}

}