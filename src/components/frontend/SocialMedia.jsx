import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { ImAndroid } from "react-icons/im";
import styles from "../../styles/frontend/socialmedia.module.css";
import "../../index.css";

const SocialMedia = () => {
  return (
    <>
      <div className={`${styles["social-media"]}`}>
        <ul>
          <li>
            <a
              className={styles.facebook}
              href="#"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebookF />
            </a>
          </li>
          <li>
            <a
              className={styles.twitter}
              href="#"
              target="_blank"
              rel="noopener noreferrer"
            >
              <BsTwitterX />
            </a>
          </li>
          <li>
            <a
              className={styles.instagram}
              href="#"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram />
            </a>
          </li>
          <li>
            <a
              className={styles.youtube}
              href="#"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaYoutube />
            </a>
          </li>
          <li>
            <a
              className={styles.android}
              href="#"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ImAndroid />
            </a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default SocialMedia;
