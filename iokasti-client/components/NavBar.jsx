"use client";
import Link from "next/link";
import { useState } from "react";
import { FiInstagram, FiMail } from "react-icons/fi";
import { TfiVimeo } from "react-icons/tfi";
import "./navbar.css";

//TODO: email/instagram/vimeo should be added to strapi, and fetched from there.
const email = ""; //has to be fetched from strapi
const instagram = "#"; //has to be fetched from strapi
const vimeo = "#"; //has to be fetched from strapi

const textHoverColor = "hover:text-amber-400";

const NavBar = ({ navData }) => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <nav className="flex flex-row justify-between items-center text-white w-full p-4 border-b border-b-white bg-slate-700/30 hover:bg-slate-700/90 transition duration-300 ease-in-out">
      <div
        className={`${textHoverColor} basis-1/3 cursor-pointer`}
        onClick={() => setShowMenu(!showMenu)}
        aria-label="Main menu"
      >
        Menu
      </div>
      <h1 className={`text-center uppercase text-xl sm:text-m`}>
        <Link
          aria-label="Navigate to Home"
          href="/"
          className={`${textHoverColor} `}
        >
          {navData.siteTitle}
        </Link>
      </h1>

      <ul
        aria-label="Contact and social links"
        className="basis-1/3 flex flex-row flex-wrap justify-end leading-[0rem]"
      >
        <li
          className={`${textHoverColor} m-4 hover:text-amber-400 transition duration-150 ease-in-out`}
        >
          <Link
            aria-label={`Send an email to ${navData.siteTitle}`}
            href={`mailto: ${navData.email}`}
            target="_blank"
          >
            <FiMail />
          </Link>
        </li>
        <li
          className={`${textHoverColor} m-4 hover:text-amber-400 transition duration-150 ease-in-out`}
        >
          <Link
            href={navData.instagram}
            aria-label="Open Instagram on a new tab"
            target="_blank"
            className="m-4"
          >
            <FiInstagram />
          </Link>
        </li>
        <li
          className={`${textHoverColor} m-4 hover:text-amber-400 transition duration-150 ease-in-out`}
        >
          <Link
            href={navData.vimeo}
            aria-label="Open Vimeo on a new tab"
            target="_blank"
            className="m-4"
          >
            <TfiVimeo />
          </Link>
        </li>
      </ul>

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
