import { useState, useEffect, useLayoutEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
// import CheckoutProducts from "./compoments/CheckoutProducts";
import { API_URL } from "../../utils/config";
import { ERR_MSG } from "../../utils/error";
// -------- react icon --------
import { FaStore } from "react-icons/fa";

const Checkout = () => {
  return (
    <div>
      <div className="container">
        <div className="col-9  mx-auto checkout-data  ">
          <table class="table checkout-data-table able-dark table-borderless table align-middle">
            <thead className="checkout-title ">
              <tr className="">
                <th scope="col ">
                  <div className="d-flex pb-3 align-items-center ">
                    <FaStore className="checkout-title-icon" />
                    <div className="checkout-title-storename">額媽媽總店</div>
                    <div className="checkout-title-category">麵食</div>
                  </div>
                </th>

                <th
                  scope="col "
                  className="text-center checkout-title-price pb-4"
                >
                  單價
                </th>
                <th
                  scope="col "
                  className="text-center checkout-title-amount pb-4"
                >
                  數量
                </th>
                <th
                  scope="col "
                  className="text-end checkout-title-total pb-4 "
                >
                  小計
                </th>
              </tr>
            </thead>

            <tbody className="checkout-data-products">
              <tr className="text-center">
                <th scope="row" className="py-3">
                  <div className="d-flex align-items-center">
                    <div>
                      <img
                        className="cover-photo"
                        src={require(`../../images/products_img/12bc6394-13cd-4426-a19b-2ad8a4c7479e.jpeg`)}
                        alt=""
                      />
                    </div>
                    <div>
                      <div className="checkout-data-products-name">
                        商品名稱
                      </div>
                      <div className="d-none ">數量</div>
                      <div className="d-none ">小計</div>
                    </div>
                  </div>
                </th>
                <td className="py-3 checkout-data-products-price ">$60</td>
                <td className="py-3 checkout-data-products-amount">2</td>
                <td className="py-3 text-end checkout-data-products-total">
                  $120
                </td>
              </tr>
              <tr>
                <td colspan="4" className="text-end order-total  ">
                  付款金額 :
                  <span className="order-total-price">
                    <sapn className="order-total-price-NT">NT$</sapn>360
                  </span>
                </td>
              </tr>
              <tr className="checkout-data-products-footer">
                <td colspan="1" className="payment-method">
                  <div>現場付款</div>
                </td>
                <td colspan="3" className="send-order">
                  <div>
                    <div className="get-order">完成結帳</div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
