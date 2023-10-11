"use client";
import Link from "next/link";
import { useState } from "react";
import { FiInstagram, FiVideo, FiMail } from "react-icons/fi";
import { TfiVimeo } from "react-icons/tfi";

import { AiOutlineMail, AiOutlineInstagram } from "react-icons/ai";

//TODO: email/instagram/vimeo should be added to strapi, and fetched from there.
const email = ""; //has to be fetched from strapi
const instagram = "#"; //has to be fetched from strapi
const vimeo = "#"; //has to be fetched from strapi

const NavBar = () => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <nav>
      <div className="flex justify-between bg-gray-700 text-white py-4 ">
        <p
          className="text-xl p-2 basis-1/3"
          onClick={() => setShowMenu(!showMenu)}
        >
          Menu
        </p>
        <p className="text-center text-4xl basis-1/3">Iokasti Diskasty</p>
        <div className="flex basis-1/3 justify-end">
          <Link href={`mailto: ${email}`}>
            <FiMail />
          </Link>
          <Link
            href={{
              pathname: `${instagram}`,
              // target: "_blank",
            }}
      
          >
            <FiInstagram />
          </Link>
          <Link href={vimeo}>
            <TfiVimeo />
          </Link>
        </div>
      </div>

      {showMenu && (
        <ul>
          <li onClick={() => setShowMenu(!showMenu)}>
            <Link href="/">Home</Link>
          </li>
          <li onClick={() => setShowMenu(!showMenu)}>
            <Link href="/about" prefetch={false}>
              About
            </Link>
          </li>
          <li onClick={() => setShowMenu(!showMenu)}>
            <Link href="/projects">Projects</Link>
          </li>
          <li onClick={() => setShowMenu(!showMenu)}>
            <Link href="/news">News</Link>
          </li>
          <li onClick={() => setShowMenu(!showMenu)}>
            <Link href="/teaching">Teaching</Link>
          </li>
          <li onClick={() => setShowMenu(!showMenu)}>
            <Link href="/notebook">Notebook</Link>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default NavBar;
