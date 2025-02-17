"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { FiInstagram, FiMail } from "react-icons/fi";
import { TfiVimeo } from "react-icons/tfi";
import styles from "./navbar.module.scss";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { gothic_One } from "@/app/fonts";

const itemVariants = {
  open: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
  closed: { opacity: 0, y: 20, transition: { duration: 0.2 } },
};

const NavBar = ({ navData, newsData }) => {
  console.log(navData.siteTitle)
  const [isOpen, setIsOpen] = useState(false);
  const firstMenuItemRef = useRef(null);
  const menuButtonRef = useRef(null);

  useEffect(() => {
    // Check if window is defined (we are in the browser and not on the server)
    if (typeof window !== "undefined") {
      const handleKeyDown = (event) => {
        if (event.key === "Escape") {
          setIsOpen(false);
        }
      };

      window.addEventListener("keydown", handleKeyDown);

      // Clean up the event listener on component unmount
      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, []);

  useEffect(() => {
    if (isOpen && firstMenuItemRef.current) {
      firstMenuItemRef.current.focus(); // Move focus to the first menu item when menu opens
    }
  }, [isOpen]);

  return (
    <motion.nav
      initial={false}
      animate={isOpen ? "open" : "closed"}
      role="navigation"
      aria-label="Main Navigation"
      // onMouseEnter={() => setIsOpen(true)}
      // onMouseLeave={() => setIsOpen(false)}
    >
      <motion.div className={styles.navBar}>
        <motion.button
          ref={menuButtonRef}
          role="button"
          className={styles.menu__button}
          whileTap={{ scale: 0.97 }}
          onClick={() => setIsOpen(!isOpen)}
          tabIndex="0" // Makes the element focusable
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

        <div className={styles.siteTitle}>
          <h1>
            <Link
              onClick={() => setIsOpen(false)}
              aria-label="Site Title - Navigate to Home"
              href="/"
              className={`${styles.siteTitleLink} ${gothic_One.className}`}
            >
              {navData.siteTitle}
            </Link>
          </h1>
        </div>
        <ul
          aria-label="Social media and contact links"
          className={styles.contactLinks}
        >
          <li className={styles.contactLinkItem}>
            <Link
              aria-label={`Link to contact ${navData.siteTitle} via email`}
              href={`mailto: ${navData.email}`}
              target="_blank"
            >
              <FiMail />
            </Link>
          </li>
          <li className={styles.contactLinkItem}>
            <a
              href={navData.instagram}
              aria-label={`Link to ${navData.siteTitle}'s Instagram page`}
              target="_blank"
              className="m-4"
            >
              <FiInstagram />
            </a>
          </li>
          <li className={styles.contactLinkItem}>
            <a
              href={navData.vimeo}
              aria-label={`Link to ${navData.siteTitle}'s Vimeo page`}
              target="_blank"
              className="m-4"
            >
              <TfiVimeo />
            </a>
          </li>
        </ul>
      </motion.div>

      <motion.ul
        className={styles.list_ul}
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
          ref={firstMenuItemRef}
          variants={itemVariants}
          className={styles.listItem}
          onClick={() => setIsOpen(!isOpen)}
          // tabIndex="0" // Makes the element focusable
          role="button" // Describes the role of the element
          onKeyPress={(event) => {
            // Makes the element interactive with the keyboard
            const key = event.key;
            if (key === "Enter" || key === " ") {
              setIsOpen(!isOpen);
              window.location.href = "/";
            }
          }}
        >
          <Link href="/">Home</Link>
        </motion.li>
        <motion.li
          variants={itemVariants}
          className={styles.listItem}
          onClick={() => setIsOpen(!isOpen)}
          // tabIndex="0" // Makes the element focusable
          role="button" // Describes the role of the element
          onKeyPress={(event) => {
            // Makes the element interactive with the keyboard
            const key = event.key;
            if (key === "Enter" || key === " ") {
              setIsOpen(!isOpen);
            }
          }}
        >
          <Link href="/about">About</Link>
        </motion.li>
        <motion.li
          variants={itemVariants}
          className={styles.listItem}
          onClick={() => setIsOpen(!isOpen)}
          // tabIndex="0" // Makes the element focusable
          role="button" // Describes the role of the element
          onKeyPress={(event) => {
            // Makes the element interactive with the keyboard
            const key = event.key;
            if (key === "Enter" || key === " ") {
              setIsOpen(!isOpen);
            }
          }}
        >
          <Link href="/projects">Projects</Link>
        </motion.li>
        <motion.li
          variants={itemVariants}
          className={styles.listItem}
          onClick={() => setIsOpen(!isOpen)}
          // tabIndex="0" // Makes the element focusable
          role="button" // Describes the role of the element
          onKeyPress={(event) => {
            // Makes the element interactive with the keyboard
            const key = event.key;
            if (key === "Enter" || key === " ") {
              setIsOpen(!isOpen);
            }
          }}
        >
          <Link href="/collaborations">Collaborations</Link>
        </motion.li>
        <motion.li
          variants={itemVariants}
          className={styles.listItem}
          onClick={() => setIsOpen(!isOpen)}
          // tabIndex="0" // Makes the element focusable
          role="button" // Describes the role of the element
          onKeyPress={(event) => {
            // Makes the element interactive with the keyboard
            const key = event.key;
            if (key === "Enter" || key === " ") {
              setIsOpen(!isOpen);
            }
          }}
        >
          <Link href="/facilitating">Facilitating</Link>
        </motion.li>

        <motion.li
          variants={itemVariants}
          className={styles.listItem}
          onClick={() => setIsOpen(!isOpen)}
          role="button" // Describes the role of the element
          onKeyPress={(event) => {
            // Makes the element interactive with the keyboard
            const key = event.key;
            if (key === "Enter" || key === " ") {
              setIsOpen(!isOpen);
            }
          }}
        >
          <Link href="/pelagos">Pelagos</Link>
        </motion.li>

        <motion.li className={styles.socialIcons} variants={itemVariants}>
          <Link
            aria-label={`Link to contact ${navData.siteTitle} via email`}
            href={`mailto: ${navData.email}`}
            target="_blank"
          >
            <FiMail />
          </Link>
          <a
            href={navData.instagram}
            aria-label={`Link to ${navData.siteTitle}'s Instagram page`}
            target="_blank"
          >
            <FiInstagram />
          </a>
          <a
            href={navData.vimeo}
            aria-label={`Link to ${navData.siteTitle}'s Vimeo page`}
            target="_blank"
          >
            <TfiVimeo />
          </a>
          {/* Add more social icons as needed */}
        </motion.li>
      </motion.ul>
    </motion.nav>
  );
};

export default NavBar;
