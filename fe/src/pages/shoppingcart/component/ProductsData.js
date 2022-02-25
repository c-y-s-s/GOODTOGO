import { useState, useEffect, useLayoutEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../../utils/config";
// ------- reacticon ------
import { FiMinusCircle } from "react-icons/fi";
import { FiPlusCircle } from "react-icons/fi";
import { FiAlertCircle } from "react-icons/fi";
import { FiX } from "react-icons/fi";
import { v4 as uuidv4 } from "uuid";
const ProductsData = ({ storeid }) => {
  const [specifyProductsData, setSpecifyProductsData] = useState([]);

  const [productsAmountTotal, setProductsAmountTotal] = useState(3);

  function handleMinus(e) {
    setProductsAmountTotal(productsAmountTotal - 1);
  }
  function handlePlus(e) {
    setProductsAmountTotal(productsAmountTotal + 1);
  }
  // 撈使用者所有購物車資料裡面符合 storeid 的商品資料
  useEffect(() => {
    let getShoppingProductsData = async () => {
      //撈指定 ID 商品的評論
      let shoppingProductsDataResponse = await axios.get(
        `${API_URL}/shop/shoppingcar/1/${storeid}`
      );
      setSpecifyProductsData(shoppingProductsDataResponse.data);
    };
    getShoppingProductsData();
  }, []);

  console.log("aaaaa", specifyProductsData);
  let total = 0;

  return (
    <div>
      {specifyProductsData.map((item) => {
        return (
          <div
            className="d-flex user-shopping-cart-products-data"
            key={uuidv4()}
          >
            <div className="d-flex user-shopping-cart-products-data-name">
              <div>
                <img
                  className="cover-photo"
                  src={require(`../../../images/products_img/${item.img}`)}
                  alt=""
                />
              </div>
              <div className="user-shopping-cart-products-data-name-rwd">
                <div className="user-shopping-cart-products-data-name-delete-rwd">
                  <div className="user-shopping-cart-products-data-name">
                    {item.product_name}
                  </div>
                  <button className="user-shopping-cart-products-data-rwd-delete">
                    <FiX />
                  </button>
                </div>

                <div className="user-shopping-cart-products-data-price">
                  <span className="pe-2">$</span>
                  {item.price}
                </div>
              </div>
            </div>

            <div className="user-shopping-cart-products-data-calculate">
              <div className="d-flex user-shopping-cart-products-data-amount">
                <div className="d-flex buy-num">
                  {/* 減號 */}
                  <button
                    className=" buy-num-minus equation"
                    onClick={handleMinus}
                  >
                    <FiMinusCircle className="icon" />
                  </button>

                  <div className=" buy-num-num ">{item.amount}</div>
                  {/* 加號 */}
                  <button
                    className=" buy-num-plus equation"
                    onClick={handlePlus}
                  >
                    <FiPlusCircle className="icon" />
                  </button>
                </div>
              </div>

              <div className="d-flex user-shopping-cart-products-data-rwd-total">
                <div className="user-shopping-cart-products-data-price-total d-flex">
                  <div className="user-shopping-cart-products-data-price-total-chinese-title">
                    小計:
                  </div>
                  <span className="pe-2">$</span>
                  <div>{item.price * item.amount}</div>
                </div>
                <div className="user-shopping-cart-products-data-delete">
                  <button>
                    <FiX />
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductsData;
