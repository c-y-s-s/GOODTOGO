import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../../context/auth";


import { API_URL } from "../../../utils/config";

const PenCount = () => {
  const { loginSeller } = useAuth();

  // 店家商品列表
  const [productsData, setproductsData] = useState([]);

  useEffect(() => {
    // console.log(loginSeller,"111111")
    // http://localhost:3002/api/member/proile
    let setProducts = async () => {
      let response = await axios.get(`${API_URL}/storebg/productslist?store_id=${loginSeller.id}`);
      let productsList = response.data[0];
      // console.log("10000000000000000000",productsList)
      setproductsData(productsList);
    };
    setProducts();
  }, []);

  return (
    <div>
      <div className="d-flex justify-content-end my-3">
        {/* <div>第 1 ~ 8 筆</div> */}
        <div className="text-end ">共{productsData.length}筆資料</div>
      </div>
    </div>
  );
};

export default PenCount;
