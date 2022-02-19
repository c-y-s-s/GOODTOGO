import { useState, useEffect } from "react";
import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../utils/config";
// import StoreLogo from "../Product/component/StoreLogo";
// import StoreDetails from "../Product/component/StoreDetails";
// import StoreCanopy from "../Product/component/StoreCanopy";
// import Storebutton from "../Product/component/StoreButton";
// import StoreCard from "../Product/component/StoreCard";
// import Product from "../Product/index";

const Productcomment = () => {
  const { storeId } = useParams();
  const [data, setData] = useState([]);
  const [storeData, setStoreData] = useState([]);

  useEffect(() => {
    let getProducts = async () => {
            let storeResponse = await axios.get(`${API_URL}/stores/${storeId}`);
      let productsCommitResponse = await axios.get(
        `${API_URL}/productscommit/${storeId}`
      );
      
      setStoreData(storeResponse.data);
      setData(productsCommitResponse.data);
      console.log(productsCommitResponse.data);
    };
    getProducts();
  }, []);

  return (
    <div>
      
    </div>
  );
};

export default Productcomment;
