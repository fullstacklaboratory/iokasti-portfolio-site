import { getProjectPage } from "@/lib/projects";
import { getFacilitatingTitles } from "@/lib/facilitating";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import facstyles from "@/app/facilitating/facilitating.module.scss";

import BannerImageOrVideo from "@/components/BannerImageOrVideo";

const Facilitating = async () => {
  let CMS_URL;

  if (process.env.NODE_ENV === "development") {
    CMS_URL = process.env.NEXT_PUBLIC_ENV_VPS_SERVER_DEV;
  } else {
    CMS_URL = process.env.NEXT_PUBLIC_ENV_VPS_SERVER_PROD;
  }
  const header = await getProjectPage();
  console.log("Header,", header);

  const facilitatings = await getFacilitatingTitles();

  if (!header.error && !facilitatings.error) {
    return (
      <div>
        <section className={facstyles.header}>
        <h2 className={facstyles.banner}>Facilitating</h2>
          <BannerImageOrVideo
            cms={CMS_URL}
            background={
              header.facilitating_video ||
              (header.facilitating_Image.data &&
                header.facilitating_Image.data.attributes)
            }
          />
          
        </section>
        <ul className={facstyles.list}>
          {facilitatings.map((item, i) => {
            return (
              <li key={i} className={facstyles.item}>
                <Link href={`/facilitating/${item.slug}`}>
                  <Image
                    src={CMS_URL + item.backgroundImage.attributes.url}
                    alt={item.backgroundImage.attributes.alt}
                    // width={item.backgroundImage.attributes.width}
                    // height={item.backgroundImage.attributes.height}
                    layout="fill"
                    objectFit="cover"
                    objectPosition="center"
                  />
                  <h5 className={facstyles.title}>{item.title}</h5>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    );
  } else {
    return (
      <div className="text-white">{header.error || facilitatings.error}</div>
    );
  }
};

export default Facilitating;
