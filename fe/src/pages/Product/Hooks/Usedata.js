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