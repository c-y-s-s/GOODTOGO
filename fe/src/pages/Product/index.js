import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../utils/config";
import "./styles/product.scss";
const Product = () => {
  const [error, setError] = useState(null);

  //後端資料使用陣列格式，所以這邊給她空陣列
  const [data, setData] = useState([]);
  const [storeData, setStoreData] = useState([]);

  //取出網址上的 storeId 這邊的 sroreId 是對應到 app.js 若要更改要同步更改
  const { storeId } = useParams();

  useEffect(() => {
    let getProducts = async () => {
      let productsResponse = await axios.get(`${API_URL}/products/${storeId}`);
      let storeResponse = await axios.get(`${API_URL}/stores/${storeId}`);
      // console.log("productsData", productsResponse.data);
      // console.log("setStoreData", storeResponse.data);
      setData(productsResponse.data);
      setStoreData(storeResponse.data);
    };
    getProducts();
  }, []);

  const canopyTotal = Array.from({ length: 30 });
  console.log(data);
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

        <div class="product-button text-center">
          <button type="button" class="btn  ">
            餐點
          </button>
          <button type="button" class="btn  ">
            評論
          </button>
        </div>

        <div class="container">
          <div className="row cards">
            {data.map((item) => {
              return (
                <div
                  className="col-12 col-md-6 col-lg-3 product-card "
                  style={{ width: `18rem` }}
                >
                  <div class="card m-0 ">
                    <div class="d-flex product-card-text">
                      <div class="time-text">
                        時間倒數<span>02:56:33</span>
                      </div>
                      <div class="amount-text">剩餘{item.amount}</div>
                    </div>
                    <div class="product-img ratio ratio-4x3 ">
                      <img
                        class=" cover-fit"
                        src={require(`../../images/products_img/${item.img}`)}
                        alt="商品"
                      />
                    </div>
                    <div class="card-body">
                      <div class="card-title">{item.name}</div>
                      <div class="card-star">評價的部分</div>
                      <div class="card-text">{item.description}</div>
                      <div class="text-end "> NT$ {item.price}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
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
