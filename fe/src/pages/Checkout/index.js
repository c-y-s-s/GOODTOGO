import React, { useState, useEffect, useLayoutEffect } from "react";
import axios from "axios";
// import CheckoutProducts from "./compoments/CheckoutProducts";
import { API_URL } from "../../utils/config";
import { ERR_MSG } from "../../utils/error";
import OrderModal from "./components/OrderModal";
import OrderProducts from "./components/OrderProducts";
import OrderPaymentMethod from "./components/OrderPaymentMethod";
// -------- react icon --------

import { FaStore } from "react-icons/fa";
import { RiVisaLine } from "react-icons/ri";

// -------- Moment plugin --------
import moment from "moment";
import "moment/min/locales";

const Checkout = ({ checkoutData }) => {
  moment.locale("zh-tw");
  // 抓出訂單所需時間格式
  let timeInsecond = moment().format("YYYY-MM-DD HH:mm:ss");
  let orderNumber = moment().format("YYMMDDHHmmsss");

  // 頁面商品資料
  const [checkProductsData, setCheckProductsData] = useState([]);
  // Modal 開關
  const [orderCheckSwitch, setOrderCheckSwitch] = useState(false);

  // 後端訂單所需要資料物件
  const [OrderDetail, setOrderDetail] = useState({
    id: "",
    userId: "1",
    storeId: checkoutData.storeId,
    statusId: "1",
    paymentMethod: checkoutData.paymentMethod,
    orderTime: "",
    order_number: "",
  });

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
      // 取資料庫最大訂單 +1 等於現在要寫入的訂單 id
      setOrderDetail({ ...OrderDetail, id: orderMaxIdResponse.data + 1 });
    };
    getcheckProductsData();
  }, []);

  return (
    <div>
      <div className="container-fluid checkout-top-title">確認結帳</div>
      <div className="container">
        <div className="col-9  mx-auto checkout-data  ">
          <table className="table checkout-data-table able-dark table-borderless table align-middle table-sm">
            <thead className="checkout-title ">
              <tr className="">
                <th scope="col ">
                  <div className="d-flex  align-items-center checkout-title-text">
                    <FaStore className="checkout-title-icon" />
                    <div>
                      <div className="checkout-title-storename ">
                        {checkoutData.storeName}
                      </div>
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
              {/* // -------- 商品區塊 -------- */}
              <OrderProducts checkProductsData={checkProductsData} />

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
              {/* -------- 付款方式及結帳區塊 --------*/}
              <OrderPaymentMethod
                checkProductsData={checkProductsData}
                setOrderDetail={setOrderDetail}
                OrderDetail={OrderDetail}
                checkoutData={checkoutData}
                setOrderCheckSwitch={setOrderCheckSwitch}
              />
            </tbody>
          </table>
        </div>
      </div>
      {/* -------- 光箱區塊 -------- */}
      {orderCheckSwitch && (
        <OrderModal
          timeInsecond={timeInsecond}
          orderNumber={orderNumber}
          OrderDetail={OrderDetail}
        />
      )}
    </div>
  );
};

export default Checkout;
