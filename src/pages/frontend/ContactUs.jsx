import React, { useEffect, useState } from "react";
import { FaPhoneAlt, FaTelegramPlane } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { BsSendFill } from "react-icons/bs";
import styles from "../../styles/frontend/contactus.module.css";
import API from "../../middleware/API";
import { useDispatch } from "react-redux";

const ContactUs = () => {
useEffect(() => {
  const controller = new AbortController();
  const signal = controller.signal;

  // POST request to fetch contact details
 

  return () => {
    controller.abort(); // Abort the operation if the component unmounts
  };
}, []);



  const [formValues, setFormValues] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    address: "",
    email: "",
    message: "",
  });

  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const validateForm = () => {
    const errors = {};
    const phonePattern = /^[0-9]{10}$/;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formValues.first_name) errors.first_name = "First name is required";
    if (!formValues.last_name) errors.last_name = "Last name is required";
    if (!formValues.phone || !phonePattern.test(formValues.phone))
      errors.phone = "Phone number is required";
    if (!formValues.address) errors.address = "Address is required";
    if (!formValues.email || !emailPattern.test(formValues.email))
      errors.email = "Invalid email address";
    if (!formValues.message) errors.message = "Message is required";

    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
    } else {
      // Handle successful form submission, e.g., send to API
      console.log("Form submitted", formValues);

      API.post("/contact", formValues)
      .then((res) => {
        const contactData = res.data.data;
        setContact(contactData); // Assuming you have a setContact state updater
        useDispatch(contactActions.addInitialContacts(contactData)); // Assuming you have a Redux action to handle the data
      })
      .catch((err) => {
        console.error("Failed to fetch contact details:", err.message);
      });

      // Clear form and errors
      setFormValues({
        first_name: "",
        last_name: "",
        phone: "",
        address: "",
        email: "",
        message: "",
      });
      setFormErrors({});
    }
  };

  return (
    <>
      <div className={`${styles["breadcrumbs-section-wrapper"]}`}>
        <div className="container">
          <div className={`${styles["page-heading"]}`}>Contact Us</div>
        </div>
      </div>

      <section className={`contact-us-pages ${styles["custom-margin"]}`}>
        <div className="container">
          <div className={`${styles["header-wrapper"]}`}>
            <h2 className={`${styles["section-heading"]} text-center`}>
              Contact Us
            </h2>
            <div className={`${styles["button-decor"]}`}>
              <div className={styles.box}></div>
              <div className={styles.box}></div>
              <div className={styles.box}></div>
            </div>
          </div>
          <div className="row gy-4">
            <div className="col-lg-4 col-md-6 col-sm-12">
              <div className={`${styles["contact-info"]}`}>
                <div className={`${styles["icon-box"]}`}>
                  <FaPhoneAlt />
                </div>
                <div className={styles.info}>
                  <span className={styles.heading}>Phone</span>
                  <span className={styles.value}>
                    <a href="tel:9860163781">9860163781</a>,
                    <a href="tel:9702828212">9702828212</a>
                  </span>
                </div>
                <div className={`${styles["buttom-decor"]}`}>
                  <figure>
                    <img
                      src="https://moonanddragonbuilder.com/frontend/images/bottom-decor-contact.png"
                      alt=""
                    />
                  </figure>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12">
              <div className={`${styles["contact-info"]}`}>
                <div className={`${styles["icon-box"]}`}>
                  <FaTelegramPlane />
                </div>
                <div className={styles.info}>
                  <span className={styles.heading}>Mail Info</span>
                  <span className={styles.value}>
                    <a href="mailto:premsagarmalla777@gmail.com">
                      premsagarmalla777@gmail.com
                    </a>
                  </span>
                </div>
                <div className={`${styles["buttom-decor"]}`}>
                  <figure>
                    <img
                      src="https://moonanddragonbuilder.com/frontend/images/bottom-decor-contact.png"
                      alt=""
                    />
                  </figure>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12">
              <div className={`${styles["contact-info"]}`}>
                <div className={`${styles["icon-box"]}`}>
                  <FaLocationDot />
                </div>
                <div className={styles.info}>
                  <span className={styles.heading}>Address</span>
                  <span className={styles.value}>
                    Putalisadak-28, Kathmandu, Nepal
                  </span>
                </div>
                <div className={`${styles["buttom-decor"]}`}>
                  <figure>
                    <img
                      src="https://moonanddragonbuilder.com/frontend/images/bottom-decor-contact.png"
                      alt=""
                    />
                  </figure>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="contact-us-form-google-map custom-margin">
        <div className="container my-5">
          <div className="row gy-4">
            <div className="col-lg-6 col-md-12 col-sm-12">
              <div className={`${styles["get-in-touch"]} form-frame`}>
                <h1 className={`${styles["section-heading"]}`}>Get in touch</h1>
                <form className="contact-us-form" onSubmit={handleSubmit}>
                  <div className="row gy-4">
                    <div className="col-lg-6 col-md-6 col-sm-12">
                      <input
                        type="text"
                        placeholder="First Name"
                        name="first_name"
                        value={formValues.first_name}
                        onChange={handleChange}
                      />
                      {formErrors.first_name && (
                        <p className={styles.error}>{formErrors.first_name}</p>
                      )}
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12">
                      <input
                        type="text"
                        placeholder="Last Name"
                        name="last_name"
                        value={formValues.last_name}
                        onChange={handleChange}
                      />
                      {formErrors.last_name && (
                        <p className={styles.error}>{formErrors.last_name}</p>
                      )}
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12">
                      <input
                        type="text"
                        placeholder="Phone"
                        name="phone"
                        value={formValues.phone}
                        onChange={handleChange}
                      />
                      {formErrors.phone && (
                        <p className={styles.error}>{formErrors.phone}</p>
                      )}
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12">
                      <input
                        type="text"
                        placeholder="Address"
                        name="address"
                        value={formValues.address}
                        onChange={handleChange}
                      />
                      {formErrors.address && (
                        <p className={styles.error}>{formErrors.address}</p>
                      )}
                    </div>
                    <div className="col-lg-12 col-md-12 col-sm-12">
                      <input
                        type="email"
                        placeholder="Email"
                        name="email"
                        value={formValues.email}
                        onChange={handleChange}
                      />
                      {formErrors.email && (
                        <p className={styles.error}>{formErrors.email}</p>
                      )}
                    </div>
                    <div className="col-lg-12 col-md-12 col-sm-12">
                      <textarea
                        cols="30"
                        rows="6"
                        placeholder="Message"
                        name="message"
                        value={formValues.message}
                        onChange={handleChange}
                      />
                      {formErrors.message && (
                        <p className={styles.error}>{formErrors.message}</p>
                      )}
                    </div>
                  </div>
                  <div className={`${styles["custom-buttons"]} mt-3`}>
                    <button type="submit" className="contact_us_btn">
                      <BsSendFill /> Send Message
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-lg-6 col-md-12 col-sm-12">
              <div className={`${styles["google-map"]}`}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3531.6869382705877!2d85.36480257523073!3d27.726950676171324!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb1b00539edfbd%3A0x40af88ebdc3a3c02!2sMoon%20and%20Dragon%20Builder%20pvt.%20Ltd.!5e0!3m2!1sen!2snp!4v1702371345076!5m2!1sen!2snp"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactUs;
