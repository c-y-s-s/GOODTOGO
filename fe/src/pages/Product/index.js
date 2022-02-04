import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Product = () => {
  const [error, setError] = useState(null);

  //後端資料使用陣列格式，所以這邊給她空陣列
  const [data, setData] = useState([]);
  //取出網址上的 storeId 這邊的 sroreId 是對應到 app.js 若要更改要同步更改
  const { storeId } = useParams();

  useEffect(() => {
    let getProducts = async () => {
      let response = await axios.get(
        `http://localhost:3001/api/products/${storeId}`
      );

      setData(response.data);
    };
    getProducts();
  }, []);

  return (
    <div>
      <div class="ms-5">這是商家商品頁</div>
      {data.map((item) => {
        return (
          <div>
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
          </div>
        );
      })}
    </div>
  );
};

export default Product;
