import React, { useState } from "react";
import axios from "axios";
import { API_URL } from "../../../utils/config";
import { ERR_MSG } from "../../../utils/error";
import { FiX } from "react-icons/fi";
// react-credit-cards
// import Cards from "react-credit-cards";
import "react-credit-cards/lib/styles.scss";
// import {
//   formatCreditCardNumber,
//   formatCVC,
//   formatExpirationDate,
//   formatFormData,
// } from "./CreditCardUtils.js";
import CreditCard from "../components/creditCard";

const UserCreditCard = (props) => {
  // 開關 信用卡
  const [openCredit, setOpenCredit] = useState(false);

  function handleOpen() {
    props.setisModalTouch(false); // Navbar 關
    props.setOpenCreditHeight(true); // index.js 填充 Navbar 高度 開
    setOpenCredit(true); // 更改信用卡介面 開
  }
  function handleClose() {
    props.setisModalTouch(true);
    props.setOpenCreditHeight(false);
    setOpenCredit(false);
  }

  // react-credit-cards
  // const [creditData, setCreditData] = useState({
  //   number: "",
  //   name: "",
  //   expiry: "",
  //   cvc: "",
  //   issuer: "",
  //   focused: "",
  // });

  // const handleCallback = (e, isValid) => {
  //   console.log("handleCallback", e);
  //   if (isValid) {
  //     setCreditData({ ...creditData, [e.target.name]: e.target.value });
  //   }
  // };

  // const handleInputFocus = (e) => {
  //   console.log("handleInputFocus", e.target.name);
  //   setCreditData({ ...creditData, [e.target.name]: e.target.name });
  // };

  // const handleInputChange = (e) => {
  //   console.log("handleInputChange", e.target);
  //   if (e.target.name === "number") {
  //     e.target.value = formatCreditCardNumber(e.target.value);
  //   } else if (e.target.name === "expiry") {
  //     e.target.value = formatExpirationDate(e.target.value);
  //   } else if (e.target.name === "cvc") {
  //     e.target.value = formatCVC(e.target.value);
  //   }
  //   setCreditData({ ...creditData, [e.target.name]: e.target.value });
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log("handleSubmit", creditData);
  //   console.log("提交");
  // };

  return (
    <>
      <div className="col-md-9 col-lg-10 ps-lg-5 mt-3 mt-md-0">
        <div className="page_Title d-flex justify-content-center justify-content-md-start">
          信用卡資訊
        </div>
        <hr></hr>
        {/* -------- 信用卡資訊 -------- */}
        <div className="row mt-4 position-relative">
          <div className="col my-4 d-flex align-items-center text-nowrap flex-wrap flex-column flex-sm-row">
            <div className="col-sm-3 col-lg-3 col-xl-2 me-xl-2 credit_Text">
              信用卡號碼
            </div>
            <div className="d-flex align-items-center text-nowrap my-4 my-sm-0">
              <div className="fz-sm ls-lg">
                ＊＊＊＊&emsp;＊＊＊＊&emsp;＊＊＊＊&emsp;
              </div>
              <div className="fz-x-lg credit_Num me-sm-5 ms-2">5678</div>
            </div>

            <div className="d-flex mx-auto mx-lg-0 my-4 my-lg-0">
              <button
                className="btn text-white btn_Credit ms-lg-5"
                onClick={handleOpen}
              >
                更&emsp;改
              </button>
            </div>
          </div>
        </div>
        {/* -------- 信用卡 燈箱 開始 -------- */}
        {openCredit && (
          <>
            <div className="credit_Box">
              <span className="credit_Close_Btn" onClick={handleClose}>
                <FiX className="credit_Close_Btn_X" />
              </span>
              <div className="d-flex justify-content-center">
                <span className="my-4 pt-3 ls-md">信用卡資訊修改</span>
                <CreditCard/>
                {/* ------- react-credit-card -------- */}
                {/* <div>
                  <div className="App-payment">
                    <Cards
                      number={creditData.number}
                      name={creditData.name}
                      expiry={creditData.expiry}
                      cvc={creditData.cvc}
                      focused={creditData.focused}
                      callback={handleCallback}
                    />
                    <form>
                      <div className="form-group">
                        <input
                          type="tel"
                          name="number"
                          className="form-control"
                          placeholder="Card Number"
                          pattern="[\d| ]{16,22}"
                          required
                          onChange={handleInputChange}
                          onFocus={handleInputFocus}
                        />
                        <small>E.g.: 49..., 51..., 36..., 37...</small>
                      </div>
                      <div className="form-group">
                        <input
                          type="text"
                          name="name"
                          className="form-control"
                          placeholder="Name"
                          required
                          onChange={handleInputChange}
                          onFocus={handleInputFocus}
                        />
                      </div>
                      <div className="row">
                        <div className="col-6">
                          <input
                            type="tel"
                            name="expiry"
                            className="form-control"
                            placeholder="Valid Thru"
                            pattern="\d\d/\d\d"
                            required
                            onChange={handleInputChange}
                            onFocus={handleInputFocus}
                          />
                        </div>
                        <div className="col-6">
                          <input
                            type="tel"
                            name="cvc"
                            className="form-control"
                            placeholder="CVC"
                            pattern="\d{3,4}"
                            required
                            onChange={handleInputChange}
                            onFocus={handleInputFocus}
                          />
                        </div>
                      </div>
                      <input
                        type="hidden"
                        name="issuer"
                        value={creditData.issuer}
                      />
                      <div className="form-actions">
                        <button
                          className="btn btn-primary btn-block"
                          onSubmit={handleSubmit}
                        >
                          PAY
                        </button>
                      </div>
                    </form>
                  </div>
                </div> */}
                {/* ------- react-credit-card -------- */}
              </div>
            </div>
            <div className="credit_Bg" onClick={handleClose}></div>
          </>
        )}
        {/* -------- 信用卡 燈箱 結束 -------- */}
      </div>
    </>
  );
};

export default UserCreditCard;
