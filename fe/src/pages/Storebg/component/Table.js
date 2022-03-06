import { useState, useEffect } from "react";
import axios from "axios";
import {
  API_URL,
  IMAGE_URL,
  STORE_PRODUCT_IMAGE_URL,
} from "../../../utils/config";
import { NavLink, useParams, useNavigate } from "react-router-dom";

// FillMore icon
import { FiMoreVertical } from "react-icons/fi";
// -------- uuid --------
import { v4 as uuidv4 } from "uuid";
// 光箱
import CheckModal from "./CheckModel";

const Table = () => {
  // 店家商品列表
  const [productsData, setproductsData] = useState([]);
  // 取得頁數
  const { currentPage } = useParams();
  //按下上架刷新 API
  const [modalSwitch, setModalSwitch] = useState("");

  // 總共有 lastPage 這麼多頁
  // const [data, setData] = useState([]);
  const [lastPage, setLastPage] = useState(1);
  // let page = parseInt(currentPage, 10) || 1;
  const [page, setPage] = useState(parseInt(currentPage, 10) || 1);
  // console.log("currentPage", currentPage, page);

  useEffect(() => {
    let getPrices = async () => {
      // 預設 created_at DESC
      let response = await axios.get(
        `${API_URL}/storebg/productslist?page=${page}`
      );
      // 價錢 DESC
      // let productsPriceDescResponse = await axios.get(
      //   `${API_URL}/storebg/productspricedesc?page=${page}`
      // );
      // // 價錢 ASC
      // let productsPriceAscResponse = await axios.get(
      //   `${API_URL}/storebg/productspriceasc?page=${page}`
      // );
      // // 數量 DESC
      // let productsAmountDescResponse = await axios.get(
      //   `${API_URL}/storebg/productsamountdesc?page=${page}`
      // );
      // // 數量 ASC
      // let productsAmountAscResponse = await axios.get(
      //   `${API_URL}/storebg/productsamountasc?page=${page}`
      // );

      let productsListPage = response.data[0];
      // console.log("productsListPage", productsListPage);
      // let productsList = response.data[1];
      // console.log("productsList", productsList);
      let productsPagination = response.data[2];
      // console.log("productsPagination", productsPagination);

      setproductsData(productsListPage);
      setLastPage(productsPagination.lastPage);
      // console.log("response.data.data", response.data.data);
      // setLastPage(response.data.pagination.lastPage);
    };
    getPrices();
  }, [page, modalSwitch]);

  //計算頁面總數量並顯示頁碼，該頁碼
  let navigate = useNavigate();
  // const getPages = () => {
  let pages = [];
  for (let i = 1; i <= lastPage; i++) {
    pages.push(
      <li className="page-item" key={uuidv4()}>
        <a
          href=" "
          className={`page-link pages ${page === i ? "active" : ""}`}
          onClick={(e) => {
            setPage(i);
            navigate(`${i}`);
          }}
        >
          {i}
        </a>
      </li>
    );
  }

  return (
    <div>
      <table className="table background-storebg-data-right-content-table">
        <thead>
          <tr>
            <th scope="col"></th>
            <th scope="col">商店名稱</th>
            <th scope="col" className="text-center">
              價格
            </th>
            <th scope="col" className="text-center">
              數量
            </th>
            <th scope="col" className="text-center">
              已售出
            </th>
            <th scope="col">販售時間</th>
            <th scope="col">上架日期</th>
            <th scope="col" className="text-center">
              狀態
            </th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {productsData.map((item) => {
            return (
              <tr key={uuidv4()}>
                <td>
                  <div className="storebg-product-photo">
                    <img
                      src={
                        item.img
                          ? IMAGE_URL + item.img
                          : STORE_PRODUCT_IMAGE_URL
                      }
                      alt=""
                    />
                  </div>
                </td>
                <td>{item.name}</td>
                <td className="text-center">NT${item.price}</td>
                <td className="text-center">{item.amount}</td>
                <td className="text-center">1</td>
                <td>
                  {item.start_time} ~ {item.due_time}
                </td>
                <td>{item.created_at}</td>
                <td className="text-center">
                  <button
                    type="button"
                    className={
                      (item.valid === 1
                        ? "storebg-data-green"
                        : "storebg-data-red") + " btn rounded-pill"
                    }
                    data-bs-toggle="modal"
                    data-bs-target={"#takeDown" + item.id}
                  >
                    {item.valid === 1 ? "上架中" : "下架中"}
                  </button>

                  {/* //checkModal */}
                  <CheckModal
                    productValid={item.valid}
                    productId={item.id}
                    setModalSwitch={setModalSwitch}
                  />
                </td>
                <td>
                  <button
                    className="background-storebg-data-right-sort "
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <FiMoreVertical />
                  </button>
                  <ul className="dropdown-menu background-storebg-data-right-sort-options ">
                    <div className="navLink-g-color">
                      <NavLink
                        type="button"
                        to={`/productedit/${item.id}`}
                        className={"navLink-g-color"}
                        // productsData={productsData}
                      >
                        編輯
                      </NavLink>
                    </div>
                    <div className="navLink-r-color">
                      <button
                        type="button"
                        className="navLink-r-color"
                        data-bs-toggle="modal"
                        data-bs-target={"#takeRemove" + item.id}
                      >
                        刪除
                      </button>
                    </div>
                  </ul>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {/* <ul>{getPages()}</ul> */}
      <nav
        aria-label="Page navigation example m-auto "
        className="background-storebg-data-right-content-pages"
      >
        <ul className="pagination justify-content-center">
          {/* <li className="page-item">
            <a className="page-link" href="#/" aria-label="Previous">
              <span aria-hidden="true">&lt;</span>
            </a>
          </li> */}

          {/* <li className="page-item"> */}
          {/* <a className="page-link" href="#/"> */}
          {/* <div> */}
          {pages.map((item) => {
            return item;
          })}
          {/* </div> */}
          {/* </a> */}
          {/* </li> */}
          {/* <li className="page-item">
            <a className="page-link" href="#/" aria-label="Next">
              <span aria-hidden="true">&gt;</span>
            </a>
          </li> */}
        </ul>
      </nav>
    </div>
  );
};

export default Table;
