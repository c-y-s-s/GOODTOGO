import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../utils/config";

// -------- 引入元件區塊 --------
import StoreLogo from "./component/StoreLogo";
import StoreDetails from "./component/StoreDetails";
import StoreCanopy from "./component/StoreCanopy";
import Storebutton from "./component/StoreButton";
import StoreCard from "./component/ProductsCard";
import StoreProductsComment from "./component/Productscomment.js";
import ProductsDetails from "./component/ProductsCard";
// -------- 引入元件區塊結束 --------

const Product = ({ setisModalTouch }) => {
  //取出網址上的 storeId 這邊的 sroreId 是對應到 app.js 若要更改要同步更改
  const { storeId } = useParams();
  const [error, setError] = useState(null);
  // 存商家商品
  // const [productsdata, setProducts] = useState([]);
  // 存商家資料
  const [storeData, setStoreData] = useState([]);
  // 存指定商家 ID 評論
  const [productsComment, setproductsComment] = useState([]);
  // 切換按鈕
  const [buttonToggle, setbutonToggle] = useState("products");
  // 店家時間休息營業?
  const [storeinOperation, setStoreInOperation] = useState("");
  // 店家星期休息營業?
  const [storeTodayClose, setStoreTodayClose] = useState("");

  // 存倒數計時有沒有結束
  // const [countdownTimeUp, setCountdownTimeUp] = useState("");
  // console.log("index --------->",countdownTimeUp);
  //串接後端API
  //倒數計時變 true 自動重抓一次 api

  useEffect(() => {
    let getStores = async () => {
      let storeResponse = await axios.get(`${API_URL}/stores/${storeId}`);

      setStoreData(storeResponse.data);
    };
    getStores();
  }, []);
  // 遮雨棚參數
  const canopyTotal = Array.from({ length: 30 });

  return (
    <div>
      {/* -------- 商家Logo、詳細資訊區塊 -------- */}
      <StoreDetails
        storeData={storeData}
        storeId={storeId}
        setStoreInOperation={setStoreInOperation}
        setStoreTodayClose={setStoreTodayClose}
        storeTodayClose={storeTodayClose}
      />
      {/* -------- 商家Logo、詳細資訊區塊結束 -------- */}

      {/* -------- 綠色裝飾橫條小條  --------*/}
      <div className="container-fluid p-0 horizontalBar">
        <div></div>
      </div>
      <div className="container">
        {/*-------- 遮雨棚區塊 --------*/}
        {/* <StoreCanopy canopy={canopyTotal} /> */}
        {/* -------- 餐點、評論按鈕 --------*/}
        <Storebutton
          storeId={storeId}
          setbutonToggle={setbutonToggle}
          buttonToggle={buttonToggle}
        />
      </div>
      {/* ------- 商品資訊 --------*/}
      {buttonToggle === "products" ? (
        <StoreCard
          storeId={storeId}
          storeinOperation={storeinOperation}
          storeTodayClose={storeTodayClose}
          setisModalTouch={setisModalTouch}
        />
      ) : (
        <StoreProductsComment productsComment={productsComment} />
      )}
      {/* -------- 綠色裝飾橫條大條 --------*/}
      <div className="container-fluid p-0  horizontalBarBottom">
        <div></div>
      </div>
    </div>
  );
};
export default Product;
