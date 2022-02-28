import { useState, useEffect, useLayoutEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
// import CheckoutProducts from "./compoments/CheckoutProducts";
import { API_URL } from "../../utils/config";
import { ERR_MSG } from "../../utils/error";
// -------- react icon --------
import { FaStore } from "react-icons/fa";
import { RiVisaLine } from "react-icons/ri";
const Checkout = () => {
  return (
    <div>
      <div className="container">
        <div className="col-9  mx-auto checkout-data  ">
          <table class="table checkout-data-table able-dark table-borderless table align-middle table-sm">
            <thead className="checkout-title ">
              <tr className="">
                <th scope="col ">
                  <div className="d-flex pb-3 align-items-center ">
                    <FaStore className="checkout-title-icon" />
                    <div className="checkout-title-storename ">額媽媽總店</div>
                    <div className="checkout-title-category">麵食</div>
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

            {/* // ! */}
            <tbody className="checkout-data-products">
              {/* //? -------- 商品區塊開始 -------- */}
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

                    <div className="col-12">
                      <div className="checkout-data-products-name d-md-flex">
                        <div className="text-start ">麵包包包包</div>

                        {/* // md 以下出現區塊 */}
                        <div className="checkout-data-products-price d-md-none  text-start pt-2">
                          $ 60
                        </div>
                      </div>
                      <div className="checkout-data-products-amount d-md-none d-flex align-items-center pt-2">
                        <div className="checkout-data-products-md-style ">
                          數量:
                        </div>
                        <div className="ps-2 checkout-data-products-md-style-amount">
                          2
                        </div>
                      </div>
                      <div className="checkout-data-products-total d-md-none d-flex align-items-center pt-2">
                        <div className="checkout-data-products-md-style ">
                          小計:
                        </div>
                        <div className="ps-2 checkout-data-products-md-style-total">
                          $120
                        </div>
                      </div>
                    </div>
                  </div>
                </th>

                <td
                  className="py-3 checkout-data-products-price   checkout-data-products-md-none
                "
                >
                  $60
                </td>
                <td className="py-3 checkout-data-products-amount checkout-data-products-md-none">
                  2
                </td>
                <td className="py-3 text-end checkout-data-products-total checkout-data-products-md-none">
                  $120
                </td>
              </tr>
              {/* //? -------- 商品區塊結束 -------- */}

              {/* 付款金額 */}
              <tr>
                <td colspan="4" className="text-md-end order-total  ">
                  付款金額 :
                  <span className="order-total-price">
                    <sapn className="order-total-price-NT">NT$</sapn>360
                  </span>
                </td>
              </tr>

              {/* //! 判斷付款方式顯示哪個區塊 */}

              <tr className="checkout-data-products-footer ">
                <td colspan="1" className="payment-method">
                  <div>現場付款</div>
                </td>

                {/* //! 判斷付款方式顯示哪個區塊 */}
                {/* <td
                  colspan="1"
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
                <td colspan="3" className="send-order">
                  <button>
                    <div className="get-order ">完成結帳</div>
                  </button>
                </td> */}
              </tr>

              {/* //平板以下出現區塊 */}
              <div className=" checkout-data-products-footer-md d-md-none">
                <div className="payment-method-md">
                  <div className="payment-method ">現場付款</div>
                </div>

                {/* <div className="payment-method-md">
                  <div className="payment-method-card-name">信用卡付款</div>
                </div>
                <div className="pt-3">
                  <RiVisaLine className="payment-method-card-company" />
                </div>
                <div className="payment-method-card-number ps-3 pt-2">
                  ***** ***** ***** 6543
                </div>
                <button className="send-order-md">完成結帳</button>*/}
              </div>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
