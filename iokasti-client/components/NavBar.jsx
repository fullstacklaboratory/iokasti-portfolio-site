"use client";
import Link from "next/link";
import { useState } from "react";
import { FiInstagram, FiMail } from "react-icons/fi";
import { TfiVimeo } from "react-icons/tfi";
import "./navbar.css";
import { AnimatePresence, motion, Variants } from "framer-motion";

//TODO: email/instagram/vimeo should be added to strapi, and fetched from there.
const email = ""; //has to be fetched from strapi
const instagram = "#"; //has to be fetched from strapi
const vimeo = "#"; //has to be fetched from strapi

const textHoverColor = "hover:text-amber-400";
const itemVariants = {
  open: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
  closed: { opacity: 0, y: 20, transition: { duration: 0.2 } },
};

const NavBar = ({ navData }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  if (!navData.error) {
    return (
      <motion.nav initial={false} animate={isOpen ? "open" : "closed"}>
        <motion.div className="flex flex-row justify-between items-center text-white w-full border-b border-b-white bg-slate-700/30 hover:bg-slate-700/90 transition duration-300 ease-in-out backdrop-blur-sm">
          <motion.button
            className="basis-1/3 menu__button flex items-center m-4"
            whileTap={{ scale: 0.97 }}
            onClick={() => setIsOpen(!isOpen)}
          >
            Menu
            <motion.div
              className="m-4"
              variants={{
                open: { rotate: 180 },
                closed: { rotate: 0 },
              }}
              transition={{ duration: 0.2 }}
              style={{ originY: 0.55 }}
            >
              <svg width="15" height="15" viewBox="0 0 20 20">
                <path d="M0 7 L 20 7 L 10 16" />
              </svg>
            </motion.div>
          </motion.button>

          <motion.div>
            <h1 className={`text-center uppercase text-xl sm:text-m basis-1/3`}>
              <Link
                onClick={() => setIsOpen(false)}
                aria-label="Site Title - Navigate to Home"
                href="/"
                className={`${textHoverColor} transition duration-150 ease-in-out `}
              >
                {navData.siteTitle}
              </Link>
            </h1>
          </motion.div>
          <motion.ul
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
          </motion.ul>
        </motion.div>

        <motion.ul
          className="list_ul flex flex-col items-center gap-3 backdrop-blur-sm  bg-slate-700/30 "
          onClick={() => setIsOpen(!isOpen)}
          variants={{
            open: {
              clipPath: "inset(0% 0% 0% 0% round 0px)",
              height: "100vh",
              transition: {
                type: "spring",
                bounce: 0,
                duration: 0.7,
                delayChildren: 0.3,
                staggerChildren: 0.05,
              },
            },
            closed: {
              clipPath: "inset(10% 50% 90% 50% round 100px)",
              height: "0vh",
              transition: {
                type: "spring",
                bounce: 0,
                duration: 0.3,
              },
            },
          }}
          style={{ pointerEvents: isOpen ? "auto" : "none" }}
        >
          <motion.li
            variants={itemVariants}
            className={`${textHoverColor} text-white `}
            onClick={() => setIsOpen(!isOpen)}
          >
            <Link href="/">Home</Link>
          </motion.li>
          <motion.li
            variants={itemVariants}
            className={`${textHoverColor} text-white `}
            onClick={() => setIsOpen(!isOpen)}
          >
            <Link href="/about">About</Link>
          </motion.li>
          <motion.li
            variants={itemVariants}
            className={`${textHoverColor} text-white `}
            onClick={() => setIsOpen(!isOpen)}
          >
            <Link href="/projects">Projects</Link>
          </motion.li>
          <motion.li
            variants={itemVariants}
            className={`${textHoverColor} text-white`}
            onClick={() => setIsOpen(!isOpen)}
          >
            <Link href="/collabs">Collaborations</Link>
          </motion.li>
          <motion.li
            variants={itemVariants}
            className={`${textHoverColor} text-white `}
            onClick={() => setIsOpen(!isOpen)}
          >
            <Link href="/news">News</Link>
          </motion.li>
          <motion.li
            variants={itemVariants}
            className={`${textHoverColor} text-white `}
            onClick={() => setIsOpen(!isOpen)}
          >
            <Link href="/teaching">Teaching</Link>
          </motion.li>
          <motion.li
            variants={itemVariants}
            className={`${textHoverColor} text-white `}
            onClick={() => setIsOpen(!isOpen)}
          >
            <Link href="/notebook">Notebook</Link>
          </motion.li>
        </motion.ul>
      </motion.nav>
      // <nav className="flex flex-row justify-between items-center text-white w-full p-4 border-b border-b-white bg-slate-700/30 hover:bg-slate-700/90 transition duration-300 ease-in-out backdrop-blur-sm">
      //   <div
      //     className={`basis-1/3`}
      //     onClick={() => setShowMenu(!showMenu)}
      //     aria-label="Main menu"
      //   >
      //     <span
      //       className={` cursor-pointer ${textHoverColor} transition duration-150 ease-in-out`}
      //     >
      //       Menu
      //     </span>
      //   </div>
      //   <h1 className={`text-center uppercase text-xl sm:text-m basis-1/3`}>
      //     <Link
      //       aria-label="Navigate to Home"
      //       href="/"
      //       className={`${textHoverColor} transition duration-150 ease-in-out `}
      //     >
      //       {navData.siteTitle}
      //     </Link>
      //   </h1>

      //   <ul
      //     aria-label="Contact and social links"
      //     className="basis-1/3 flex flex-row flex-wrap justify-end leading-[0rem]"
      //   >
      //     <li
      //       className={`${textHoverColor} m-4 hover:text-amber-400 transition duration-150 ease-in-out`}
      //     >
      //       <Link
      //         aria-label={`Send an email to ${navData.siteTitle}`}
      //         href={`mailto: ${navData.email}`}
      //         target="_blank"
      //       >
      //         <FiMail />
      //       </Link>
      //     </li>
      //     <li
      //       className={`${textHoverColor} m-4 hover:text-amber-400 transition duration-150 ease-in-out`}
      //     >
      //       <Link
      //         href={navData.instagram}
      //         aria-label="Open Instagram on a new tab"
      //         target="_blank"
      //         className="m-4"
      //       >
      //         <FiInstagram />
      //       </Link>
      //     </li>
      //     <li
      //       className={`${textHoverColor} m-4 hover:text-amber-400 transition duration-150 ease-in-out`}
      //     >
      //       <Link
      //         href={navData.vimeo}
      //         aria-label="Open Vimeo on a new tab"
      //         target="_blank"
      //         className="m-4"
      //       >
      //         <TfiVimeo />
      //       </Link>
      //     </li>
      //   </ul>

      //   {showMenu && (
      //     <ul className="absolute top-[5.1rem] left-0 w-full text-3xl grow bg-gray-700 text-white flex flex-col p-5 justify-around slide-in-box h-screen">
      //       <li onClick={() => setShowMenu(!showMenu)}>
      //         <Link href="/">Home</Link>
      //       </li>
      //       <li onClick={() => setShowMenu(!showMenu)}>
      //         <Link href="/about" prefetch={false}>
      //           About
      //         </Link>
      //       </li>
      //       <li onClick={() => setShowMenu(!showMenu)}>
      //         <Link href="/projects">Projects</Link>
      //       </li>
      //       <li onClick={() => setShowMenu(!showMenu)}>
      //         <Link href="/collabs">Collaborations</Link>
      //       </li>
      //       <li onClick={() => setShowMenu(!showMenu)}>
      //         <Link href="/news">News</Link>
      //       </li>
      //       <li onClick={() => setShowMenu(!showMenu)}>
      //         <Link href="/teaching">Teaching</Link>
      //       </li>
      //       <li onClick={() => setShowMenu(!showMenu)}>
      //         <Link href="/notebook">Notebook</Link>
      //       </li>
      //     </ul>
      //   )}
      // </nav>
    );
  } else return <div>{navData.error}</div>;
};

export default NavBar;
