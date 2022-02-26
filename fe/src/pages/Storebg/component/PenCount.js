import { useState, useEffect } from "react";
import axios from "axios";

import { API_URL } from "../../../utils/config";

const PenCount = () => {
  // 店家商品列表
  const [productsData, setproductsData] = useState([]);

  useEffect(() => {
    // http://localhost:3002/api/member/proile
    let setProducts = async () => {
      let response = await axios.get(`${API_URL}/storebg/products`, {
        withCredentials: true, // 為了跨源存取 cookie // 登入狀態帶著 cookie 跟後端要資料
      });
      setproductsData(response.data);
    };
    setProducts();
  }, []);
  
  return (
    <div>
      <div className="d-flex justify-content-between my-3">
        <div>第 1 ~ 8 筆</div>
        <div className="text-end ">共{productsData.length}筆資料</div>
      </div>
    </div>
  );
};

export default PenCount;
