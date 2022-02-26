import { useState, useEffect } from "react";
import axios from "axios";
import {
  API_URL,
  IMAGE_URL,
  STORE_PRODUCT_IMAGE_URL,
} from "../../../utils/config";

// FillMore icon
import { FiMoreVertical } from "react-icons/fi";

const Table = () => {
  // 店家商品列表
  const [productsData, setproductsData] = useState([]);

  useEffect(() => {
    // http://localhost:3002/api/member/proile
    let setProducts = async () => {
      let response = await axios.get(`${API_URL}/storebg/products`, {
        withCredentials: true, // 為了跨源存取 cookie // 登入狀態帶著 cookie 跟後端要資料
      });
      setproductsData(response.data);

      console.log(
        "api/storebg/products(get) response.data.storeProductsData: ",
        response.data
      );
      console.log(
        "api/storebg/products(get) response.data.storeProductsData: ",
        response.data[0].img
      );
    };
    setProducts();
  }, []);

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
              <tr key={item.storeId}>
                <td>
                  <div className="product-photo">
                    <img
                      src={
                        item.img
                          ? IMAGE_URL + "/static/uploads/products/" + item.img
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
                <td>
                  {/* Feb 01,2022
                    <div className="ps-3 ">6:30 pm</div> */}
                  {item.created_at}
                </td>
                <td className="text-center">
                  <button
                    type="button"
                    className={
                      (item.valid === 1
                        ? "storebg-data-green"
                        : "storebg-data-red") + " btn rounded-pill"
                    }
                    data-bs-toggle="modal"
                    data-bs-target="#takeDown"
                  >
                    {item.valid === 1 ? "上架中" : "下架中"}
                  </button>
                  <div
                    className="modal fade"
                    id="takeDown"
                    // tabindex="-1"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog modal-sm modal-dialog-centered">
                      <div className="modal-content">
                        <div className="modal-header">
                          <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          ></button>
                        </div>
                        <div className="modal-body mx-auto fw-bold">
                          確定下架商品嗎?
                        </div>
                        <div className="modal-footer  mx-auto">
                          {/* <button
                        type="button"
                        className="btn btn-secondary"
                        data-bs-dismiss="modal"
                      >
                        Close
                      </button> */}
                          <button type="button" className="btn btn-danger">
                            確定
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
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
                    <li>
                      <a href="#/">編輯</a>
                    </li>
                    <li>
                      <a href="#/">刪除</a>
                    </li>
                  </ul>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
