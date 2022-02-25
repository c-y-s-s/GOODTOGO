import React, { useState } from "react";
// -------- react icon --------
import { FiMinusCircle } from "react-icons/fi";
import { FiPlusCircle } from "react-icons/fi";
import { FiAlertCircle } from "react-icons/fi";
import { FiX } from "react-icons/fi";
import { FaStore } from "react-icons/fa";
const shoppingcart = () => {
  return (
    <div>
      <div className="container-fluid shopping-title">購物車</div>
      <div className="container user-shopping-cart  ">
        <div className="col-9 mx-auto user-shopping-cart-data">
          {/* 標頭 */}
          <div className="d-flex user-shopping-cart-data-title">
            <div className="d-flex align-items-center">
              <div>
                <FaStore className="store-icon" />
              </div>
              <div className="user-shopping-cart-data-title-name">
                鵝媽媽總店
              </div>
              <div className="user-shopping-cart-data-title-category">麵食</div>
            </div>

            <div className="user-shopping-cart-data-title-rwd user-shopping-cart-data-price">
              單價
            </div>
            <div className="user-shopping-cart-data-title-rwd user-shopping-cart-data-amount">
              數量
            </div>
            <div className="d-flex  user-shopping-cart-data-title-rwd">
              <div className="mx-5 user-shopping-cart-data-title-rwd">小記</div>
              <div className="user-shopping-cart-data-title-rwd">刪除</div>
            </div>
          </div>

          {/* 商品本身 */}
          <div
            className="d-flex user-shopping-cart-products-data
          "
          >
            <div className="d-flex user-shopping-cart-products-data-name">
              <div>
                <img
                  className="cover-photo"
                  src={require(`../../images/products_img/12f8a80e-70de-4e7c-a1bb-d4118498f624.jpeg`)}
                  alt=""
                />
              </div>
              <div className="user-shopping-cart-products-data-name-rwd">
                <div className="user-shopping-cart-products-data-name-delete-rwd">
                  <div className="user-shopping-cart-products-data-name">
                    鴨肉蓋飯
                  </div>
                  <button className="user-shopping-cart-products-data-rwd-delete">
                    <FiX />
                  </button>
                </div>

                <div className="user-shopping-cart-products-data-price">
                  <span className="pe-2">$</span>111
                </div>
              </div>
            </div>

            <div class="user-shopping-cart-products-data-calculate">
              <div className="d-flex user-shopping-cart-products-data-amount">
                <div className="d-flex buy-num">
                  {/* 減號 */}
                  <button className=" buy-num-minus equation">
                    <FiMinusCircle className="icon" />
                  </button>

                  <div className=" buy-num-num ">2</div>
                  {/* 加號 */}
                  <button className=" buy-num-plus equation">
                    <FiPlusCircle className="icon" />
                  </button>
                </div>
              </div>

              <div className="d-flex user-shopping-cart-products-data-rwd-total">
                <div className="user-shopping-cart-products-data-price-total d-flex">
                  <div className="user-shopping-cart-products-data-price-total-chinese-title">
                    小計:
                  </div>
                  <spab className="pe-2">$</spab>
                  <div>120</div>
                </div>
                <div className="user-shopping-cart-products-data-delete">
                  <button>
                    <FiX />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* 下排 */}
          <div className="d-flex justify-content-between   user-shopping-cart-data-payment ">
            <div className="d-flex ">
              <div>付款方式 : </div>
              <div className="user-shopping-cart-data-payment-method">
                <div className="site">
                  <input
                    type="radio"
                    id="huey"
                    name="drone"
                    value="huey"
                    checked
                  />
                  <label for="huey">現場取貨付款</label>
                </div>

                <div className="credit-card">
                  <input type="radio" id="dewey" name="drone" value="dewey" />
                  <label for="dewey">信用卡付款</label>
                </div>
              </div>
            </div>
            <div>
              <div>
                訂單金額 : <span className="price_total">NT$360</span>
              </div>
            </div>
          </div>

          {/* 結帳 */}
          <div className="user-shopping-cart-data-checkout">
            <button className="">去結帳</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default shoppingcart;
