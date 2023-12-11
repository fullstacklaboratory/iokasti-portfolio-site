import { getAbout } from "@/lib/about";
import Image from "next/image";
import Link from "next/link";
import BannerImageOrVideo from "@/components/BannerImageOrVideo";
import styles from "@/app/about/about.module.scss";

import { BsPersonVcardFill } from "react-icons/bs";

export const metadata = {
  title: "About",
};

const CMS_URL = process.env.NEXT_PUBLIC_ENV_VPS_SERVER;

const About = async () => {
  const content = await getAbout();
  console.log(content);
  return (
    <>
      <section className={styles.header}>
        <BannerImageOrVideo
          mime={content.images.attributes.mime}
          src={CMS_URL + content.images.attributes.url}
          alt={content.images.attributes.alternativeText}
          width={content.images.attributes.width}
          height={content.images.attributes.height}
        />
        <h2>{content.title}</h2>
      </section>

      <article className={styles.content} dangerouslySetInnerHTML={{ __html: content.body }}></article>
    </>
  );
};

export default About;

{
  /* <iframe src="http://localhost:1337/uploads/MARCELL_CSOKAS_CV_2023_6370f56327.pdf" /> */
}
{
  /* <object
            data="http://localhost:1337/uploads/MARCELL_CSOKAS_CV_2023_6370f56327.pdf"
            type="application/pdf"
            width="500px"
            height="500px"
          >
            <p>
              Alternative text - include a link
              <a href="http://localhost:1337/uploads/MARCELL_CSOKAS_CV_2023_6370f56327.pdf">
                to the PDF!
              </a>
            </p>
          </object> */
}
{
  /* <Link href={content.cv}>cv</Link> */
}
{
  /* <span>CV</span> */
}
{
  /* <BsPersonVcardFill /> */
}
