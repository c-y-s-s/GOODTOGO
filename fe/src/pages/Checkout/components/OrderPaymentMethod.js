import React, { useState, useEffect, useLayoutEffect } from "react";
import axios from "axios";
// import CheckoutProducts from "./compoments/CheckoutProducts";
import { API_URL } from "../../../utils/config";

// -------- react icon --------

import { FaStore } from "react-icons/fa";
import { RiVisaLine } from "react-icons/ri";

// -------- Moment plugin --------
import moment from "moment";
import "moment/min/locales";

export const OrderPaymentMethod = ({
  checkProductsData,
  OrderDetail,
  checkoutData,
  setOrderCheckSwitch,
  setNavShoppingDeleteParameter,
  navshoppingDeleteParameter,
}) => {
  moment.locale("zh-tw");
  // 抓出訂單所需時間格式
  let timeInsecond = moment().format("YYYY-MM-DD HH:mm:ss");
  let orderNumber = moment().format("YYMMDDHHmmss");

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

  async function handleGetOrder() {
    // 寫入按下送出訂單哪一刻的時間
    timeInsecond = moment().format("YYYY-MM-DD HH:mm:ss");
    orderNumber = moment().format("YYMMDDHHmmss");

    let response = await axios.post(`${API_URL}/checkout/orderdetail`, {
      ...OrderDetail,
      orderTime: timeInsecond,
      order_number: orderNumber + OrderDetail.id + OrderDetail.userId,
    });

    let productsResponse = await axios.post(
      `${API_URL}/checkout/userorderdetail`,
      productsArr
    );
    setNavShoppingDeleteParameter(navshoppingDeleteParameter+1);
    setOrderCheckSwitch(true);
  }
  return (
    <>
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
    </>
  );
};
export default OrderPaymentMethod;
