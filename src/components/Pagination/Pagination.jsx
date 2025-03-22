import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import styles from "./Pagination.module.scss";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { generateUniqueId } from "../../libs/GenerateUniqueId";

const Pagination = ({ start, limit, currentPage, lastPage, firstPage }) => {
  const [pages, setPages] = useState([]);

  useEffect(() => {
    const pagesCount = [];
    const delta = 2;

   
    pagesCount.push(1);

    
    if (currentPage - delta > 2 && lastPage > 3) {
      pagesCount.push("...");
    }

    
    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(lastPage - 1, currentPage + delta);
      i++
    ) {
      pagesCount.push(i);
    }

    if (currentPage + delta < lastPage - 1 && lastPage > 3) {
      pagesCount.push("...");
    }

    
    if (lastPage !== 1) {
      pagesCount.push(lastPage);
    }

    setPages(pagesCount);
  }, [currentPage, lastPage]);
  return (
    <div className={styles.container}>
      {currentPage > firstPage && (
        <Link to={`?start=${start - limit}`} className={styles.button}>
          <FaChevronLeft />
        </Link>
      )}

      <ul>
        {pages.map((btn) => (
          <li key={generateUniqueId()}>
            <Link
              to={`?start=${(btn - 1) * limit}`}
              className={btn === currentPage ? styles.active : ""}
            >
              {btn}
            </Link>
          </li>
        ))}
      </ul>

      {currentPage < lastPage && (
        <Link to={`?start=${start + limit}`} className={styles.button}>
          <FaChevronRight />
        </Link>
      )}
    </div>
  );
};

export default Pagination;
