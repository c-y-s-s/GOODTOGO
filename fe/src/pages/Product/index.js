import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

// -------- 引入元件區塊 --------
import StoreDetails from "./component/StoreDetails";
import Storebutton from "./component/StoreButton";
import StoreCard from "./component/ProductsCard";
import StoreProductsComment from "./component/ProductsComment.js";
import { UseGetData } from "./Hooks/Usedata";
// -------- 引入元件區塊結束 --------

const Product = ({ setisModalTouch }) => {
  //取 url 上面的 storeId  app.js 若要更改要同步更改
  const { storeId } = useParams();

  // 切換按鈕
  const [buttonToggle, setbutonToggle] = useState("products");
  // 店家時間休息或營業
  const [storeinOperation, setStoreInOperation] = useState("");
  // 店家星期休息或營業
  const [storeTodayClose, setStoreTodayClose] = useState("");

  return (
    <div>
      {/* -------- 商家Logo、詳細資訊區塊 -------- */}
      <StoreDetails
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
        <StoreProductsComment />
      )}
      {/* -------- 綠色裝飾橫條大條 --------*/}
      <div className="container-fluid p-0  horizontalBarBottom">
        <div></div>
      </div>
    </div>
  );
};
export default Product;
