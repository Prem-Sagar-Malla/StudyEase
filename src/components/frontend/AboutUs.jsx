import { Link } from "react-router-dom";
import styles from "../../styles/frontend/aboutus.module.css";

const AboutUs = () => {
  return (
    <>
      {/* About Us Section */}
      <section className={`about-us ${styles["custom-margin"]}`}>
        <div className="container my-4">
          <div className="row gy-4">
            <div className="col-lg-6 col-md-12 col-sm-12 text-background">
              <h1 className={`${styles["section-heading"]}`}>
                Only Study Ease gives you the effective knowledge.
              </h1>
              <div>
                <p>
                  Welcome to Study Ease, An education portal and, your
                  gateway to the world of Knowledge. We are a dedicated team of
                  artists and enthusiasts who are passionate about creating
                  meaningful, spiritual, and visually captivating artworks
                  rooted in Buddhist traditions. At Study Ease Pvt.
                  Ltd, we believe that knowledge has the power to transcend boundaries
                  and touch the depths of the human spirit. We draw inspiration
                  from the profound wisdom and timeless teachings of Buddhism to
                  craft exquisite pieces that radiate serenity, mindfulness, and
                  enlightenment. Our artists combine their deep understanding of
                  Buddhist philosophy with thei...
                </p>
              </div>
              <div className={`${styles["custom-buttons"]} custom-buttons`}>
                <Link to="/about-us">Learn More</Link>
              </div>
            </div>
            <div className="col-lg-6 col-md-12 col-sm-12">
              <figure>
                <img
                  className={styles.image}
                  src="../nepal.jpg"
                  alt="study-ease"
                />
              </figure>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutUs;
