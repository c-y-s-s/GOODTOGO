import { useState, useEffect, useLayoutEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../../utils/config";
// ------- reacticon ------
import { FiMinusCircle } from "react-icons/fi";
import { FiPlusCircle } from "react-icons/fi";
import { FiX } from "react-icons/fi";

const ProductsData = ({
  storeid,
  setDeleteLive,
  deleteLive,
  setPriceTotal,
  priceTotal,
}) => {
  const [specifyProductsData, setSpecifyProductsData] = useState([]);

  // 加減數量刷新api開關
  const [productsAmountTotal, setProductsAmountTotal] = useState(0);

  async function handleMinus(item) {
    //點到就刷新 商品表 api
    setProductsAmountTotal(productsAmountTotal+1);
    //點到就刷新 店家所有購物車 api
    setPriceTotal(!priceTotal);
    let response = await axios.post(`${API_URL}/shop/shoppingcartotoal`, item);
  }

  async function handlePlus(item) {
       setProductsAmountTotal(productsAmountTotal + 1);
    setPriceTotal(!priceTotal);

    let response = await axios.post(`${API_URL}/shop/shoppingcartotoal`, item);
  }
  // console.log("加減數量", productsAmountTotal);
  
  async function handleDeleteProduct(item) {
    //為刷新useEffect所設置
    setProductsAmountTotal(productsAmountTotal + 1);
    setPriceTotal(!priceTotal);
    setDeleteLive(!deleteLive);

    let response = await axios.post(
      `${API_URL}/shop/shoppingcartotoaldelete`,
      item
    );
    // console.log(response.data);
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
  }, [productsAmountTotal, deleteLive]);

  return (
    <div>
      {specifyProductsData.map((item) => {
 
        return (
          <div
            className="d-flex user-shopping-cart-products-data"
            key={item.id}
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
                  <button
                    className="user-shopping-cart-products-data-rwd-delete"
                    onClick={() => {
                      handleDeleteProduct({
                        id: item.id,
                      });
                    }}
                  >
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

                  {item.amount > 1 ? (
                    <button
                      className=" buy-num-minus equation"
                      onClick={() => {
                        handleMinus({
                          id: item.id,
                          amount: item.amount - 1,
                        });
                      }}
                    >
                      <FiMinusCircle className="icon" />
                    </button>
                  ) : (
                    <button className=" buy-num-minus equation">
                      <FiMinusCircle className="icon" />
                    </button>
                  )}

                  <div className=" buy-num-num ">{item.amount}</div>
                  {/* 加號 */}
                  {item.amount < item.sale_amount ? (
                    <button
                      className=" buy-num-plus equation"
                      onClick={() => {
                        handlePlus({
                          id: item.id,
                          amount: item.amount + 1,
                        });
                      }}
                    >
                      <FiPlusCircle className="icon" />
                    </button>
                  ) : (
                    <button className=" buy-num-plus equation">
                      <FiPlusCircle className="icon" />
                    </button>
                  )}
                </div>
              </div>

              <div className="d-flex user-shopping-cart-products-data-rwd-total">
                <div className="user-shopping-cart-products-data-price-total d-flex">
                  <div className="user-shopping-cart-products-data-price-total-chinese-title">
                    小計:
                  </div>
                  <span className="ps-2 pe-2">$</span>
                  <div>{item.price * item.amount}</div>
                </div>
                <div className="user-shopping-cart-products-data-delete">
                  <button
                    onClick={() => {
                      handleDeleteProduct({
                        id: item.id,
                      });
                    }}
                  >
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
