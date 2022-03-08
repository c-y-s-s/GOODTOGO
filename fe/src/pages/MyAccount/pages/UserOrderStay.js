import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL, IMAGE_URL } from "../../../utils/config";
import { BsShop } from "react-icons/bs";
import { FiMessageCircle } from "react-icons/fi";
import { useParams } from "react-router";
import Swal from "sweetalert2";

const UserOrderStay = (props) => {
  const { status } = useParams();
  const [orderStay, setOrderStay] = useState([]);

  // index 傳過來 用於判斷是否有資料呈現 (執行api)
  let orderStayCount = props.orders.filter((v) => Object.values(v)[1] === 1);
  // console.log("OrderStay - props.orders", props.orders);
  // console.log("OrderStay - orderStayCount", orderStayCount);
  // console.log("OrderStay - orderStayCount.length", orderStayCount.length);

  // useEffect(()=>{
  //   console.log("iii",props.orders.filter((v) => Object.values(v)[1] === 1))
  // },[props.orders])

  // 載入 使用者收藏店家清單
  useEffect(() => {
    if (orderStayCount.length > 0) {
      // http://localhost:3002/api/member/order/status=1
      let getOrderStay = async () => {
        // console.log(status)
        let response = await axios.get(`${API_URL}/member/order/${status}`, {
          withCredentials: true, // 為了跨源存取 cookie // 登入狀態帶著 cookie 跟後端要資料
        });
        console.log(
          "api/member/order/status=1(get) response.data: ",
          response.data
        );
        setOrderStay(response.data);

        // 更新 待領取數量 顯示待領取 badge 數字用
        props.setStayNum(response.data.length);
      };
      getOrderStay();
    }
  }, []);

  // sweet alert
  const sweetAlert = Swal.mixin({
    customClass: {
      confirmButton: "btn confirmBtn mx-2 my-3",
      cancelButton: "btn cancelBtn mx-2 my-3",
    },
    buttonsStyling: false,
  });

  async function handleCancelOrder(cancelOrder) {
    // console.log("cancelOrder1: ", cancelOrder);
    cancelOrder = { cancelOrder };
    // console.log("cancelOrder2: ", cancelOrder);
    // cancelOrder = { cancelOrder: cancelOrder };

    try {
      // http://localhost:3002/api/member/order/cancel (router.post)
      let response = await axios.post(
        `${API_URL}/member/order/cancel`,
        cancelOrder,
        {
          withCredentials: true, // 為了跨源存取 cookie // 登入狀態帶著 cookie 跟後端要資料
        }
      );
      console.log("會員取消訂單 :", response.data);

      // 更新待領取訂單
      setOrderStay(
        [...orderStay].filter(
          (v) => Object.values(v)[0] !== Object.values(cancelOrder)[0]
        )
      );
      // 更新 待領取數量 顯示待領取 badge 數字用
      props.setStayNum(orderStay.length - 1);

      // 更新 props.orders (將待領取1 -> 取消3)
      // index 傳過來 用於判斷是否有資料可呈現 (執行api)
      // !!!!! 會更動到 props 要用複製的 [...XXX]
      // let data = props.orders;
      let data = [...props.orders];
      let findIndex = props.orders.findIndex(
        (v) => Object.values(v)[0] === cancelOrder.cancelOrder
      );
      // console.log("OrderStay - findIndex", findIndex);
      data[findIndex].status_id = 3;
      props.setOrders(data);
      // console.log("OrderStay - data",data)
      // orderStayCount.length -= 1;
      // console.log("orderStayCount.length -= 1", orderStayCount.length);
    } catch (e) {
      console.error("res.error:", e.response);
    }
  }

  return (
    <>
      {orderStayCount.length > 0 ? (
        orderStay.map((item) => {
          return (
            <div key={item.id} className="card order_List mb-3">
              <div className="d-flex flex-column-reverse flex-xl-row align-items-xl-center justify-content-xl-between text-nowrap">
                <div className="d-flex align-items-center justify-content-center justify-content-sm-start">
                  <div className="d-flex">
                    <BsShop className="store_Icon" />
                  </div>
                  <span className="ms-3 ls-md">{item.store_name}</span>
                  <div className="store_Category rounded-pill ms-4">
                    {item.store_category}
                  </div>
                </div>
                <div className="d-flex justify-content-lg-between align-items-center flex-column-reverse flex-sm-row order_Status_Info mb-4 mb-xl-0">
                  <div className="d-flex flex-grow-1">
                    <div
                      className={item.status === "待領取" ? "c-d-yellow" : ""}
                    >
                      訂單編號:
                    </div>
                    <span
                      className={
                        item.status === "待領取" ? "ms-2 c-d-yellow" : "ms-2"
                      }
                    >
                      {item.order_number}
                    </span>
                  </div>
                  <div className="c-l-grey d-none d-sm-block d-lg-none d-xl-block space">
                    |
                  </div>
                  <div className="d-flex align-items-center mb-3 mb-sm-0">
                    <div
                      className={
                        item.status === "待領取"
                          ? "c-d-yellow"
                          : item.status === "完成"
                          ? "c-green"
                          : "m-0"
                      }
                    >
                      {item.status}
                    </div>
                    {item.status === "待領取" ? (
                      <div
                        onClick={() => {
                          // alert(item.id);
                          sweetAlert
                            .fire({
                              title: "確定取消訂單?",
                              // text: "You won't be able to revert this!",
                              icon: "warning",
                              showCancelButton: true,
                              confirmButtonText: "確定取消訂單",
                              cancelButtonText: "不取消",
                              reverseButtons: true,
                            })
                            .then((result) => {
                              if (result.isConfirmed) {
                                handleCancelOrder(item.id);
                                sweetAlert.fire(
                                  "取消訂單成功!",
                                  "您的訂單已取消，可至 我的訂單 > 已取消 查看",
                                  "success"
                                );
                              } else if (
                                /* Read more about handling dismissals below */
                                result.dismiss === Swal.DismissReason.cancel
                              ) {
                                sweetAlert.fire(
                                  "不取消訂單",
                                  "返回 我的訂單 頁面",
                                  "error"
                                );
                              }
                            });
                        }}
                        className="order_Status_Button order_cancel"
                      >
                        取消訂單
                      </div>
                    ) : item.status === "完成" ? (
                      <div className="order_Status_Button order_finish d-flex align-items-center justify-content-between">
                        <span className="d-flex">
                          <FiMessageCircle className="comment_Icon me-1" />
                        </span>
                        <span>留言評價</span>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
              <hr className="my-4"></hr>
              {/* -------- 訂單細項 開始 -------- */}
              {item.details.map((detail) => {
                return (
                  <div key={detail.product_id}>
                    <div className="d-flex justify-content-between align-items-center ls-md text-nowrap">
                      <div className="order_Store_Img">
                        <img
                          src={IMAGE_URL + detail.img}
                          className="cover-fit_Member"
                          alt="storeImage"
                        />
                      </div>
                      <div className="flex-grow-1 ms-4">
                        <div className="py-1">{detail.product_name}</div>
                        <div className="py-1">$ {detail.price}</div>
                      </div>
                      <div className="d-flex align-self-end align-self-sm-center align-items-center justify-content-between order_Amount">
                        <div>x {detail.amount}</div>
                        <div>$ {detail.price * detail.amount}</div>
                      </div>
                    </div>
                    <hr className="my-4"></hr>
                  </div>
                );
              })}

              {/* -------- 訂單細項 結束 -------- */}
              <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center mt-1">
                <span className="flex-grow-1 fz-sm c-grey ls-md mb-2 mb-sm-0">
                  訂單時間: {item.order_time}
                </span>
                <div className="d-flex align-items-center">
                  <div className="me-2 fz-sm ls-md">訂單金額:</div>
                  <div className="ms-3 order_Amount_Total">
                    NT$ {item.totalAmount}
                  </div>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div className=" ls-md c-grey text-center pt-4">
          您尚未有 待領取 的訂單紀錄
        </div>
      )}
    </>
  );
};

export default UserOrderStay;
