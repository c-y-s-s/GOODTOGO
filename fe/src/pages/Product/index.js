import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Product = () => {
  const [error, setError] = useState(null);

  //後端資料使用陣列格式，所以這邊給她空陣列
  const [data, setData] = useState([]);
  const [storeData, setStoreData] = useState([]);

  //取出網址上的 storeId 這邊的 sroreId 是對應到 app.js 若要更改要同步更改
  const { storeId } = useParams();

  useEffect(() => {
    let getProducts = async () => {
      let productsResponse = await axios.get(
        `http://localhost:3001/api/products/${storeId}`
      );
      let storeResponse = await axios.get(
        `http://localhost:3001/api/stores/${storeId}`
      );
      // console.log("productsData", productsResponse.data);
      // console.log("setStoreData", storeResponse.data);
      setData(productsResponse.data);
      setStoreData(storeResponse.data);
    };
    getProducts();
  }, []);

  const canopyTotal = Array.from({ length: 30 });

  return (
    <div>
      {storeData.map((item) => {
        return (
          <div>
            <div class="container-fluid p-0">
              <div class="storeLogo">
                <img
                  class="w-100 storeLogoImg"
                  src={require(`../../images/store_img/${item.logo}`)}
                  alt=""
                />
              </div>
            </div>
            <div class="container store-data">
              <div class="d-flex">
                <div class="storeDataLeft">
                  <h1>{item.name}</h1>
                  <div class="d-flex">
                    <p>分類</p>
                    <p>星星</p>
                    <p>愛心</p>
                  </div>
                  <p>{item.address}</p>
                  <div>
                    <p>營業日</p>
                    <p>顯示營業中非營業中</p>
                  </div>
                  <p>{item.tel_no}</p>
                  <p>店家介紹 : Lorem ipsum, dolor sit amet consectetur</p>
                </div>
                <div class="store-map">
                  <p class="">google地圖</p>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      <div className="container-fluid p-0 horizontalBar">
        <div></div>
      </div>

      <div className="container canopy">
        <ul class="d-flex">
          {canopyTotal.map((item) => {
            return <li></li>;
          })}
        </ul>
      </div>
    </div>
  );
};

export default Product;

{
  /* <div>
            <ul class=" ms-5 list-unstyled">
              <li>name : {item.name}</li>
              <li>
                <img
                  src={require(`../../images/products_img/${item.img}`)}
                  alt=""
                />
              </li>
              <li>price : {item.price}</li>
              <li>amount : {item.amount}</li>
              <li>description: {item.description}</li>
              <li>start_time: {item.start_time}</li>
              <li>due_time: {item.due_time}</li>
              <li>created_at: {item.created_at}</li>
            </ul>
          </div> */
}
