import React from "react";
import { BiStoreAlt } from "react-icons/bi";

const Tables = () => {
  return (
    <div>
      <div className="border my-5 px-4">
        <div className="row">
          <div className="col my-3">
            <BiStoreAlt className="mb-1 me-1" />
            鵝媽媽總店
            <div className="d-inline rounded-pill checkoutphone-product-category px-1 ms-3 ">
              麵食
            </div>
          </div>
        </div>
        <div className="row border-top py-3">
          <div className="col-4">
            <img
              src={require(`../images/testimage.png`)}
              alt="..."
              className="checkoutphone-product-image me-3"
            />
          </div>
          <div className="col">
            <div className="row">
              <div className="col-5 text-start">鴨肉蓋飯</div>
              <div className="col text-start ps-1">$ 60</div>
            </div>
            <div>
              <div className="text-start">數量：2</div>
            </div>
            <div>
              <div className="text-start">小計：$120</div>
            </div>
          </div>
        </div>
        <div className="border-top row pt-3 pb-1">
          <div className="col-4 pe-1">使用優惠劵：</div>
          <div className="col-3">
            <div className="border border-warning text-center px-1">-$ 60</div>
          </div>
        </div>
        <div className="row pt-1 pb-3">
          <div className="col-4 pe-1">付款金額：</div>
          <div className="col">
            <div className="align-middle fs-5 text-warning fw-bold">
              NT$ 240
            </div>
          </div>
        </div>
        {/* -------- 信用卡付款 開始 -------- */}
        {/* <div className="border-top pt-1 pb-3">
          <div className="d-flex justify-content-center mt-3">
            <button
              type="button"
              className="btn checkoutphone-credit-card px-3"
            >
              信 用 卡 付 款
            </button>
          </div>
          <div className="d-flex justify-content-center mt-2">
            <img src={require(`../images/visa.png`)} alt="..." />
          </div>
          <div className="d-flex justify-content-center">
            <div className="d-inline me-3">****</div>
            <div className="d-inline me-3">****</div>
            <div className="d-inline me-3">****</div>
            <div className="d-inline me-3">****</div>
          </div>
          <div className="d-flex justify-content-center">
            <button
              type="button"
              className="btn text-light px-5 mt-2 checkoutphone-complete-checkout"
            >
              完 成 結 帳
            </button>
          </div>
        </div> */}
        {/* -------- 信用卡付款 結束 -------- */}

        {/* 現場取貨 開始 */}
        <div className="border-top pt-1 pb-3">
          <div className="d-flex justify-content-center mt-3">
            <button
              type="button"
              className="btn checkoutphone-credit-card px-3"
            >
              信 用 卡 付 款
            </button>
          </div>
          <div className="d-flex justify-content-center">
            <button
              type="button"
              className="btn text-light px-5 mt-3 checkoutphone-complete-checkout"
            >
              完 成 結 帳
            </button>
          </div>
        </div>
        {/* 現場取貨 結束 */}
        {/* -------- 訂購成功 測試按鈕 開始 -------- */}
          <button
            type="button"
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#successfullyOrdered"
          >
            訂購成功 測試按鈕
          </button>
          <div
            className="modal fade"
            id="successfullyOrdered"
            // tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered checkoutphone-modal-sm">
              <div className="modal-content position-relative">
                <div className="modal-header border-bottom mx-5">
                  <img
                    src={require(`../images/check.png`)}
                    alt="..."
                    className="checkoutphone-check-img"
                  />
                  <div className="checkoutphone-text-colors-g">
                    <h5>訂購成功</h5>
                    <h6>謝謝您替地球盡的每份力量</h6>
                  </div>
                  <button
                    type="button"
                    className="btn-close checkoutphone-closeBtn rounded-circle"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body row">
                  <div className="d-flex justify-content-center mb-1 checkoutphone-text-size checkoutphone-text-colors-g">
                    訂單時間: 2022-02-11 12:22:33
                  </div>
                  <div className="d-flex justify-content-center checkoutphone-text-size my-2 ">
                    <button className="checkoutphone-order-bt border-0 px-5">
                      訂單編號: XXXXXXX
                    </button>
                  </div>
                  <div className="d-flex justify-content-center mb-1 checkoutphone-text-size">
                    已傳送到您的電子信箱
                  </div>
                  <div className="d-flex justify-content-center mb-1 checkoutphone-text-size">
                    取餐時請
                    <span className="checkoutphone-text-colors-g">
                      &nbsp;出示訂單編號 &nbsp;
                    </span>
                    取餐
                  </div>
                  <div className="d-flex justify-content-center mb-1 checkoutphone-text-size">
                    或可至
                    <span className="checkoutphone-text-colors-g ">
                      &nbsp;我的訂單 {">"} 待領取 &nbsp;
                    </span>
                    頁面查看訂單編號
                  </div>
                </div>
                <div className="modal-footer border-top mx-3">
                  <div className="checkoutphone-text-size mx-4">
                    <div>
                      <img
                        src={require(`../images/subtract.png`)}
                        alt="..."
                        className="ms-3 pt-2 me-3 float-start"
                      />
                    </div>
                    <div className="checkoutphone-text-colors-dy">
                      請於當日店家營業結束前取餐， 逾時未取餐，帳號將停權一個月
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* -------- 訂購成功 測試按鈕 結束 -------- */}
      </div>
    </div>
  );
};

export default Tables;
