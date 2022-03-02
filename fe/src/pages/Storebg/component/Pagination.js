import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API_URL } from "../../../utils/config";
import axios from "axios";

const Pagination = () => {
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  // 總共有 lastPage 這麼多頁
  const [lastPage, setLastPage] = useState(1);

  // 為了處理網址
  let navigate = useNavigate();

  // 把網址上的 :stockId 拿出來
  const { stockId } = useParams();
  const { currentPage } = useParams();
  
  const [page, setPage] = useState(parseInt(currentPage, 10) || 1);
  console.log("currentPage", currentPage, page);

  useEffect(() => {
    let getPrices = async () => {
      let response = await axios.get(
        `${API_URL}/storebg/pagination?page=${page}`
      );
      setData(response.data.data);
      setLastPage(response.data.pagination.lastPage);
    };
    getPrices();
  }, [page]);

  const getPages = () => {
    let pages = [];
    for (let i = 1; i <= lastPage; i++) {
      pages.push(
        <li
          style={{
            display: "inline-block",
            margin: "2px",
            backgroundColor: page === i ? "#00d1b2" : "",
            borderColor: page === i ? "#00d1b2" : "#dbdbdb",
            color: page === i ? "#fff" : "#363636",
            borderWidth: "1px",
            width: "28px",
            height: "28px",
            borderRadius: "3px",
            textAlign: "center",
          }}
          key={i}
          onClick={(e) => {
            setPage(i);
            navigate(`/storebg/${i}`);
          }}
        >
          {i}
        </li>
      );
    }
    return pages;
  };

  return (
    <div>
          <ul>{getPages()}</ul>

      <nav
        aria-label="Page navigation example m-auto "
        className="background-storebg-data-right-content-pages"
      >
        <ul className="pagination justify-content-center">
          <li className="page-item">
            <a className="page-link" href="#/" aria-label="Previous">
              <span aria-hidden="true">&lt;</span>
            </a>
          </li>

          <li className="page-item">
            <a className="page-link" href="#/">
              1
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#/">
              2
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#/">
              3
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#/" aria-label="Next">
              <span aria-hidden="true">&gt;</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
