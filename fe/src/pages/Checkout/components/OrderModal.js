import React from "react";
import { Link } from "react-router-dom";
import { BsCheck2Circle } from "react-icons/bs";
import { BsFillExclamationCircleFill } from "react-icons/bs";
const OrderModal = ({ timeInsecond, orderNumber, OrderDetail }) => {
  console.log(OrderDetail);
  return (
    <div>
      <div className="container-fluid mt-5 order-modal-bgcolor">
        <div className=" mx-auto order-modal">
          <div className="card order-modal-card">
            <div className="card-body  ">
              <div className="order-modal-card-top">
                <div className="order-modal-card-top-icon">
                  <BsCheck2Circle className="order-modal-card-top-icon-style" />
                </div>
                <div className="order-modal-card-top-text">
                  <div>訂購成功</div>
                  <div>謝謝您替地球盡的每份力量</div>
                </div>
              </div>

              <div className="order-modal-card-center-text">
                <div>訂單時間 : {timeInsecond}</div>
                <div>
                  訂單編號  {orderNumber + OrderDetail.id + OrderDetail.userId}
                </div>
              </div>

              <div className="order-modal-card-remind-text">
                <div>已傳送到您的電子信箱</div>
                <div>
                  取餐時請
                  <span style={{ color: `#668C4A` }}> 出示訂單編號</span> 取餐
                </div>
                <div>
                  或可至
                  <span
                    style={{
                      color: `#668C4A`,
                      paddingLeft: `0.2rem`,
                      paddingRight: `0.2rem`,
                    }}
                  >
                    我的訂單 &gt; 待領取
                  </span>
                  頁面查看訂單編號
                </div>
              </div>

              <div className="order-modal-card-warn">
                <div className="order-modal-card-warn-icon">
                  <BsFillExclamationCircleFill className="order-modal-card-warn-iconstyle" />
                </div>
                <div className="order-modal-card-warn-text">
                  <div>請於當日店家營業結束前取餐，</div>
                  <div> 逾時未取餐，帳號將停權一個月</div>
                </div>
              </div>
              <div className="order-modal-buttom">
                <Link to={`/stores`}>確定</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderModal;
