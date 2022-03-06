import React, { useState } from "react";
import axios from "axios";
import { FiEye, FiEyeOff } from "react-icons/fi";

// import LoginForm from "./LoginForm"; 曾經的分離表單
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/auth";
import "../Storecheck.scss"
import Reset from "./StoreReset";
import { API_URL } from "../../../utils/config";
import { ERR_MSG } from "../../../utils/error";

const StoreLogin = (props) => {
  // 存下登入資訊給全站使用
  const { loginSeller, setLoginSeller } = useAuth();

const [loginStore, setLoginStore] = useState({
  email:"seller01",
  password:"pwd"
});

   const [fieldErrors, setFieldErrors] = useState({
    email: "",
    password: ""
  });
const [eye, setEye] = useState({
  passwordEye:false
});
function passwordShow() {
  setEye(
    eye.passwordEye
      ? { ...eye, passwordEye: false }
      : { ...eye, passwordEye: true }
  );
}
  // -------- 處理input改變 --------
  const handleChange = (e) => {
    setLoginStore({ ...loginStore, [e.target.name]: e.target.value });
  };

   // -------- 當表單檢查有不合法的訊息時會呼叫 --------
  const handleFormInvalid = (e) => {
    // 阻擋form的預設送出行為(錯誤泡泡訊息)
    e.preventDefault();

    let name = e.target.name;
    //email欄位錯誤
    if (name === "email") {
      const updatedFieldErrors = {
        ...fieldErrors,
        email: "email格式輸入錯誤",
      };
      setFieldErrors(updatedFieldErrors);
    }
      //密碼欄位錯誤
    //  else if (name === "password") {
    //   const updatedFieldErrors = {
    //     ...fieldErrors,
    //     password: "密碼至少為6個字元",
    //   };
    //   setFieldErrors(updatedFieldErrors);
    // }
  };
  // -------- 當整個表單有更動時會觸發 --------
  // 認定使用者輸入某個欄位(更正某個有錯誤的欄位)
  const handleFormChange = (e) => {
    // 清空某個欄位錯誤訊息
    const updatedFieldErrors = {
      ...fieldErrors,
      [e.target.name]: "",
    };
    // 設定回錯誤訊息狀態
    setFieldErrors(updatedFieldErrors);
  };
  let navigate = useNavigate();
  // -------- 表單提交 --------
  const handleSubmit = async (e) => {
    e.preventDefault();
    //比對資料庫是否有此會員
    try {
      let response = await axios.post(`${API_URL}/storeLogin`, loginStore,
      {withCredentials: true});
      console.log("登入成功", response.data);
      // console.log("前端登入成功");
      setLoginSeller(response.data.data);
      navigate("/store");
    } catch (e) {
      // console.error("錯誤:", e.response.data);
      console.error("測試登入", ERR_MSG);
    }
  };


  return (
    <>
      <div className="container-fluid storelogin-con">
        <div className="row">
          <div className="col-lg-4 m-0 p-0"></div>
          <div className="col-lg-4 m-0 p-0">
            <div className="content text-center row justify-content-between gy-0">
              <div className="col-lg-1"></div>
              <div className="col-lg-10 row mt-4 mb-4 flex-column justify-content-evenly align-items-center">
              
      <div className="h6 ">商家登入</div>
      {/* -------- 表格開始 -------- */}
      <div className="label-group d-flex flex-column">
        <form
          className="d-flex flex-column needs-validation"
          onSubmit={handleSubmit}
          onChange={handleFormChange}
          onInvalid={handleFormInvalid}
        >
          {/* email */}
          <label
            for=""
            className="col-form-label input-label-title text-green p-0 text-start"
          >
            電子郵件
          </label>
          <div class="form-floating">
            <input
              name="email"
              type="email"
              className={`form-control custom-input
                        ${fieldErrors.email !== "" && "input-error"}`}
              id="floatingInput"
              placeholder="帳號"
              value={loginStore.email}
              onChange={handleChange}
              required
            />
            <label for="floatingInput" className="floating-label text-grey ">
              請填入電子信箱
            </label>
          </div>
          {fieldErrors.email !== "" && (
            <div className="error text-end">{fieldErrors.email}</div>
          )}
          {/* password */}
          <label
            for=""
            className="col-form-label input-label-title  text-green text-start p-0 mt-2"
          >
            密碼
          </label>
          <div class="form-floating">
            <input
              name="password"
              type={eye.passwordEye ? "text" : "password"}
              className="form-control custom-input"
              id="floatingInput"
              placeholder="密碼"
              value={loginStore.password}
              onChange={handleChange}
              minLength="3"
              required
            />
            <div onClick={passwordShow}>
            {eye.passwordEye ? (
            <FiEye className="eye" />
            ) : (
            <FiEyeOff className="eye" />
            )}
            </div>
            <label for="floatingInput" className="floating-label text-grey">
              請填入密碼
            </label>
          </div>
          {fieldErrors.password !== "" && (
            <div className="error text-end mb-3">{fieldErrors.password}</div>
          )}

          <button
            type="submit"
            className="btn submit-btn text-light mb-4 mt-3 col-lg-12"
          >
            登入
          </button>
        </form>
        {/* -------- 表格結束 -------- */}
      </div>
      <div className="row align-self-center">
      <Link to="/StoreReset" className="no-link">
        <p className="text-grey no-link m-0 mt-3">忘記密碼？</p>
      </Link>
</div>
      <hr className="col-lg-12 mt-3" />

      <p className="text-grey  m-0">
        尚未加入GOODTOGO？
        <Link to="/StoreCheck" className="no-link">
          <span className="text-yellow  ">立即註冊</span>
        </Link>
      </p>
                {/* <Reset /> */}
              </div>
              <div className="col-lg-1"></div>
            </div>
          </div>
          <div className="col-lg-4 m-0 p-0"></div>
        </div>
      </div>
    </>
  );
};
export default StoreLogin