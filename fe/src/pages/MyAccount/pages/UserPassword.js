import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../../utils/config";
import { ERR_MSG } from "../../../utils/error";

const UserPassword = () => {
  const [password, setPassword] = useState({
    password: "",
    newPassword: "",
    confirmPassword: "",
  });

  // 錯誤訊息
  const [err, setErr] = useState({});
  // FIXME: 前後端錯誤訊息

  useEffect(() => {
    // http://localhost:3002/api/member/proile
    let getPassword = async () => {
      let response = await axios.get(`${API_URL}/member/profile`, {
        withCredentials: true, // 為了跨源存取 cookie // 登入狀態帶著 cookie 跟後端要資料
      });
      // response 是物件
      console.log("api/member/profile(get) response.data: ", response.data);
    };
    getPassword();
  }, []);

  // -------- 使用者修改資料 --------
  function handleChange(e) {
    setPassword({ ...password, [e.target.name]: e.target.value });
  }

  // -------- 修改會員密碼 進資料庫 --------
  // 發 http request 到後端 -> axios
  async function handleSubmit(e) {
    e.preventDefault();

    // TODO: 利用 refs 驗證欄位?

    try {
      // http://localhost:3002/api/member/password (router.post)
      let response = await axios.post(`${API_URL}/member/password`, password);
      console.log("使用者有更改密碼: ", response.data);
    } catch (e) {
      // TODO: 不同錯誤訊息另外包state存，先判斷進來的是什麼號碼=某種錯誤，去客製化
      console.error("會員更改密碼 error: ", ERR_MSG[e.response.data.code]);
      console.error("res.error:", e.response.data);
      setErr(e.response.data.msg);
    }
  }

  return (
    <>
      <div className="col-md-9 col-lg-10 ps-lg-5 mt-3 mt-md-0">
        <div className="page_Title d-flex justify-content-center justify-content-md-start">
          更改密碼
        </div>
        <hr></hr>
        {/* -------- 更改密碼 表單開始 -------- */}
        <form>
          <div className="row mt-4">
            {/* -------- 表單左 -------- */}
            <div className="col-lg-8 form_Text pe-4 order-2 order-lg-1">
              <div className="my-4">
                <div className="d-flex align-items-center text-nowrap">
                  <label
                    htmlFor="password"
                    className="col-4 col-sm-3 col-lg-3 col-xl-2 me-sm-3 me-lg-4"
                  >
                    現在的密碼
                  </label>
                  <input
                    id="password"
                    type="password"
                    name="password"
                    className="form-control form_Input"
                    value="sss"
                    onChange={handleChange}
                  />
                </div>
                <div className="error text-danger text-end">
                  {err.name ? err.name.msg : ""}
                </div>
              </div>

              <div className="my-4">
                <div className="d-flex align-items-center text-nowrap">
                  <label
                    htmlFor="newPassword"
                    className="col-3 col-sm-2 col-lg-3 col-xl-2 me-sm-3"
                  >
                    新的密碼
                  </label>
                  <input
                    id="newPassword"
                    type="password"
                    name="newPassword"
                    className="form-control form_Input"
                    value="sss"
                    onChange={handleChange}
                  />
                </div>
                <div className="error text-danger text-end">
                  {err.email ? err.email.msg : ""}
                </div>
              </div>
              <div className="my-4">
                <div className="d-flex align-items-center text-nowrap">
                  <label
                    htmlFor="confirmPassword"
                    className="col-3 col-sm-2 col-lg-3 col-xl-2 me-sm-3"
                  >
                    確認新密碼
                  </label>
                  <input
                    id="confirmPassword"
                    type="password"
                    name="confirmPassword"
                    className="form-control form_Input"
                    value="sss"
                    onChange={handleChange}
                  />
                </div>
                <div className="error text-danger text-end"></div>
              </div>

              <div className="d-flex align-items-center text-nowrap">
                <div className="col-3 col-sm-2 col-lg-3 col-xl-2 me-sm-3"></div>
                <div className="d-flex justify-content-start justify-content-sm-center w-100">
                  <button
                    type="submit"
                    className="btn text-white btn_Submit"
                    onClick={handleSubmit}
                  >
                    儲&emsp;存
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
        {/* -------- 會員資料表單結束 -------- */}
      </div>
    </>
  );
};

export default UserPassword;
