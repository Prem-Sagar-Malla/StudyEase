import { useDispatch } from "react-redux";
import styles from "../../styles/frontend/service.module.css";
import { MdAdd } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../../middleware/API";
import { servicesActions, fetchStatusActions } from "../../store/frontend/serviceSlice";

const Service = () => {
  const location = useLocation();

  const dispatch = useDispatch();
  const [services, setServices] = useState([]);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    // Dispatch to mark fetching started
    dispatch(fetchStatusActions.markFetchingStarted());

    // GET request to fetch blogs
    API.get("/service", { signal })
      .then((res) => {
        const servicesData = res.data.data.data;
        setServices(servicesData);
        dispatch(servicesActions.addInitialServices(servicesData)); // Redux action for adding books
        dispatch(fetchStatusActions.markFetchFinished());
      })
      .catch((err) => {
        console.error("Failed to fetch services:", err.message);
        dispatch(fetchStatusActions.markFetchFinished());
      });

      return () => {
      controller.abort(); // Abort all operations on unmount
    };
  }, [dispatch]);

  return (
    <>
      <section className={styles["service-section"]}>
        <div className="container">
          <div className={styles["header-wrapper"]}>
            <h2 className={styles["section-heading"]}>Our Services</h2>
            <div className={styles["button-decor"]}>
              <div className={styles.box}></div>
              <div className={styles.box}></div>
              <div className={styles.box}></div>
            </div>
          </div>
          <div className="row gy-4 justify-content-center ho">
            {services.map((service) => (
              <div className="col-lg-4 col-md-6 col-sm-12" key={service._id}>
                <div className={styles["service-card"]}>
                  <div className={styles["service-cover"]}>
                    <div className={styles.wrapper}>
                      <figure>
                        <img
                          className={styles.pic}
                          src={service.image
                            ? `http://localhost:8080/service/${service.image}`
                            : ""}
                          alt={service.title}
                        />
                      </figure>
                      <Link to={`http://localhost:8080/service/${service.slug}`}>
                        <div className={styles.wrapper}>
                          <MdAdd />
                        </div>
                      </Link>
                    </div>
                  </div>
                  <div className={`${styles["service-details"]}`}>
                    <Link to={`http://localhost:8080/service/${service.slug}`}>
                      <h3 className={`${styles["service-title"]}`}>
                        {service.title}
                      </h3>
                    </Link>
                    <div className={`${styles["service-dec"]}`}>
                      <p>{service.intro}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className={styles["custom-buttons"]}>
            {location.pathname !== "/services" && (
              <Link to="services">View All</Link>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Service;
