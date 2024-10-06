import { MdAdd } from "react-icons/md";
import styles from "../../styles/frontend/service.module.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import API from "../../middleware/API";
import Pagination from "../../components/frontend/Pagination";
import { booksActions, fetchStatusActions } from "../../store/frontend/booksSlice";
import { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";

const Books = () => {

  const dispatch = useDispatch();
  const [books, setBooks] = useState([]);
  // Pagination
  const [page, setPage] = useState(1);
  const limit = 6; // Items per page
  const [response, setResponse] = useState({
    total: 10,  // Example total count
    previous: null,
    next: 2,    // If next page exists
  });

  // CRUD operations using advanced fetching style
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    // Dispatch to mark fetching started
    dispatch(fetchStatusActions.markFetchingStarted());

    // GET request to fetch blogs
    API.get("/book", { signal })
      .then((res) => {
        const booksData = res.data.data.data;
        setBooks(booksData);
        dispatch(booksActions.addInitialBooks(booksData)); // Redux action for adding books
        dispatch(fetchStatusActions.markFetchFinished());
      })
      .catch((err) => {
        console.error("Failed to fetch books:", err.message);
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
          <div className={`${styles["page-heading"]}`}>Books</div>
        </div>
      </div>

      <section className={styles["service-section"]}>
        <div className="container">
          <div className={styles["header-wrapper"]}>
            <h2 className={styles["section-heading"]}>Books</h2>
            <div className={styles["button-decor"]}>
              <div className={styles.box}></div>
              <div className={styles.box}></div>
              <div className={styles.box}></div>
            </div>
          </div>
          <div className="row gy-4 justify-content-center ho">
            {books.map((book) => (
              <div className="col-lg-4 col-md-6 col-sm-12" key={book._id}>
                <div className={styles["service-card"]}>
                  <div className={styles["service-cover"]}>
                    <div className={styles.wrapper}>
                      <figure>
                        <img
                          src={book.image ? `http://localhost:8080/book/${book.image}` : ""}
                          alt={book.title}
                          className={styles.pic}
                        />
                      </figure>
                      <Link to={book.link}>
                        <div className={styles.wrapper}>
                          <MdAdd />
                        </div>
                      </Link>
                    </div>
                  </div>
                  <div className={`${styles["service-details"]}`}>
                    <Link to={book.link}>
                      <h3 className={`${styles["service-title"]}`}>
                        {book.title}
                      </h3>
                    </Link>
                    <div className={`${styles["service-dec"]}`}>
                      <p>{book.intro}</p>
                    </div>
                    <Link className={styles.read} to={`http://localhost:5173/books/${book.slug}`}>
                      Read More <FaArrowRight />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Pagination response={response} page={page} setPage={setPage} limit={limit} />
        </div>
      </section>
    </>
  );
};

export default Books;
