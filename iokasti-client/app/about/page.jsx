import { getAbout } from "@/lib/about";
import Image from "next/image";
import Link from "next/link";
import { BsPersonVcardFill } from "react-icons/bs";

export const metadata = {
  title: "About",
};

const CMS_URL = process.env.NEXT_PUBLIC_ENV_VPS_SERVER;

const About = async () => {
  const content = await getAbout();
  console.log(content.cv);
  return (
    <>
      <header className="flex justify-between p-3 items-center text-white">
        <h1 className="text-4xl">About {content.title}</h1>
        
          <object
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
          </object>
          <Link href={content.cv}>cv</Link>
          {/* <span>CV</span> */}
          {/* <BsPersonVcardFill /> */}
  
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
