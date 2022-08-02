import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../../utils/config";
import { ERR_MSG } from "../../../utils/error";
import { FiX } from "react-icons/fi";
import "react-credit-cards/lib/styles.scss";
import CreditCard from "../components/creditCard";

const UserCreditCard = (props) => {
  // 信用卡後四碼
  const [creditNum, setCreditNum] = useState("");
  // 開關 信用卡燈箱
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

  // -------- 使用者信用卡資料 --------
  useEffect(() => {
    // http://localhost:3002/api/member/payment (router.get)
    let getCreditNum = async () => {
      let response = await axios.get(`${API_URL}/member/payment`, {
        withCredentials: true,
      });
      // console.log(
      //   "api/member/payment(get) response.data.credit_number: ",
      //   response.data.credit_number
      // );
      setCreditNum(response.data.credit_number);
    };
    getCreditNum();
  }, []);

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
                {creditNum ? (
                  <>＊＊＊＊&emsp;＊＊＊＊&emsp;＊＊＊＊&emsp;</>
                ) : (
                  <>尚無信用卡資料</>
                )}
              </div>
              {creditNum ? (
                <div className="fz-x-lg credit_Num me-sm-5 ms-2">
                  {creditNum}
                </div>
              ) : (
                <></>
              )}
            </div>
            <div className="d-flex mx-auto mx-lg-0 my-4 my-lg-0">
              <button
                className="btn text-white btn_Credit ms-lg-5"
                onClick={handleOpen}
              >
                {creditNum ? <>更&emsp;改</> : <>新&emsp;增</>}
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
              {/* <div className="d-flex justify-content-center"> */}
              <span className="my-4 pt-3 ls-md d-block text-center">
                信用卡資訊更新
              </span>
              {/* react-credit-cards */}
              <div className="mx-4 mx-sm-5">
                <CreditCard
                  setCreditNum={setCreditNum}
                  // setisModalTouch={props.setisModalTouch}
                  // setOpenCreditHeight={props.setOpenCreditHeight}
                  // setOpenCredit={setOpenCredit}
                  // 可直接傳遞 handleClose 函式
                  handleClose={handleClose}
                  
                />
              </div>
              {/* </div> */}
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
