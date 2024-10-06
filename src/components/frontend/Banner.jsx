import React from "react";
import SocialMedia from "./SocialMedia";
import styles from "../../styles/frontend/banner.module.css";
import "../../index.css";

const Banner = () => {
  return (
    <div className={styles.banner}>
      <img src="http://localhost:5173/study-ease.png" alt="study-ease" />
      <div className={`${styles["banner-contains"]}`}>
        <div className={`${styles["banner-heading"]} ${styles.cursor} ${styles["typewriter-animation"]}`}>Study Ease</div>
      </div>
      <SocialMedia />
    </div>
  );
};

export default Banner;
