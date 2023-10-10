import { writeFileSync } from "node:fs";
import qs from "qs";

const url =
  "http://localhost:1337/api/projects" +
  "?" +
  qs.stringify({
    filters : {Title : {$eq : "September"}},
     fields: ["title", "description", "category", "body", "date", "body"],
    populate: {
      banner_Image: { fields: ["url"] },
      images: { fields: ["url"] },
      pagination: { pageSize: 1, withCount : false },
    //   sort : ["date:desc"]
    }, 
  });
const response = await fetch(url);
const body = await response.json();
console.log(body)
const formatted = JSON.stringify(body, null, 2);
const file = "test-scripts/strapi-response.json";
writeFileSync(file, formatted, "utf8");
