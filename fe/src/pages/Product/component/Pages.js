import { Link  } from "react-router-dom";
// -------- React Icon --------
import { FiChevronLeft } from "react-icons/fi";
import { FiChevronRight } from "react-icons/fi";

const Pages = ({ page,pages, lastPage, setPage }) => {
  return (
    <div className="products-comment-pagination">
      <div className="pages-icon">
        <Link
          to={`${page - 1}#mark-1`}
          className={`comment-page-arrow `}
          onClick={() => {
            setPage(page - 1);
          }}
        >
          {page > 1 && <FiChevronLeft />}
        </Link>
      </div>
      <div>
        {pages.map((item) => {
          return item;
        })}
      </div>
      <div className="pages-icon">
        <Link
          to={`${page + 1}`}
          className="comment-page-arrow"
          onClick={() => {
            setPage(page + 1);
          }}
        >
          {page < lastPage && <FiChevronRight />}
        </Link>
      </div>
    </div>
  );
};

export default Pages