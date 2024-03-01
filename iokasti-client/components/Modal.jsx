import React from 'react';
import styles from './modal.module.scss';
import Image from "next/image";

const CMS_URL = process.env.NEXT_PUBLIC_ENV_VPS_SERVER;


const Modal = ({ modalImageUrl, onClose }) => {
    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
          onClose(); // Close the modal only if the click was on the overlay, not the modal content
        }
      };
    console.log("modal", modalImageUrl)
  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.modal}>
      <Image
              src={modalImageUrl.url}
              width={modalImageUrl.width}
              height={modalImageUrl.height}
              alt={modalImageUrl.alt}
            />
      </div>
    </div>
  );
};

export default Modal;
