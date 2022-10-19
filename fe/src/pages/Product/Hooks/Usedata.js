import  {useEffect, useState}from 'react'
import axios from "axios";
import { API_URL } from "../../../utils/config";


  export const UseGetData = (typeUrl, id) => {
    const [data, setDate] = useState([]);
    useEffect(() => {
      let getData = async () => {
        let dataResponse = await axios.get(`${API_URL}/${typeUrl}/${id}`);
        setDate(dataResponse.data);
      };
      getData();
    }, [typeUrl,id]);
    return data;
  };

  export const UseGetStoreData = (id) => {
    const [data, setDate] = useState({
      longitude:"",
      latitude:"",
      storeLikeTotal:"",
    });

 useEffect(() => {
   let getData = async () => {
     // 店家經緯度
     let storeMapDataResponse = await axios.get(`${API_URL}/storesmap/${id}`);
     // 店家愛心總數
     let storeLikeDataResponse = await axios.get(
       `${API_URL}/products/storelike/${id}`
     );
     setDate({
       longitude: storeMapDataResponse.data[0].longitude,
       latitude: storeMapDataResponse.data[0].latitude,
       storeLikeTotal: storeLikeDataResponse.data[0].storeLikeTotal,
     });
   };
   getData();
 }, [id]);

    return data;
  };



export const UseProductsCommentPageDate = (typeUrl, storeId, page) => {
  const [data, setData] = useState({
    totalPage: "",
    lastPage: 1,

  });
  useEffect(() => {
    let getData = async () => {
      // 預設 create_time DESC API
      let productsCommentResponse = await axios.get(
        `${API_URL}/${typeUrl}/${storeId}?page=${page}`
      );

      setData({
        totalPage: productsCommentResponse.data.pagination.total,
        lastPage: productsCommentResponse.data.pagination.lastPage,
     
      });
    };

    getData();
  }, [page, storeId, typeUrl]);
  return data;
};

export const UseProductsCommentTotalData = (
  typeUrl,
  storeId,
  page,
  setIsLoading,
  productsCommitStarSortSwitch,
  productsCommitTimeSortSwitch
) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    let getData = async () => {
      // 預設 create_time DESC API
      let productsCommentResponse = await axios.get(
        `${API_URL}/${typeUrl}/${storeId}?page=${page}`
      );
      //評價 DESC API
      let productsCommentStarDescResponse = await axios.get(
        `${API_URL}/productscommentstardesc/${storeId}?page=${page}`
      );
      // 評價 ASC API
      let productsCommentStarAscResponse = await axios.get(
        `${API_URL}/productscommentstarasc/${storeId}?page=${page}`
      );
      // create_time ASC API
      let productsCommentTimeAscResponse = await axios.get(
        `${API_URL}/productscommenttimeasc/${storeId}?page=${page}`
      );
      setData(productsCommentResponse.data.data);

      // 判斷 評分、留言開關 boolean 帶入不同支api
      if (productsCommitTimeSortSwitch === false) {
        setData(productsCommentResponse.data.data);
      } else if (productsCommitStarSortSwitch === true) {
        setData(productsCommentStarDescResponse.data.data);
      } else if (productsCommitStarSortSwitch === false) {
        setData(productsCommentStarAscResponse.data.data);
      } else if (productsCommitTimeSortSwitch === true) {
        setData(productsCommentTimeAscResponse.data.data);
      }
    };

    getData();
    setTimeout(() => {
      setIsLoading(false);
    }, 800);
  }, [page, productsCommitStarSortSwitch, productsCommitTimeSortSwitch, setIsLoading, storeId, typeUrl]);
  return data;
};
