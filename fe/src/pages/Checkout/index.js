import React, { useState, useEffect, useLayoutEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
// import CheckoutProducts from "./compoments/CheckoutProducts";
import { API_URL } from "../../utils/config";
import { ERR_MSG } from "../../utils/error";
// -------- react icon --------

import { FaStore } from "react-icons/fa";
import { RiVisaLine } from "react-icons/ri";
// -------- Moment plugin --------
import moment from "moment";
import "moment/min/locales";

const Checkout = ({ checkoutData }) => {
  moment.locale("zh-tw");

  // 計算當前時間
  let timeInsecond = moment().format("YYYY-MM-DD HH:mm:ss");
  let orderNumber = moment().format("YYMMDDHHmmsss");

  // 頁面商品資料
  const [checkProductsData, setCheckProductsData] = useState([]);
 
  // 後端訂單所需要資料
  const [OrderDetail, setOrderDetail] = useState({
    id: "",
    userId: "1",
    storeId: checkoutData.storeId,
    statusId: "1",
    paymentMethod: checkoutData.paymentMethod,
    orderTime: timeInsecond,
    order_number: orderNumber,
  });

  // 將商品存成陣列寫進資料庫，因需跟訂單號一起寫入所以用此方法
  let productsArr = [];
  checkProductsData.forEach((item) => {
    let obj = {
      orderId: OrderDetail.id,
      productsId: item.products_id,
      amount: item.amount,
    };
    productsArr.push(obj);
  });


  // const [OrderProduct, setOrderProduct] = useState([]);

  useEffect(() => {
    let getcheckProductsData = async () => {
      //撈指定 ID 商品的評論
      let checkProductsDataResponse = await axios.get(
        `${API_URL}/checkout/${checkoutData.storeId}`
      );
      // 訂單最大 id API
      let orderMaxIdResponse = await axios.get(
        `${API_URL}/checkout/maxorderid`
      );
      setCheckProductsData(checkProductsDataResponse.data);
      setOrderDetail({ ...OrderDetail, id: orderMaxIdResponse.data + 1 });
    };
    getcheckProductsData();
  }, []);

  async function handleGetOrder() {
   
    let response = await axios.post(
      `${API_URL}/checkout/orderdetail`,
      OrderDetail
    );

    let productsResponse = await axios.post(
      `${API_URL}/checkout/userorderdetail`,
      productsArr
    );
  }
  return (
    <div>
      <div className="container-fluid checkout-top-title">確認結帳</div>
      <div className="container">
        <div className="col-9  mx-auto checkout-data  ">
          <table className="table checkout-data-table able-dark table-borderless table align-middle table-sm">
            <thead className="checkout-title ">
              <tr className="">
                <th scope="col ">
                  <div className="d-flex pb-3 align-items-center ">
                    <FaStore className="checkout-title-icon" />
                    <div className="checkout-title-storename ">
                      {checkoutData.storeName}
                    </div>
                    <div className="checkout-title-category">
                      {checkoutData.storeCategory}
                    </div>
                  </div>
                </th>

                <th
                  scope="col "
                  className="text-center checkout-title-price pb-4 checkout-title-none"
                >
                  單價
                </th>
                <th
                  scope="col "
                  className="text-center checkout-title-amount pb-4  checkout-title-none"
                >
                  數量
                </th>
                <th
                  scope="col "
                  className="text-end checkout-title-total pb-4 checkout-title-none"
                >
                  小計
                </th>
              </tr>
            </thead>

   
            <tbody className="checkout-data-products">
              {/* //? -------- 商品區塊開始 -------- */}
              {checkProductsData.map((item) => {
                console.log("item----", item);
                return (
                  <>
                    <tr className="text-center" key={item.id}>
                      <th scope="row" className="py-3">
                        <div className="d-flex align-items-center">
                          <div>
                            <img
                              className="cover-photo"
                              src={require(`../../images/products_img/${item.img}`)}
                              alt=""
                            />
                          </div>

                          <div className="col-12">
                            <div className="checkout-data-products-name d-md-flex">
                              <div className="text-start ">
                                {item.product_name}
                              </div>

                              {/* // md 以下出現區塊 */}
                              <div className="checkout-data-products-price d-md-none  text-start pt-2">
                                $ {item.price}
                              </div>
                            </div>
                            <div className="checkout-data-products-amount d-md-none d-flex align-items-center pt-2">
                              <div className="checkout-data-products-md-style ">
                                數量:
                              </div>
                              <div className="ps-2 checkout-data-products-md-style-amount">
                                {item.amount}
                              </div>
                            </div>
                            <div className="checkout-data-products-total d-md-none d-flex align-items-center pt-2">
                              <div className="checkout-data-products-md-style ">
                                小計:
                              </div>
                              <div className="ps-2 checkout-data-products-md-style-total">
                                ${item.price * item.amount}
                              </div>
                            </div>
                          </div>
                        </div>
                      </th>

                      <td
                        className="py-3 checkout-data-products-price   checkout-data-products-md-none
                "
                      >
                        ${item.price}
                      </td>
                      <td className="py-3 checkout-data-products-amount checkout-data-products-md-none">
                        {item.amount}
                      </td>
                      <td className="py-3 text-end checkout-data-products-total checkout-data-products-md-none">
                        ${item.price * item.amount}
                      </td>
                    </tr>
                  </>
                );
              })}

              {/* //? -------- 商品區塊結束 -------- */}

              {/* 付款金額 */}
              <tr>
                <td colSpan="4" className="text-md-end order-total  ">
                  付款金額 :
                  <span className="order-total-price">
                    <span className="order-total-price-NT">NT$</span>
                    {checkoutData.orderPriceTotal}
                  </span>
                </td>
              </tr>

              {/* //! 判斷付款方式顯示哪個區塊 */}

              {checkoutData.paymentMethod === "1" && (
                <tr className="checkout-data-products-footer ">
                  <td colSpan="1" className="payment-method">
                    <div>現場付款</div>
                  </td>
                  <td colSpan="3" className="send-order">
                    <button onClick={handleGetOrder}>
                      <div className="get-order ">完成結帳</div>
                    </button>
                  </td>
                </tr>
              )}
              {checkoutData.paymentMethod === "2" && (
                <tr className="checkout-data-products-footer ">
                  <td
                    colSpan="1"
                    className="d-flex payment-method-card align-items-center"
                  >
                    <div className="payment-method-card-name">信用卡付款</div>
                    <div className=" ps-3">
                      <RiVisaLine className="payment-method-card-company" />
                    </div>
                    <div className="payment-method-card-number ps-3">
                      ***** ***** ***** 6543
                    </div>
                  </td>
                  <td colSpan="3" className="send-order">
                    <button onClick={handleGetOrder}>
                      <div className="get-order ">完成結帳</div>
                    </button>
                  </td>
                </tr>
              )}

              {/* //平板以下出現區塊 */}
              {checkoutData.paymentMethod === "1" && (
                <div className=" checkout-data-products-footer-md d-md-none">
                  <div className="payment-method-md">
                    <div className="payment-method ">現場付款</div>
                  </div>
                  <button className="send-order-md" onClick={handleGetOrder}>
                    完成結帳
                  </button>
                </div>
              )}
              {checkoutData.paymentMethod === "2" && (
                <div className=" checkout-data-products-footer-md d-md-none">
                  <div className="payment-method-md">
                    <div className="payment-method-card-name">信用卡付款</div>
                  </div>
                  <div className="pt-3">
                    <RiVisaLine className="payment-method-card-company" />
                  </div>
                  <div className="payment-method-card-number ps-3 pt-2">
                    ***** ***** ***** 6543
                  </div>
                  <button className="send-order-md" onClick={handleGetOrder}>
                    完成結帳
                  </button>
                </div>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
