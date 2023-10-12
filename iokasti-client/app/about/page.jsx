import { getAbout } from "@/lib/about";
import Image from "next/image";
import Link from "next/link";
import { BsPersonVcardFill } from "react-icons/bs";

export const metadata = {
  title: "About",
};

const CMS_URL = "http://localhost:1337";


const About = async () => {
  const content = await getAbout()
  console.log(content)
  return (
    <>
    <header className="flex justify-between p-3 items-center">
    <h1 className="text-4xl">About {content.title}</h1>
    <Link href={`/about/cv`} className="text-3xl">
      <span>CV</span>
    <BsPersonVcardFill/>
    </Link>
    </header>

      <Image
            src={CMS_URL + content.images.attributes.url}
            width="1200"
            height="480"
            alt="image"
          />

      <h2 className="text-3xl">Artistic Statement</h2>
      <article
        dangerouslySetInnerHTML={{ __html: content.body }}
        className="text-2xl"
      ></article>



      {/* <iframe
        className="w-screen h-screen"
        src="/2023.pdf"
        frameborder="0"
      ></iframe> */}
    </>
  );
};

export default About;
