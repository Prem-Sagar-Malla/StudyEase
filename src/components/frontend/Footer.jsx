import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import styles from "../../styles/frontend/footer.module.css";
import "../../index.css";

const Footer = () => {
  return (
    <>
      <footer>
        <div className="container-fluid">
          <div className={`${styles.row} row pt-2`}>
            <div className={styles.item}>
              <span className={`${styles.h5} h5`}>Popular Searches</span>
              <ul className="my-2">
                <li className="my-1">
                  <a href="#" title="Top Plus Two College in Kathmandu">
                    Plus Two Notes
                  </a>
                </li>
                <li className="my-1">
                  <a href="#" title="Medical Study in Nepal">
                    Medical Study in Nepal
                  </a>
                </li>
                <li className="my-1">
                  <a href="#" title="IT Colleges in Kathmandu">
                    IT Colleges in Kathmandu
                  </a>
                </li>
                <li className="my-1">
                  <a href="#" title="After SLC">
                    After SLC
                  </a>
                </li>
                <li className="my-1">
                  <a href="#" title="CA Course in Nepal">
                    CA Course in Nepal
                  </a>
                </li>
                <li className="my-1">
                  <a href="#" title="Engineering Study in Nepal">
                    Engineering Study in Nepal
                  </a>
                </li>
                <li className="my-1">
                  <a href="#" title="BBS Old Questions TU">
                    BBS Old Questions TU
                  </a>
                </li>
              </ul>
              <a href="#" title="List of all content">
                <strong>View all Content</strong>
              </a>
            </div>

            <div className={styles.item}>
              <span className={`${styles.h5} h5`}>Resources</span>
              <ul className="my-2">
                <li className="my-1">
                  <a href="#" title="Search CMAT">
                    CMAT Class
                  </a>
                </li>
                <li className="my-1">
                  <a href="#" title="TU Old question">
                    TU Old question paper(s)
                  </a>
                </li>
                <li className="my-1">
                  <a href="#" title="KU Old question">
                    KU Old question paper(s)
                  </a>
                </li>
                <li className="my-1">
                  <a href="#" title="Course">
                    Course
                  </a>
                </li>
              </ul>
            </div>

            <div className={styles.item}>
              <span className={`${styles.h5} h5`}>Important Links</span>
              <div id="fbHolder"></div>
              <ul className="my-2">
                <li className="my-1">
                  <a href="#" title="Solution Nepal Home Page">
                    Home
                  </a>
                </li>
                <li className="my-1">
                  <a href="#" title="About Solution Nepal">
                    About us
                  </a>
                </li>
                <li className="my-1">
                  <a href="#" title="Blogs">
                    Blogs
                  </a>
                </li>
                <li className="my-1">
                  <a href="#" title="Privacy Policy">
                    Privacy Policy
                  </a>
                </li>
                <li className="my-1">
                  <a href="#" title="Terms and Conditions">
                    Terms and Conditions
                  </a>
                </li>
                <li className="my-1">
                  <a href="#" title="Sitemap">
                    Sitemap
                  </a>
                </li>
              </ul>
            </div>

            <div className={styles.item}>
              <h1>Study Ease</h1>
              <p style={{ color: "#fff" }}>
                An educational portal that helps to search academic institutions
                like universities, colleges, institute, schools and presents
                various educational affairs, news, notices, career related
                information.
              </p>
              <span className={`${styles.h5} h5 my-3`}>Get In Touch</span>
              <ul>
                <li className="my-1">Study Ease</li>
                <li className="my-1">Putalisadak, Kathmandu</li>
                <li className="my-1">Phone: 9860163781</li>
                <li className="my-1">Email: premsagarmalla777@gmail.com</li>
              </ul>
            </div>
          </div>
          <hr className="container-fluid" style={{ color: "#fff" }} />

          <div className={`${styles["copy-right-social-media-links"]}`}>
            <div className={styles.container}>
              <div className={`${styles.wrapper} wrapper`}>
                <span> &#169; Study Ease, All Rights Reserved 2024.</span>

                <div className={`${styles.socialMedia} ${styles.social}`}>
                  <ul>
                    <li>
                      <a className={styles.facebook} href="#" target="_blank">
                        <FaFacebookF />
                      </a>
                    </li>
                    <li>
                      <a className={styles.twitter} href="#" target="_blank">
                        <BsTwitterX />
                      </a>
                    </li>
                    <li>
                      <a className={styles.instagram} href="#" target="_blank">
                        <FaInstagram />
                      </a>
                    </li>
                    <li>
                      <a className={styles.youtube} href="#" target="_blank">
                        <FaYoutube />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
