import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../utils/config";

// -------- 引入元件區塊 --------
import LeftNavbar from "./component/LeftNavbar";
import TopNavbar from "./component/TopNavbar";

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

  const [storeData, setStoreData] = useState([]);

  // const { storeId } = useParams();

  useEffect(() => {
    let getProducts = async () => {
      let storeResponse = await axios.get(`${API_URL}/stores`);

      setStoreData(storeResponse.data);
      console.log(storeResponse.data);
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
        {/* {storeData.map((item) => {
          return (
            <div>
              <TopNavbar name={item.name} />
            </div>
          );
        })} */}
        {/* -------- 至頂導覽列 結束 -------- */}

        <div className="store-bg-sortAndAdd">
          <div className="store-bg-sort">
            <BsSortUp />
            排序
          </div>
          <div>
            <button>新增商品</button>
          </div>
        </div>
        
        <div className="store-bg-amount">
              <div>
                <h6>1~8筆</h6>
              </div>
              <div>
                <h6>共20樣商品</h6>
              </div>
            </div>
        {storeData.map((item) => {
          return(<div>

            <table>
              <thead>
                <tr>
                  <td className=""></td>
                  <td className="store-bg-td ">商家名稱</td>
                  <td className="store-bg-td">價格</td>
                  <td className="store-bg-td">數量</td>
                  <td className="store-bg-td">已售出</td>
                  <td className="store-bg-td">販售時間</td>
                  <td className="store-bg-td">上架時間</td>
                  <td className="store-bg-td">狀態</td>
                  <td className=""></td>
                </tr>
              </thead>
              <tbody>
                <tr className="store-bg-center">
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
              </tbody>
            </table>
          </div>)
          
        })}
      </div>
    </>
  );
};

export default StoreBg;
