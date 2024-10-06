import { MdAdd } from "react-icons/md";
import styles from "../../styles/frontend/service.module.css";
import { Link } from "react-router-dom";
import API from "../../middleware/API";
import { classesActions, fetchStatusActions } from "../../store/frontend/classSlice";
import Pagination from "../../components/frontend/Pagination";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const Classes = () => {
  const dispatch = useDispatch();
  const [classes, setClasses] = useState([]);
  // Pagination
  const [page, setPage] = useState(1);
  const limit = 6; // Items per page
  const [response, setResponse] = useState({
    total: 10, // Example total count
    previous: null,
    next: 2, // If next page exists
  });

  // CRUD operations using advanced fetching style
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    // Dispatch to mark fetching started
    dispatch(fetchStatusActions.markFetchingStarted());

    // GET request to fetch blogs
    API.get("/class", { signal })
      .then((res) => {
        const classesData = res.data.data.data;
        setClasses(classesData);
        dispatch(classesActions.addInitialClasses(classesData)); // Redux action for adding classes
        dispatch(fetchStatusActions.markFetchFinished());
      })
      .catch((err) => {
        console.error("Failed to fetch classes:", err.message);
        dispatch(fetchStatusActions.markFetchFinished());
      });

    return () => {
      controller.abort(); // Abort all operations on unmount
    };
  }, [dispatch, page]);

  return (
    <>
      <div className={`${styles["breadcrumbs-section-wrapper"]}`}>
        <div className="container">
          <div className={`${styles["page-heading"]}`}>Classes</div>
        </div>
      </div>

      <section className={styles["service-section"]}>
        <div className="container">
          <div className={styles["header-wrapper"]}>
            <h2 className={styles["section-heading"]}>Choose Your Class?</h2>
            <div className={styles["button-decor"]}>
              <div className={styles.box}></div>
              <div className={styles.box}></div>
              <div className={styles.box}></div>
            </div>
          </div>
          <div className="row gy-4 justify-content-center ho">
            {classes.map((classes) => (
              <div className="col-lg-4 col-md-6 col-sm-12" key={classes._id}>
                <div className={styles["service-card"]}>
                  <div className={styles["service-cover"]}>
                    <div className={styles.wrapper}>
                      <figure>
                        <img
                          src={
                            classes.image
                              ? `class/${classes.image}`
                              : ""
                          }
                          alt={classes.title}
                          className={styles.pic}
                        />
                      </figure>
                      <Link to={`/class/${classes.title}/subject`}>
                        <div className={styles.wrapper}>
                          <MdAdd />
                        </div>
                      </Link>
                    </div>
                  </div>
                  <div className={`${styles["service-details"]}`}>
                    <Link to={`/class/${classes.title}/subject`}>
                      <h3 className={`${styles["service-title"]}`}>
                        {classes.title}
                      </h3>
                    </Link>
                    <div className={`${styles["service-dec"]}`}>
                      <p>{classes.intro}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Pagination
            response={response}
            page={page}
            setPage={setPage}
            limit={limit}
          />
        </div>
      </section>
    </>
  );
};

export default Classes;
