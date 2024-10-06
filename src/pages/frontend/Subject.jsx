import styles from "../../styles/frontend/service.module.css";
import { MdAdd } from "react-icons/md";
import { Link, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { subjectsActions, fetchStatusActions } from "../../store/frontend/subjectSlice";
import { useEffect, useState } from "react";
import API from "../../middleware/API";
import Pagination from "../../components/frontend/Pagination";

const Subject = () => {
  const { class: classes } = useParams();

  const dispatch = useDispatch();
  const [subjects, setSubjects] = useState([]);
  const [page, setPage] = useState(1);
  const limit = 6;
  const [response, setResponse] = useState({
    total: 10,
    previous: null,
    next: 2,
  });

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    dispatch(fetchStatusActions.markFetchingStarted());

    API.get("/subject", { signal })
      .then((res) => {
        const subjectsData = res.data.data.data;
        setSubjects(subjectsData);
        dispatch(subjectsActions.addInitialSubjects(subjectsData));
        dispatch(fetchStatusActions.markFetchFinished());
      })
      .catch((err) => {
        console.error("Failed to fetch subjects:", err.message);
        dispatch(fetchStatusActions.markFetchFinished());
      });

    return () => {
      controller.abort(); 
    };
  }, [dispatch, classes, page]);

  return (
    <>
      <section className={styles["service-section"]}>
        <div className="container">
          <div className={styles["header-wrapper"]}>
            <h2 className={styles["section-heading"]}>Choose Your Subject?</h2>
            <div className={styles["button-decor"]}>
              <div className={styles.box}></div>
              <div className={styles.box}></div>
              <div className={styles.box}></div>
            </div>
          </div>
          <div className="row gy-4 justify-content-center ho">
            {subjects.map((subject) => (
              <div className="col-lg-4 col-md-6 col-sm-12" key={subject._id}>
                <div className={styles["service-card"]}>
                  <div className={styles["service-cover"]}>
                    <div className={styles.wrapper}>
                      <figure>
                        <img
                          className={styles.pic}
                          src={subject.image
                            ? `subject/${subject.image}`
                            : ""}
                          alt={subject.title}
                        />
                      </figure>
                      <Link to={`http://localhost:5173/class/1/subject/1/chapter`}>
                        <div className={styles.wrapper}>
                          <MdAdd />
                        </div>
                      </Link>
                    </div>
                  </div>
                  <div className={`${styles["service-details"]}`}>
                    <Link to={`http://localhost:5173/class/1/subject/1/chapter`}>
                      <h3 className={`${styles["service-title"]}`}>
                        {subject.title}
                      </h3>
                    </Link>
                    <div className={`${styles["service-dec"]}`}>
                      <p>{subject.intro}</p>
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

export default Subject;
