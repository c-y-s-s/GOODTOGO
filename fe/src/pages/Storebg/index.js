import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../utils/config";

// -------- 引入元件區塊 --------
import LeftNavbar from "./component/LeftNavbar";
import TopNavbar from "./component/TopNavbar";
import NewProduct from "./component/NewProduct";
import Total from "./component/Total";

// -------- 引入元件區塊結束 --------

// -------- icons 開始 --------

// FillMore icon
import { FiMoreVertical } from "react-icons/fi";
// Sort icon
import { BsSortUp } from "react-icons/bs";
// -------- icons 結束 --------

// Logo 圖片
import { ReactComponent as Logo } from "../../images/logo.svg";

const StoreBg = () => {
  const [error, setError] = useState(null);

  const [data, setData] = useState([]);
  const [storeData, setStoreData] = useState([]);

  // const { storeId } = useParams();

  useEffect(() => {
    let getProducts = async () => {
      let productsResponse = await axios.get(`${API_URL}/products`);
      let storeResponse = await axios.get(`${API_URL}/stores`);

      setData(productsResponse.data);
      setStoreData(storeResponse.data);
      // console.log(storeResponse.data);
      // console.log(productsResponse.data);
    };
    getProducts();
  }, []);

  return (
    <>
      {/* -------- 左邊導覽列 開始 -------- */}
      <LeftNavbar />
      {/* -------- 左邊導覽列 結束 -------- */}

      <div className="main">
        {/* -------- 至頂導覽列 開始 -------- */}
        {storeData.map((item) => {
          return (
            <div key={item.id}>
              <TopNavbar name={item.name} />
            </div>
          );
        })}
        {/* <TopNavbar /> */}
        {/* -------- 至頂導覽列 結束 -------- */}
        {/* -------- 排序和新增商品 開始 -------- */}
        <NewProduct />
        {/* -------- 排序和新增商品 結束 -------- */}
        {/* -------- 筆數和總數 開始 -------- */}
        <Total />
        {/* {storeData.map((item) => {
          return (
            <div key={item.id}>
              <Total name={item.name} />
            </div>
          );
        })}; */}
        {/* -------- 筆數和總數 結束 -------- */}
        <table>
          <thead>
            <tr>
              <th className=""></th>
              <th className="store-bg-td ">商家名稱</th>
              <th className="store-bg-td">價格</th>
              <th className="store-bg-td">數量</th>
              <th className="store-bg-td">已售出</th>
              <th className="store-bg-td">販售時間</th>
              <th className="store-bg-td">上架時間</th>
              <th className="store-bg-td">狀態</th>
              <th className=""></th>
            </tr>
          </thead>
          <tbody>
            {storeData.map((item) => {
              return (
                <tr key={item.id} className="store-bg-center">
                  <td className="">
                    <div className="user">
                      <img src={require("./images/img1.jpg")} alt="" />
                    </div>
                  </td>
                  <td className="store-bg-td-1">
                    <div>麵包</div>
                  </td>
                  <td>NT$45</td>
                  <td>10</td>
                  <td>1</td>
                  <td>PM 6:30 ~ PM 8:30</td>
                  <td>
                    <div>May 26,2019</div>
                    <div>PM 6:30</div>
                  </td>
                  <td>
                    <button>下架中</button>
                  </td>
                  <td>
                    <FiMoreVertical />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <nav aria-label="Page navigation example">
          <ul className="pagination">
            <li className="page-item">
              <a className="page-link" href="#/" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
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
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default StoreBg;
