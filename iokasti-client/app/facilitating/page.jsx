import React from "react";
import { getProjectPage } from "@/lib/projects";
import { getFacilitatingTitles } from "@/lib/facilitating";
import Image from "next/image";
import Link from "next/link";
import styles from "@/app/about/about.module.scss";

import BannerImageOrVideo from "@/components/BannerImageOrVideo";

const Facilitating = async () => {
  let CMS_URL;

  if (process.env.NODE_ENV === "development") {
    CMS_URL = process.env.NEXT_PUBLIC_ENV_VPS_SERVER_DEV;
  } else {
    CMS_URL = process.env.NEXT_PUBLIC_ENV_VPS_SERVER_PROD;
  }
  const header = await getProjectPage();
  console.log("Header,",header)

  const facilitatings = await getFacilitatingTitles();

  return (
    <div>
         {/* <section className={styles.header}>
        <BannerImageOrVideo cms={CMS_URL} background={header.facilitating_video || header.facilitating_Image.data.attributes} />
        <h2 className={styles.banner}>Facilitating</h2>
      </section> */}
      <ul>
        {facilitatings.map((item,i) => {
          return (
            <li key={i}>
              <Link href={`/facilitating/${item.slug}`}>
              <div>
                <Image
                  src={CMS_URL + item.backgroundImage.attributes.url}
                  alt={item.backgroundImage.attributes.alt}
                  width={item.backgroundImage.attributes.width}
                  height={item.backgroundImage.attributes.height}
                />
                <h3>{item.title}</h3>
              </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Facilitating;
