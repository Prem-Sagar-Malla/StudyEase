import React from "react";
import "../../styles/frontend/Pagination.css";

function Pagination({ response, page, setPage, limit }) {
  // Ensure totalData and limit have valid default values to avoid NaN issues
  const totalData = response?.total || 0;
  const totalPages = Math.ceil(totalData / (limit || 1)); // Default limit to 1 to avoid division by 0
  const totalPage = [];

  // Handle case for less than or equal to 5 pages
  if (totalPages <= 5) {
    for (let i = 1; i <= totalPages; i++) {
      totalPage.push(
        <button
          key={i}
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
            setPage(i);
          }}
          className={`pagination-button ${page === i ? "active" : ""}`}
        >
          {i.toString()} {/* Convert number to string to avoid NaN issue */}
        </button>
      );
    }
  } else {
    // Handle first few pages
    if (page <= 3) {
      for (let i = 1; i <= 4; i++) {
        totalPage.push(
          <button
            key={i}
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
              setPage(i);
            }}
            className={`pagination-button ${page === i ? "active" : ""}`}
          >
            {i.toString()}
          </button>
        );
      }
      totalPage.push(<span key="ellipsis1" className="pagination-ellipsis">...</span>);
      totalPage.push(
        <button
          key={totalPages}
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
            setPage(totalPages);
          }}
          className={`pagination-button ${page === totalPages ? "active" : ""}`}
        >
          {totalPages.toString()}
        </button>
      );
    }
    // Handle last few pages
    else if (page >= totalPages - 2) {
      totalPage.push(
        <button
          key={1}
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
            setPage(1);
          }}
          className={`pagination-button ${page === 1 ? "active" : ""}`}
        >
          {1}
        </button>
      );
      totalPage.push(<span key="ellipsis2" className="pagination-ellipsis">...</span>);
      for (let i = totalPages - 3; i <= totalPages; i++) {
        totalPage.push(
          <button
            key={i}
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
              setPage(i);
            }}
            className={`pagination-button ${page === i ? "active" : ""}`}
          >
            {i.toString()}
          </button>
        );
      }
    }
    // Handle middle pages
    else {
      totalPage.push(
        <button
          key={1}
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
            setPage(1);
          }}
          className={`pagination-button ${page === 1 ? "active" : ""}`}
        >
          {1}
        </button>
      );
      totalPage.push(<span key="ellipsis3" className="pagination-ellipsis">...</span>);
      for (let i = page - 1; i <= page + 1; i++) {
        totalPage.push(
          <button
            key={i}
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
              setPage(i);
            }}
            className={`pagination-button ${page === i ? "active" : ""}`}
          >
            {i.toString()}
          </button>
        );
      }
      totalPage.push(<span key="ellipsis4" className="pagination-ellipsis">...</span>);
      totalPage.push(
        <button
          key={totalPages}
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
            setPage(totalPages);
          }}
          className={`pagination-button ${page === totalPages ? "active" : ""}`}
        >
          {totalPages.toString()}
        </button>
      );
    }
  }

  return (
    <div className="pagination-container">
      {/* Check if response and previous property exist */}
      {response && response.previous !== null && (
        <button
          className="pagination-nav"
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
            setPage(page - 1);
          }}
        >
          Previous
        </button>
      )}
      <div className="pagination-pages">{totalPage}</div>
      {/* Check if response and next property exist */}
      {response && response.next !== null && (
        <button
          className="pagination-nav"
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
            setPage(page + 1);
          }}
        >
          Next
        </button>
      )}
    </div>
  );
}

export default Pagination;
