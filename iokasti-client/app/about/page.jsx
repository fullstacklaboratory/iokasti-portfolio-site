import { getAbout } from "@/lib/about";
import Image from "next/image";
import Link from "next/link";
import { BsPersonVcardFill } from "react-icons/bs";

export const metadata = {
  title: "About",
};

const CMS_URL = process.env.NEXT_PUBLIC_ENV_VPS_SERVER

const About = async () => {
  const content = await getAbout();
  return (
    <>
      <header className="flex justify-between p-3 items-center text-white">
        <h1 className="text-4xl">About {content.title}</h1>
        <Link href={content.cv} target="_blank" className="text-3xl flex">
          {/* <span>CV</span> */}
          <BsPersonVcardFill />
        </Link>
      </header>
      <div className="flex justify-around">
        <div className="w-1/3">
          <article
            dangerouslySetInnerHTML={{ __html: content.body }}
            className="text-2xl text-white"
          ></article>
        </div>
        <div className="w-1/3">
          <Image
            src={CMS_URL + content.images.attributes.url}
            width="1000"
            height="480"
            alt="image"
          />
        </div>
      </div>
    </>
  );
};

export default About;
