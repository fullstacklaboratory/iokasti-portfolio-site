import { getProjectPage } from "@/lib/projects";
import { getFacilitatingTitles } from "@/lib/facilitating";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { germania } from "@/app/fonts";
import facstyles from "@/app/facilitating/facilitating.module.scss";
import BannerImageOrVideo from "@/components/BannerImageOrVideo";
import { lora } from "@/app/fonts";

let CMS_URL;

if (process.env.NODE_ENV === "development") {
  CMS_URL = process.env.NEXT_PUBLIC_ENV_VPS_SERVER_DEV;
} else {
  CMS_URL = process.env.NEXT_PUBLIC_ENV_VPS_SERVER_PROD;
}

export const metadata = {
  title: "Facilitating",
  description: "Facilitating",
  alternates: { canonical: `/Facilitating` },
  keywords:
    "Facilitating, iokasti, mantzog, performer, dancer, trainer , pilates",
  openGraph: {
    title: "Facilitating",
    description: "Facilitating",
    images: [`/public/opengraph-image.jpg`],
  },
};

const Facilitating = async () => {
  const header = await getProjectPage();
  const { loadingImage } = await getProjectPage();
  const facilitatings = await getFacilitatingTitles();

  if (!header || !facilitatings) {
    return notFound();
  }

  const background =
    header.facilitating_video ||
    (header.facilitating_Image &&
      header.facilitating_Image.data &&
      header.facilitating_Image.data.attributes);

  return (
    <div>
      <section className={facstyles.header}>
        <h2 className={`${facstyles.banner} ${germania.className}`}>
          Facilitating
        </h2>
        <BannerImageOrVideo
          cms={CMS_URL}
          background={background}
          loadingImage={loadingImage}
        />
      </section>
      <ul className={facstyles.list}>
        {facilitatings.map((item, i) => (
          <li key={i} className={facstyles.item}>
            <Link href={`/facilitating/${item.slug}`}>
              <Image
                src={CMS_URL + item.backgroundImage.attributes.url}
                alt={
                  item.backgroundImage.attributes.alt || "Facilitating image"
                }
                layout="fill"
                objectFit="cover"
                objectPosition="center"
              />
              <h5 className={`${facstyles.title} ${lora.className}`}>
                {item.title}
              </h5>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Facilitating;
