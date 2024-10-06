import styles from "../../styles/frontend/service.module.css";
import { MdAdd } from "react-icons/md";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import API from "../../middleware/API";
import { chaptersActions, fetchStatusActions } from "../../store/frontend/chapterSlice";
import Pagination from "../../components/frontend/Pagination";

const Chapter = () => {
  const {class:classes, subject}=useParams();

  const dispatch = useDispatch();
  const [chapters, setChapters] = useState([]);
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
    API.get("/chapter", { signal })
      .then((res) => {
        const chaptersData = res.data.data.data;
        setChapters(chaptersData);
        console.log(chaptersData)
        dispatch(chaptersActions.addInitialChapters(chaptersData)); // Redux action for adding chapters
        dispatch(fetchStatusActions.markFetchFinished());
      })
      .catch((err) => {
        console.error("Failed to fetch chapters:", err.message);
        dispatch(fetchStatusActions.markFetchFinished());
      });

    return () => {
      controller.abort(); // Abort all operations on unmount
    };
  }, [dispatch, page]);


  // API.get(`subject?slug=${classes}`)
  
  
  
  const subjects = useSelector((store) => store.chapters);

  return (
    <>
      <section className={styles["service-section"]}>
        <div className="container">
          <div className={styles["header-wrapper"]}>
            <h2 className={styles["section-heading"]}>Choose Your Chapter?</h2>
            <div className={styles["button-decor"]}>
              <div className={styles.box}></div>
              <div className={styles.box}></div>
              <div className={styles.box}></div>
            </div>
          </div>
          <div className="row gy-4 justify-content-center ho">
            {chapters.map((chapter) => (
              <div className="col-lg-4 col-md-6 col-sm-12" key={chapter._id}>
                
                <div className={styles["service-card"]}>
                  <div className={styles["service-cover"]}>
                    <div className={styles.wrapper}>
                      <figure>
                        <img
                          className={styles.pic}
                          src={chapter.coverImage}
                          alt={chapter.title}
                        />
                      </figure>
                      <Link to={chapter.link}>
                        <div className={styles.wrapper}>
                          <MdAdd />
                        </div>
                      </Link>
                    </div>
                  </div>
                  <div className={`${styles["service-details"]}`}>
                    <Link to={chapter.link}>
                      <h3 className={`${styles["service-title"]}`}>
                        {chapter.title}
                      </h3>
                    </Link>
                    <div className={`${styles["service-dec"]}`}>
                      <p>{chapter.intro}</p>
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

export default Chapter;
