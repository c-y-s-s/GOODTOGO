import  {useEffect, useState}from 'react'
import axios from "axios";
import { API_URL } from "../../../utils/config";


const UseQuery = (id) =>{

const [ data,setDate ] = useState([])

  useEffect(() => {

    let getData = async () => {
      let dataResponse = await axios.get(`${API_URL}/stores/${id}`);
      setDate(dataResponse.data);
    };
    getData();

  }, []);

  return data;
}

export default UseQuery