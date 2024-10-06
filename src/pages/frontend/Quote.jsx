import { FaArrowRight } from "react-icons/fa";
import "../../index.css";
import API from "../../middleware/API";
import Pagination from "../../components/frontend/Pagination";
import { quotesActions, fetchStatusActions } from "../../store/frontend/quoteSlice";
import styles from "../../styles/frontend/blogs.module.css";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Quote = () => {
  const dispatch = useDispatch();
  const [quotes, setQuotes] = useState([]);
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
    API.get("/quote", { signal })
      .then((res) => {
        const quotesData = res.data.data.data;
        setQuotes(quotesData);
        dispatch(quotesActions.addInitialQuotes(quotesData)); // Redux action for adding quotes
        dispatch(fetchStatusActions.markFetchFinished());
      })
      .catch((err) => {
        console.error("Failed to fetch quotes:", err.message);
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
          <div className={`${styles["page-heading"]}`}>Quotes</div>
        </div>
      </div>

      <section
        className={`blog-pages ${styles["custom-margin"]} ${styles.top}`}
      >
        <div className="container">
          <div className={`${styles["header-wrapper"]}`}>
            <h1 className={`${styles["section-heading"]} text-center`}>
              Quotes
            </h1>
            <div className={`${styles["button-decor"]}`}>
              <div className={styles.box}></div>
              <div className={styles.box}></div>
              <div className={styles.box}></div>
            </div>
          </div>
          <div className="row gy-4 justify-content-center">
            {quotes.map((quote) => (
              <div className="col-lg-4 col-md-6 col-sm-12" key={quote._id}>
                <div className={`${styles["blogs-card"]}`}>
                  <div className={styles.cover}>
                    <figure>
                      <img
                        className={styles.picture}
                        src={
                          quote.image
                            ? `http://localhost:8080/quote/${quote.image}`
                            : ""
                        }
                        alt={quote.title}
                      />
                    </figure>
                  </div>
                  <div className={`${styles["blogs-description"]}`}>
                    <Link to={quote.link}>
                      <h3 className={`${styles["blogs-title"]}`}>
                        {quote.title}
                      </h3>
                    </Link>
                    <div className={`${styles["blogs-des"]}`}>
                      <p>{quote.intro}</p>
                    </div>
                    <Link to={`http://localhost:5173/quote/${quote.slug}`}>
                      Read More <FaArrowRight />
                    </Link>
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

export default Quote;
