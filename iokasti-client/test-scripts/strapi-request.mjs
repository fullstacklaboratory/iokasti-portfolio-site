import { writeFileSync } from "node:fs";
import qs from "qs";

const CMS_URL = "http://localhost:1337";

const today = new Date();

console.log(today);
// http://localhost:1337/api/teachings?filters\[upcoming_dates\][upcoming_date][$gt]=10/23/2023
const url =
  "http://localhost:1337/api/teachings" +
  "?" +
  qs.stringify({
    filters: { upcoming_dates: { upcoming_date: { $gte: today } } },
    fields: ["title"],
    populate: {
      upcoming_dates: { fields: ["*"] },
    },
    // populate: {
    //   banner_Image: { fields: ["url"] },
    //   images: { fields: ["url"] },
    //   pagination: { pageSize: 1, withCount : false },
    //   //  sort : ["ending_date:desc"]
    // },
  });
const response = await fetch(url);
const body = await response.json();
console.log(body);
const formatted = JSON.stringify(body, null, 2);
const file = "test-scripts/strapi-response.json";
writeFileSync(file, formatted, "utf8");

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

// const url =
//   `${CMS_URL}/api/notebook?` +
//   qs.stringify({
//     populate: {
//       images: { fields: ["url"] },
//     },
//   });
// const response = await fetch(url);
// const body = await response.json();

// const formatted = JSON.stringify(body, null, 2);
// const file = "test-scripts/strapi-response.json";
// writeFileSync(file, formatted, "utf8");
