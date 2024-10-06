import React, { useEffect, useState } from "react";
import "../../index.css";
import { FaArrowRight } from "react-icons/fa";
import styles from "../../styles/frontend/blogs.module.css";
import { useDispatch } from "react-redux";
import API from "../../middleware/API";
import Pagination from "../../components/frontend/Pagination";
import { blogsActions, fetchStatusActions } from "../../store/frontend/blogSlice";

const Blogs = () => {
  const dispatch = useDispatch();
  const [blogs, setBlogs] = useState([]);
  // Pagination
  const [page, setPage] = useState(1);
  const limit = 6;
  const [response, setResponse] = useState({
    total: 10,
    previous: null,
    next: 2,
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // CRUD operations using advanced fetching style
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    // Dispatch to mark fetching started
    dispatch(fetchStatusActions.markFetchingStarted());

    // GET request to fetch blogs
    API.get("/blog", { signal })
      .then((res) => {
        const blogsData = res.data.data.data;
        setBlogs(blogsData);
        dispatch(blogsActions.addInitialBlogs(blogsData)); // Redux action for adding blogs
        dispatch(fetchStatusActions.markFetchFinished());
      })
      .catch((err) => {
        console.error("Failed to fetch blogs:", err.message);
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
          <div className={`${styles["page-heading"]}`}>Blogs</div>
        </div>
      </div>

      <section
        className={`blog-pages ${styles["custom-margin"]} ${styles.top}`}
      >
        <div className="container">
          <div className={`${styles["header-wrapper"]}`}>
            <h1 className={`${styles["section-heading"]} text-center`}>
              Latest Blogs &amp; Articles
            </h1>
            <div className={`${styles["button-decor"]}`}>
              <div className={styles.box}></div>
              <div className={styles.box}></div>
              <div className={styles.box}></div>
            </div>
          </div>
          <div className="row gy-4 justify-content-center">
            {blogs.map((blog) => (
              <div className="col-lg-4 col-md-6 col-sm-12" key={blog._id}>
                <div className={`${styles["blogs-card"]}`}>
                  <div className={styles.cover}>
                    <figure>
                      <img
                        className={styles.picture}
                        src={
                          blog.image
                            ? `http://localhost:8080/blog/${blog.image}`
                            : ""
                        }
                        alt={blog.title}
                      />
                    </figure>
                    <div className={`${styles["posted-date"]}`}>
                      <span>{formatDate(blog.createdAt)}</span>
                    </div>
                  </div>
                  <div className={`${styles["blogs-description"]}`}>
                    <a href={blog.articleLink}>
                      <h3 className={`${styles["blogs-title"]}`}>
                        {blog.title}
                      </h3>
                    </a>
                    <div className={`${styles["blogs-des"]}`}>
                      <p>{blog.intro}</p>
                    </div>
                    <a href={`http://localhost:5173/blogs/${blog.slug}`}>
                      Read More <FaArrowRight />
                    </a>
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

export default Blogs;
