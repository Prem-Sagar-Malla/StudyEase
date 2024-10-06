import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import styles from "../../styles/frontend/header.module.css";
import { FaSearch } from "react-icons/fa";
import ProgressBar from "./ProgressBar";
import { Link } from "react-router-dom";
import "../../index.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <nav className={`navbar navbar-expand-lg navbar-dark bg-transparent`}>
        <div className={`d-flex align-items-center mx-3`}>
          {/* Logo Section */}
          <Link className="navbar-brand fs-4" to="/">
            <img
              src="http://localhost:5173/study-ease.png"
              alt="study-ease"
              className={styles.navLogo}
            />
          </Link>
          <span className={styles.siteName}>
            <Link to="/" className="text-white">
              Study Ease
            </Link>
          </span>

          {/* Toggle Button Section */}
          <button
            className="navbar-toggler shadow-none border-0"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar"
            aria-controls="offcanvasNavbar"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Sidebar Section */}
          <div
            className={`sidebar offcanvas offcanvas-start ${styles.offCanvas}`}
            tabIndex="-1"
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
            arial-modal="true"
            role="dialog"
          >
            {/* Sidebar Header Section */}
            <div className="offcanvas-header text-white border-bottom">
              <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
                <Link to="/">
                  <img
                    src="http://localhost:5173/study-ease.png"
                    className={styles.sidebarLogo}
                    alt="study-ease"
                  />
                </Link>
                Study Ease
              </h5>
              <button
                type="button"
                className="btn-close btn-close-white shadow-none"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>

            {/* Sidebar Body Section */}
            <div className="offcanvas-body ps-4 d-flex flex-column flex-lg-row ">
              <ul className="navbar-nav justify-content-between align-items-center fs-5 flex-grow-1 pe-3 pt-0 mt-0">
                <li className={`${styles.navItem} nav-item mx-2`}>
                  <Link
                    className={`${styles.navLink} nav-link`}
                    aria-current="page"
                    to="/"
                  >
                    Home
                  </Link>
                </li>
                <li className={`${styles.navItem} nav-item mx-2`}>
                  <Link className={`${styles.navLink} nav-link`} to="about-us">
                    About Us
                  </Link>
                </li>
                <li className={`${styles.navItem} nav-item mx-2`}>
                  <Link className={`${styles.navLink} nav-link`} to="services">
                    Services
                  </Link>
                </li>
                <li className={`${styles.navItem} nav-item mx-2`}>
                  <Link className={`${styles.navLink} nav-link`} to="class">
                    Classes
                  </Link>
                </li>
                <li className={`${styles.navItem} nav-item mx-2`}>
                  <Link className={`${styles.navLink} nav-link`} to="books">
                    Books
                  </Link>
                </li>
                <li className={`${styles.navItem} nav-item mx-2`}>
                  <Link className={`${styles.navLink} nav-link`} to="blogs">
                    Blogs
                  </Link>
                </li>
                <li className={`${styles.navItem} nav-item mx-2`}>
                  <Link className={`${styles.navLink} nav-link`} to="quotes">
                    Quotes
                  </Link>
                </li>
                <li className={`${styles.navItem} nav-item mx-2`}>
                  <Link
                    className={`${styles.navLink} nav-link`}
                    to="contact-us"
                  >
                    Contact Us
                  </Link>
                </li>
                {/* <form className="d-flex" role="search">
                  <input
                    className={`form-control ${styles.searchInput} me-2`}
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                  />
                  <button className="btn bg-success text-white" type="submit">
                    <FaSearch />
                  </button>
                </form> */}
              </ul>
            </div>
          </div>
        </div>
      </nav>
      <ProgressBar />
    </header>
  );
};

export default Header;
