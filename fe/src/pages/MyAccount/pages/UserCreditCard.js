import React, { useState } from "react";
import axios from "axios";
import { API_URL } from "../../../utils/config";
import { ERR_MSG } from "../../../utils/error";

const UserCreditCard = () => {
  const [card, setCard] = useState();

  return (
    <>
      <div className="col-md-9 col-lg-10 ps-lg-5 mt-3 mt-md-0">
        <div className="page_Title d-flex justify-content-center justify-content-md-start">
          信用卡資訊
        </div>
        <hr></hr>
        {/* -------- 更改密碼 表單開始 -------- */}
        <form>
          <div className="row mt-4">
            {/* -------- 表單左 -------- */}
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
                  // onClick={handleSubmit}
                >
                  更&emsp;改
                </button>
              </div>
            </div>
            <div className="credit_bg">
                1234444444
            </div>
          </div>
        </form>
        {/* -------- 會員資料表單結束 -------- */}
      </div>
    </>
  );
};

export default UserCreditCard;
