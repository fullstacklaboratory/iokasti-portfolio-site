"use client";
import Link from "next/link";
import { useState } from "react";
import { FiInstagram, FiMail } from "react-icons/fi";
import { TfiVimeo } from "react-icons/tfi";
import "./navbar.css";
import { AnimatePresence, motion, Variants } from "framer-motion";

const textHoverColor = "hover:text-amber-400";

const itemVariants = {
  open: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
  closed: { opacity: 0, y: 20, transition: { duration: 0.2 } },
};

const NavBar = ({ navData, newsData }) => {
  //check news data heigth and change menu height accordingly

  const [showMenu, setShowMenu] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  if (!navData.error) {
    return (
      <motion.nav initial={false} animate={isOpen ? "open" : "closed"}>
        <motion.div className="flex flex-row justify-between items-center text-white w-full border-b border-b-white bg-slate-700/30 hover:bg-slate-700/90 transition duration-300 ease-in-out backdrop-blur-sm h-[7vh]">
          <motion.button
            className="basis-1/3 menu__button flex items-center ml-4 text-sm sm:text-md"
            whileTap={{ scale: 0.97 }}
            onClick={() => setIsOpen(!isOpen)}
          >
            Menu
            <motion.div
              className="ml-2"
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

          <div className="basis-2/3 sm:basis-1/3">
            <h1
              className={`text-center uppercase text-sm sm:text-base md:text-lg`}
            >
              <Link
                onClick={() => setIsOpen(false)}
                aria-label="Site Title - Navigate to Home"
                href="/"
                className={`${textHoverColor} transition duration-150 ease-in-out `}
              >
                {navData.siteTitle}
              </Link>
            </h1>
          </div>
          <ul
            aria-label="Contact and social links"
            className="basis-1/3 flex flex-row flex-wrap justify-end leading-[0rem] invisible sm:visible"
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
              <a
                href={navData.instagram}
                aria-label="Open Instagram on a new tab"
                target="_blank"
                className="m-4"
              >
                <FiInstagram />
              </a>
            </li>
            <li
              className={`${textHoverColor} m-4 hover:text-amber-400 transition duration-150 ease-in-out`}
            >
              <a
                href={navData.vimeo}
                aria-label="Open Vimeo on a new tab"
                target="_blank"
                className="m-4"
              >
                <TfiVimeo />
              </a>
            </li>
          </ul>
        </motion.div>

        <motion.ul
          className="list_ul flex flex-col justify-center items-center gap-4 backdrop-blur-sm  bg-slate-700/30"
          onClick={() => setIsOpen(!isOpen)}
          variants={{
            open: {
              clipPath: "inset(0% 0% 0% 0% round 0px)",
              height: "93vh",
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
                clipPath: {
                  type: "spring",
                  bounce: 0,
                  duration: 0.3,
                },
                height: {
                  duration: 0.4,
                },
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
    );
  } else return <div>{navData.error}</div>;
};

export default NavBar;
