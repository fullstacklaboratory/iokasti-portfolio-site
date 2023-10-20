"use client";
import { getLandPage } from "@/lib/landpage";
import Link from "next/link";
import { useState } from "react";
import { FiInstagram, FiVideo, FiMail } from "react-icons/fi";
import { TfiVimeo } from "react-icons/tfi";
import "./navbar.css";

//TODO: email/instagram/vimeo should be added to strapi, and fetched from there.
const email = ""; //has to be fetched from strapi
const instagram = "#"; //has to be fetched from strapi
const vimeo = "#"; //has to be fetched from strapi

const NavBar = ({ navData }) => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <nav className="flex flex-col h-1">
      <div className="flex justify-between h-20 bg-gray-700 text-white py-4 ">
        <p
          className="text-xl p-2 basis-1/3 cursor-pointer"
          onClick={() => setShowMenu(!showMenu)}
        >
          Menu
        </p>
        <p className="text-center text-4xl basis-1/3">{navData.name}</p>
        <div className="flex basis-1/3 justify-end text-2xl ">
          <Link href={`mailto: ${navData.email}`} className="m-2">
            <FiMail />
          </Link>
          <Link href={navData.instagramLink} target="_blank" className="m-2">
            <FiInstagram />
          </Link>
          <Link href={navData.vimeoLink} target="_blank" className="m-2">
            <TfiVimeo />
          </Link>
        </div>
      </div>

      {showMenu && (
        <ul className="w-1/4 text-3xl grow bg-gray-700 text-white flex flex-col p-5 justify-around slide-in-box h-screen">
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
            <Link href="/collabs">Collaborations</Link>
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
