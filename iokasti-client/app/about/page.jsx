import { getAbout } from "@/lib/about";
import Image from "next/image";
import Link from "next/link";
import { BsPersonVcardFill } from "react-icons/bs";

export const metadata = {
  title: "About",
};

const CMS_URL = "http://localhost:1337";

const About = async () => {
  const content = await getAbout();
  console.log(content);
  return (
    <>
      <header className="flex justify-between p-3 items-center text-white">
        <h1 className="text-4xl">About {content.title}</h1>
        <Link
          href={`http://localhost:1337/uploads/CV_Vassilis_Skrimpas_2023_b288fae117.pdf`}
          target="_blank"
          className="text-3xl flex"
        >
          <span>CV</span>
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

      {/* <iframe
        className="w-screen h-screen"
        src="/2023.pdf"
        frameborder="0"
      ></iframe> */}
    </>
  );
};

export default About;
