import React, { useState } from "react";
import axios from "axios";
import { API_URL } from "../../../utils/config";
import { ERR_MSG } from "../../../utils/error";
import { FiEye, FiEyeOff } from "react-icons/fi";

const UserCreditCard = () => {
  const [card, setCard] = useState();

  // -------- 修改會員密碼 進資料庫 --------
  // 發 http request 到後端 -> axios
  // async function handleSubmit(e) {
  //   e.preventDefault();

  //   try {
  //     // http://localhost:3002/api/member/payment (router.post)
  //     let response = await axios.post(`${API_URL}/member/payment`, payment);
  //     console.log("會員有更改信用卡: ", response.data);
  //   } catch (e) {
  //     console.error("會員更改信用卡 error: ", ERR_MSG[e.response.data.code]);
  //     console.error("res.error:", e.response.data);
  //   }

  // }

  return (
    <>
      <div className="col-md-9 col-lg-10 ps-lg-5 mt-3 mt-md-0">
        <div className="page_Title d-flex justify-content-center justify-content-md-start">
          信用卡資訊
        </div>
        <hr></hr>
        {/* -------- 更改密碼 表單開始 -------- */}
        <form>

          
          
        </form>
        {/* -------- 會員資料表單結束 -------- */}
      </div>
    </>
  );
};

export default UserCreditCard;
