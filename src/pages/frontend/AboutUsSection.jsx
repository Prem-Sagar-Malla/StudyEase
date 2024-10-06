import React from "react";
import styles from "../../styles/frontend/aboutus.module.css";
import CEO from "../../components/frontend/CEO";
import Different from "../../components/frontend/Different";

const AboutUsSection = () => {
  return (
    <>
      <div className={`${styles["breadcrumbs-section-wrapper"]}`}>
        <div className="container">
          <div className={`${styles["page-heading"]}`}>About Us</div>
        </div>
      </div>

      <section className={`${styles["custom-margin"]} about-us `}>
        <div className="container">
          <div className="row gy-4">
            <div className="col-lg-6 col-md-12 col-sm-12 text-background">
              <h1 className={`${styles["section-heading"]}`}>
                Only Moon and Dragon change your dream design into reality.
              </h1>
              <div>
                <p className="my-3">
                  Welcome to Moon and Dragon Builder Pvt. Ltd,&nbsp; Buddhist
                  Arts Contracting Company, your gateway to the world of
                  Buddhist-inspired art and design. We are a dedicated team of
                  artists and enthusiasts who are passionate about creating
                  meaningful, spiritual, and visually captivating artworks
                  rooted in Buddhist traditions. At Moon and Dragon Builder Pvt.
                  Ltd, we believe that art has the power to transcend boundaries
                  and touch the depths of the human spirit. We draw inspiration
                  from the profound wisdom and timeless teachings of Buddhism to
                  craft exquisite pieces that radiate serenity, mindfulness, and
                  enlightenment. Our artists combine their deep understanding of
                  Buddhist philosophy with their exceptional artistic skills to
                  create designs that embody the essence of compassion, wisdom,
                  and interconnectedness. Each brushstroke, sculpture, or
                  digital creation is infused with intention, love, and a
                  sincere desire to awaken the spiritual consciousness within
                  each viewer. We offer a diverse range of art forms, including
                  paintings, sculptures, mandalas,, and contemporary designs,
                  all crafted with meticulous attention to detail and an
                  unwavering commitment to authenticity. Our creations not only
                  reflect the rich heritage of Buddhist art but also embrace
                  innovative techniques and interpretations to resonate with
                  modern sensibilities.
                </p>
                <h2>1. Mission:</h2>
                <p className="my-2">
                  Our mission is to create captivating and spiritually-inspired
                  designs that embody the essence of Buddhist teachings,
                  fostering a sense of peace, harmony, and enlightenment. We aim
                  to bridge the gap between art and spirituality, offering
                  transformative experiences through our artistic creations.
                </p>
                <h2>2. Vision:</h2>
                <p className="my-3">
                  Our vision is to be a leading provider of Buddhist-inspired
                  art, renowned for our ability to evoke deep emotions, inspire
                  mindfulness, and awaken spiritual consciousness. We strive to
                  become a global platform that showcases the beauty and wisdom
                  of Buddhist art, promoting cross-cultural understanding and
                  appreciation.
                </p>
                <h2>3. Values:</h2>
                <p className="my-3">
                  Our main values are Spiritual Integrity,&nbsp;Creativity and
                  Innovation,&nbsp;Mindful Design, Cultural Appreciation,
                  Environmental Responsibility, Client Collaboration, Excellence
                  and Craftsmanship &amp; Social Impact.
                </p>
                <p className="my-3">
                  These mission, vision, and values guide our work, shaping our
                  creative process and influencing the designs we produce. We
                  are committed to spreading the beauty, wisdom, and
                  transformative power of Buddhist art to inspire and uplift
                  individuals on their spiritual journey.
                </p>
              </div>
            </div>
            <div className="col-lg-6 col-md-12 col-sm-12">
              <figure>
                <img
                  src="./nepal.jpg"
                  alt="Only Solution Nepal change your dream design into reality."
                  className={`${styles["about-us-cover-image"]}`}
                />
              </figure>
            </div>
          </div>
        </div>
        <CEO />
        <Different />
      </section>
    </>
  );
};

export default AboutUsSection;
