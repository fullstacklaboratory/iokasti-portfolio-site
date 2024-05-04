import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import styles from "./modal.module.scss";

const backdrop = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

const modal = {
  hidden: { y: "-10vh", opacity: 0 },
  visible: {
    y: "0px",
    opacity: 1,
    transition: { delay: 0.2, type: "spring", stiffness: 300, damping: 20 },
  },
};

const Modal = ({ modalContent, onClose }) => {
  useEffect(() => {
    const closeOnEscapeKeyDown = (e) => {
      if ((e.charCode || e.keyCode) === 27) {
        onClose();
      }
    };
    window.addEventListener("keydown", closeOnEscapeKeyDown);

    return () => window.removeEventListener("keydown", closeOnEscapeKeyDown);
  }, [onClose]);

  return (
    <AnimatePresence>
      {modalContent.url && (
        <motion.div
          className={styles.backdrop}
          variants={backdrop}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={onClose}
        >
          <motion.img
            src={modalContent.url}
            alt={modalContent.alt}
            className={styles.modal}
            variants={modal}
            layout
            onClick={(e) => e.stopPropagation()}
          />
          {/* <motion.p
          variants={modal}>
            {modalContent.description}
          </motion.p> */}
          <button className={styles.closeButton} onClick={onClose}>
            x
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
