"use client";
import Link from "next/link";
import { useState } from "react";
import { BsVimeo } from "react-icons/bs";

import {
  AiOutlineMail,
  AiOutlineInstagram,
} from "react-icons/ai";

const NavBar = () => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <nav>
      <div className="flex justify-between bg-gray-700 text-white py-4">
        <p className="text-xl p-2 basis-1/3" onClick={() => setShowMenu(!showMenu)}>
          Menu
        </p>
        <p className="text-center text-4xl basis-1/3">Iokasti Diskasty</p>
        <div className="flex basis-1/3 justify-end">
          <p className="text-xl flex  items-center mr-4">
            {" "}
            <AiOutlineMail /> <span className="ml-1"> email </span>
          </p>
          <p className="text-xl flex  items-center mr-4">
            {" "}
            <AiOutlineInstagram /> <span className="ml-1">
             
              instagram
            </span>
          </p>
          <p className="text-xl flex  items-center mr-4">
            <BsVimeo/>
            <span className="ml-1">
             
              Vimeo
            </span>
          </p>
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
