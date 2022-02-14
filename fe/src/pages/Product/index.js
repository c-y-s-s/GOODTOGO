import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../utils/config";

// -------- 引入元件區塊 --------
import StoreLogo from "./component/StoreLogo";
import StoreDetails from "./component/StoreDetails";
import StoreCanopy from "./component/StoreCanopy";
import Storebutton from "./component/Storebutton";
import StoreCard from "./component/StoreCard";
import StoreProductsCommit from "./component/StoreProductsCommit";
// -------- 引入元件區塊結束 --------

const Product = () => {
  const [error, setError] = useState(null);

  //後端資料使用陣列格式，所以這邊給她空陣列
  const [data, setData] = useState([]);
  const [storeData, setStoreData] = useState([]);
  const [productsComment, setproductsComment] = useState([]);
  //取出網址上的 storeId 這邊的 sroreId 是對應到 app.js 若要更改要同步更改
  const { storeId } = useParams();

  //串接後端API
  useEffect(() => {
    let getProducts = async () => {
      let productsResponse = await axios.get(`${API_URL}/products/${storeId}`);
      let storeResponse = await axios.get(`${API_URL}/stores/${storeId}`);
      let productsCommentResponse = await axios.get(
        `${API_URL}/productscommit/${storeId}`
      );
      setData(productsResponse.data);
      setStoreData(storeResponse.data);
      setproductsComment(productsCommentResponse.data);
    };
    getProducts();
  }, []);

  // 遮雨棚參數
  const canopyTotal = Array.from({ length: 30 });

  // -------- ID區塊先用來避免產生錯誤之後會修改 -------
  let storeDataID = 1;
  // -------- ID 結束 --------

  return (
    <div>
      {/* -------- 商家Logo、詳細資訊區塊 -------- */}
      {storeData.map((item) => {
        {
          storeDataID++;
        }
        return (
          <div key={storeDataID}>
            <StoreLogo logo={item.logo} />
            <StoreDetails
              name={item.name}
              address={item.address}
              tel={item.tel_no}
            />
          </div>
        );
      })}
      {/* -------- 商家Logo、詳細資訊區塊結束 -------- */}

      {/* -------- 綠色裝飾橫條小條  --------*/}
      <div className="container-fluid p-0 horizontalBar">
        <div></div>
      </div>

      <div className="container">
        {/*-------- 遮雨棚區塊 --------*/}
        <StoreCanopy canopy={canopyTotal} />
        {/* -------- 餐點、評論按鈕 --------*/}
        <Storebutton storeId={storeId} />
      </div>

      {/* ------- 商品資訊卡片 --------*/}
      <StoreCard data={data} />

      {/* -------- 商店總評論 -------- */}
      <StoreProductsCommit />
      {/* 商品詳細資料 */}
      <div className="container products-details">
        <div className="col-12 mt-5 products-details-data">
          <div className="card mx-auto" style={{ width: `22rem` }}>
            <img src={require(`../../images/store_img/01.jpg`)} alt="" />
            <div className="card-body px-4">
              <h5 className="card-title">鴨肉蓋飯</h5>
              <div className="d-flex justify-content-between card-value">
                <div className="card-star">星星</div>
                <div className="card-price">NT$ 60</div>
              </div>
              <p className="card-text mb-0">
                使用特選鴨肉及米飯，吃得出師傅的好手藝及食材本身的美味
              </p>
              <p className=" card-text">本商品不附帶免洗餐具</p>
              <div>
                <div className="d-flex justify-content-between">
                  <div>合計金額</div>
                  <div>餐點剩餘 0</div>
                </div>

                <div className="d-flex justify-content-between card-amount">
                  <div className="card-total-price ">NT $ 240</div>
                  <div className="d-flex buy-num">
                    <button className=" buy-num-minus equation">-</button>
                    <div className="buy-num-num ">4</div>
                    <button className=" buy-num-plus equation">+</button>
                  </div>
                </div>
              </div>
              <div className="product-buy-car my-3 text-center">
                <a href="#" className="btn btn-primary py-3  ">
                  加入購物車
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 商品詳細資料結束 */}
      {/* -------- 綠色裝飾橫條大條 --------*/}
      <div className="container-fluid p-0  horizontalBarBottom">
        <div></div>
      </div>
    </div>
  );
};
export default Product;
