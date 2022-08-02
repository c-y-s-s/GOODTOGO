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
     let storeMapDataReaponse = await axios.get(`${API_URL}/storesmap/${id}`);
     // 店家愛心總數
     let storeLikeDataReaponse = await axios.get(
       `${API_URL}/products/storelike/${id}`
     );
     setDate({
       longitude: storeMapDataReaponse.data[0].longitude,
       latitude: storeMapDataReaponse.data[0].latitude,
       storeLikeTotal: storeLikeDataReaponse.data[0].storeLikeTotal,
     });
   };
   getData();
 }, [id]);

    return data;
  };



