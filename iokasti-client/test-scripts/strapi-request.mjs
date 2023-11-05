import { writeFileSync } from "node:fs";
import qs from "qs";

const CMS_URL = "http://localhost:1337";

console.log(today)

const url =
  "http://localhost:1337/api/projects" +
  "?" +
  qs.stringify({
    filters : {ending_date : {$gt : today}},
     fields: ["title", "description", "category", "body", "ending_date", "body"],
    populate: {
      banner_Image: { fields: ["url"] },
      images: { fields: ["url"] },
      pagination: { pageSize: 1, withCount : false },
       sort : ["ending_date:desc"]
    },
  });
const response = await fetch(url);
const body = await response.json();
console.log(body)
const formatted = JSON.stringify(body, null, 2);
const file = "test-scripts/strapi-response.json";
writeFileSync(file, formatted, "utf8");

// const url =
//   "http://localhost:1337/api/about" +
//   "?" +
//   qs.stringify({
//     //  fields: ["title", "artistic_statement"],
//     populate: {
//       images: { fields: ["url"] },
//       cv: { fields: ["url"] },
//       pagination: { pageSize: 1, withCount: false },
//       //   sort : ["date:desc"]
//     },
//   });
// const response = await fetch(url);
// const body = await response.json();
// console.log(body);
// const formatted = JSON.stringify(body, null, 2);
// const file = "test-scripts/strapi-response.json";
// writeFileSync(file, formatted, "utf8");


// const url =
// `${CMS_URL}/api/land-page?` +
// qs.stringify({
//   populate: {
//     Video: { fields: ["url"] },
//   },
// });
// const response = await fetch(url);
// const body = await response.json();


// const formatted = JSON.stringify(body, null, 2);
//  const file = "test-scripts/strapi-response.json";
//  writeFileSync(file, formatted, "utf8");


//  const url =
// `${CMS_URL}/api/teachings?` +
// qs.stringify({
//   populate: {
//     upcoming_dates : {fields : ["*"]},
//     image: { fields: ["url"] },
//   },
// });
// const response = await fetch(url);
// const body = await response.json();


// const formatted = JSON.stringify(body, null, 2);
//  const file = "test-scripts/strapi-response.json";
//  writeFileSync(file, formatted, "utf8");