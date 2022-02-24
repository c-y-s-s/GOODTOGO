import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ImFacebook2 } from "react-icons/im";

import axios from "axios";
import { API_URL } from "../../../utils/config";
import { ERR_MSG } from "../../../utils/error";

const Register = () => {
  const [user, setUser] = useState({
    email: "song@test.com",
    password: "song12345",
    confirmPassword: "song12345",
    name: "song",
    phone: "0911122233",
  });

  // -------- checkbox 同意條款 --------
  const [agree, setAgree] = useState(true);
  // -------- 處理表格改變 --------
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  // -------- 表單送出 --------
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let response = await axios.post(`${API_URL}/auth/register`, user);
      console.log(response.data);
    } catch (e) {
      // console.error("錯誤:", e.response.data);
      console.error(ERR_MSG[e.response.data].code);
    }
  };

  return (
    <>
      <div className="reg-con">
        <div className="container-fluid m-auto">
          <div className="col-lg-5 col-md-8 m-auto col-12 m-0 p-0">
            <div className="content text-center row justify-content-center gy-0 gx-0 shadow">
              <div className="col-lg-10 col-10 d-flex flex-column pt-5 pb-4">
                <div className="h4 text-dark-grey">會員註冊</div>
                {/* -------- 表格開始 -------- */}
                <div className="label-group d-flex text-start flex-column justify-content-evenly">
                  <form className="d-flex flex-column" onSubmit={handleSubmit}>
                    {/* -------- 姓名 -------- */}
                    <label
                      htmlFor=""
                      className="col-form-label input-label-title text-green p-0"
                    >
                      姓名
                    </label>
                    <div class="form-floating mb-3">
                      <input
                        name="name"
                        type="text"
                        className="form-control custom-input "
                        id="name"
                        placeholder="name"
                        value={user.name}
                        onChange={handleChange}
                      />
                      <label
                        htmlFor="name"
                        className="floating-label text-grey"
                      >
                        請填入中文 / 英文姓名
                      </label>
                    </div>
                    {/* -------- 電子郵件 -------- */}
                    <label
                      htmlFor=""
                      className="col-form-label input-label-title text-green p-0"
                    >
                      電子郵件
                    </label>
                    <div class="form-floating mb-3">
                      <input
                        name="email"
                        value={user.email}
                        type="email"
                        className="form-control custom-input"
                        id="email"
                        placeholder="email"
                        onChange={handleChange}
                      />
                      <label
                        htmlFor="email"
                        className="floating-label  text-grey"
                      >
                        請填入電子信箱
                      </label>
                    </div>
                    {/* -------- 密碼 -------- */}
                    <label
                      for=""
                      className="col-form-label input-label-title  text-green p-0"
                    >
                      密碼
                    </label>
                    <div class="form-floating mb-3">
                      <input
                        name="password"
                        type="password"
                        className="form-control custom-input"
                        id="password"
                        placeholder="密碼"
                        value={user.password}
                        onChange={handleChange}
                      />
                      <label
                        htmlFor="password"
                        className="floating-label text-grey"
                      >
                        請填入密碼
                      </label>
                    </div>
                    {/* -------- 密碼確認 -------- */}
                    <label
                      htmlFor=""
                      className="col-form-label input-label-title text-green p-0"
                    >
                      密碼確認
                    </label>
                    <div class="form-floating mb-3">
                      <input
                        name="confirmPassword"
                        type="password"
                        className="form-control custom-input"
                        id="confirm-password"
                        placeholder=""
                        value={user.confirmPassword}
                        onChange={handleChange}
                      />
                      <label
                        htmlFor="confirm-password"
                        className="floating-label text-grey"
                      >
                        請再次輸入密碼
                      </label>
                    </div>
                    {/* -------- 手機-------- */}
                    <label
                      htmlFor=""
                      className="col-form-label input-label-title  text-green p-0"
                    >
                      手機
                    </label>
                    <div class="form-floating mb-3">
                      <input
                        name="phone"
                        type="phone"
                        className="form-control custom-input"
                        id="floatingInput"
                        placeholder="name@example.com"
                        value={user.phone}
                        maxLength="10"
                        onChange={handleChange}
                      />
                      <label
                        htmlFor="floatingInput"
                        className="floating-label  text-grey"
                      >
                        09XXXXXXXX
                      </label>
                    </div>
                    {/* -------- 使用者同意條款 -------- */}
                    <div className="col-lg-12 align-items-center text-grey input-label-title text-center">
                      <input
                        type="checkbox"
                        checked={agree}
                        onChange={(e) => {
                          setAgree(e.target.checked);
                        }}
                      />
                      我已閱讀並同意
                      <Link to="" className="no-link text-yellow">
                        用戶權益和隱私條款
                      </Link>
                    </div>
                    {/* TODO:當同意條款為true時以下按鈕才生效 */}
                    <div className="btn-group flex-column mt-2">
                      <button
                        type="submit"
                        className="btn submit-btn col-lg-12 mb-2"
                        disabled={!agree}
                      >
                        註冊
                      </button>
                      {/* -------- 表格結束 -------- */}
                      <div className="d-flex align-items-center justify-content-between mb-2">
                        <hr className="col-lg-5" />或<hr className="col-lg-5" />
                      </div>

                      {/* -------- Facebook 登入 -------- */}

                      <button className="btn btn-fb-login col-lg-12 d-flex align-items-center text-center justify-content-between mb-2">
                        <ImFacebook2 className="fb-icon col-lg-2 " />
                        使用 Facebook 註冊
                        <div className="col-lg-2"> </div>
                      </button>
                    </div>
                  </form>
                  <p className=" input-label-title text-grey text-center m-0 mb-3">
                    註冊過了嗎？
                    <Link to="/auth/login" className="no-link">
                      <span className=" text-yellow ">立即登入</span>
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
