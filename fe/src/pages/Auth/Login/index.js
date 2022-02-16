import React, { useState } from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import { ImFacebook2 } from "react-icons/im";

import axios from "axios";
import { API_URL } from "../../../utils/config";
import { ERR_MSG } from "../../../utils/error";

const Login = ({ auth }) => {
  const [loginUser, setLoginUser] = useState({
    email: "song@test.com",
    password: "song12345",
  });
  const [isLogin, setIsLogin] = useState(false);
  // -------- 處理input改變 --------
  const handleChange = (e) => {
    setLoginUser({ ...loginUser, [e.target.name]: e.target.value });
  };
  // -------- submit --------
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let response = await axios.post(`${API_URL}/auth/login`, loginUser, {
        withCredentials: true,
      });
      setIsLogin(true);
      console.log(response.data);
    } catch (e) {
      // console.error("錯誤:", e.response.data);
      console.error("測試登入", ERR_MSG[e.response.data].code);
    }
  };
  if (auth) {
    // 轉頁效果
    return <Navigate to="/" />;
  }
  return (
    <div className="container-fluid login-con">
      <div className="row">
        <div className="col-lg-4 m-0 p-0"></div>
        <div className="col-lg-4 m-0 p-0">
          <div className="content text-center row justify-content-between gy-0">
            <div className="col-lg-2"></div>
            <div className="col-lg-8 row pt-5 pb-4 flex-column justify-content-evenly align-items-center fix-height">
              <>
                <div className="h4 text-dark-grey">會員登入</div>
                {/* -------- 表格開始 -------- */}

                <form
                  className="needs-validation justify-content-start"
                  onSubmit={handleSubmit}
                  // onInvalid={onInvalid}
                  novalidate
                >
                  <div className="label-group d-flex flex-column ">
                    {/* email */}
                    <div className="text-start mt-3 mb-4">
                      <label
                        for=""
                        className="input-label-title text-green p-0 text-start"
                      >
                        電子郵件
                      </label>
                      <div class="form-floating">
                        <input
                          name="email"
                          type="text"
                          className="form-control"
                          id="floatingInput"
                          placeholder="帳號"
                          value={loginUser.email}
                          onChange={handleChange}
                          required
                        />
                        <label
                          for="floatingInput"
                          className="floating-label text-grey "
                        >
                          請填入電子信箱
                        </label>
                      </div>
                    </div>

                    {/* password */}
                    <div className=" text-start mt-2 mb-4">
                      <label
                        for=""
                        className=" input-label-title  text-green text-start p-0"
                      >
                        密碼
                      </label>
                      <div class="form-floating">
                        <input
                          name="password"
                          type="password"
                          className="form-control"
                          id="floatingInput"
                          placeholder="密碼"
                          value={loginUser.password}
                          onChange={handleChange}
                          // minLength="3"
                          required
                        />

                        <label
                          for="floatingInput"
                          className="floating-label text-grey"
                        >
                          請填入密碼
                        </label>
                      </div>
                    </div>

                    {/* {fieldErrors.password !== "" && (
            <div className="error text-end mb-3">{fieldErrors.password}</div>
          )} */}
                  </div>
                  <div className="btn-group d-grid gap-3">
                    <button
                      type="submit"
                      className="btn submit-btn text-light col-lg-12"
                    >
                      登入
                    </button>
                    <button className="btn btn-fb-login col-lg-12 d-flex align-items-center text-center justify-content-between">
                      <ImFacebook2 className="fb-icon col-lg-2 " />
                      使用 Facebook 登入
                      <div className="col-lg-2"> </div>
                    </button>
                  </div>

                  {/* -------- 表格結束 -------- */}
                </form>
                <Link to="/auth/reset" className="no-link">
                  <p className="text-grey no-link m-0 mt-3">忘記密碼？</p>
                </Link>

                <hr className="col-lg-12 mt-3" />

                <p className="text-grey  m-0">
                  尚未加入GOODTOGO？
                  <Link to="/auth/register" className="no-link">
                    <span className="text-yellow">立即註冊</span>
                  </Link>
                </p>
              </>
            </div>
            <div className="col-lg-2"></div>
          </div>
        </div>
        <div className="col-lg-4 m-0 p-0"></div>
      </div>
    </div>
  );
};

export default Login;
