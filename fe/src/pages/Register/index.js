<<<<<<< HEAD
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ImFacebook2 } from "react-icons/im";
import { ReactComponent as Logo } from "../../images/logo-face.svg";
import axios from "axios";
import { API_URL } from "../../utils/config";
import { ERR_MSG } from "../../utils/error";

const Register = () => {
  const [member, setMember] = useState({
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
    setMember({ ...member, [e.target.name]: e.target.value });
  };
  // -------- 表單送出 --------
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let response = await axios.post(`${API_URL}/auth/register`, member);
      console.log(response.data);
    } catch (e) {
      // console.error("錯誤:", e.response.data);
      console.error(ERR_MSG[e.response.data].code);
    }
  };

  return (
    <>
      <div className="container-fluid reg-con">
        <div className="row">
          <div className="col-lg-6 m-0 p-0">
            <Logo className="" />
          </div>
          <div className="col-lg-5 m-0 p-0">
            <div className="content text-center row justify-content-between gy-0">
              <div className="col-lg-1  m-0 p-0"></div>
              <div className="col-lg-10 mt-3 mb-3 p-0 ">
                <div className="col-lg-12 row m-0 p-0 gy-3 flex-column ">
                  <div className="h6 ">會員註冊</div>
                  {/* -------- 表格開始 -------- */}
                  <div className="label-group d-flex text-start flex-column justify-content-evenly gy-2">
                    <form
                      className="d-flex flex-column"
                      onSubmit={handleSubmit}
                    >
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
                          value={member.name}
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
                          value={member.email}
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
                          value={member.password}
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
                          value={member.confirmPassword}
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
                          value={member.phone}
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
                      <div className="col-lg-12 align-items-center text-grey input-label-title ">
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
                        {/* -------- 縣市 -------- */}
                        {/* <div class="col-lg-6">
                          <select
                            className="form-select custom-input"
                            aria-label="Default select example"
                          >
                            <option selected className="">
                              請選擇縣市
                            </option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                          </select>
                        </div> */}
                        {/* -------- 區域 -------- */}
                        {/* <div class=" col-lg-6">
                          <select
                            className="form-select custom-input"
                            aria-label="Floating label select example"
                          >
                            <option selected>請選擇區域 </option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                          </select>
                        </div> */}
                      </div>
                      {/* TODO:當同意條款為true時以下按鈕才生效 */}
                      <button
                        type="submit"
                        className="btn btn-register col-lg-12 mb-2"
                        disabled={!agree}
                      >
                        註冊
                      </button>
                    </form>
                    {/* -------- 表格結束 -------- */}
                    <div className="d-flex align-items-center justify-content-between mb-2">
                      <hr className="col-lg-5" />或<hr className="col-lg-5" />
                    </div>
                    {/* -------- Facebook 登入 -------- */}
                    <button
                      className="col-lg-12 btn-fb-login btn d-flex align-items-center text-center justify-content-center m-0 mb-3"
                      disabled={!agree}
                    >
                      <ImFacebook2 className="big-icon col-lg-2" />
                      使用 Facebook 註冊<div className="col-lg-2"> </div>
                    </button>

                    <p className=" input-label-title text-grey text-center m-0 mb-3">
                      註冊過了嗎？
                      <Link to="/login" className="no-link">
                        <span className=" text-yellow ">立即登入</span>
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-1"></div>
            </div>

            <div className="col-lg-1"></div>
          </div>
        </div>
        <div className="col-lg-1 m-0 p-0"></div>
=======
import React from "react";
import { Link } from "react-router-dom";
import { ImFacebook2 } from "react-icons/im";

const Register = () => {
  return (
    <>
      <div className="container-fluid reg-con">
        <div className="row">
          <div className="col-lg-1 m-0 p-0"></div>
          <div className="col-lg-5 m-0 p-0"></div>
          <div className="col-lg-5 m-0 p-0">
            <div className="content text-center row justify-content-between gy-0">
              <div className="col-lg-1  m-0 p-0"></div>
              <div className="col-lg-10 row m-0 p-0 justify-content-between">
                <div className="col-lg-1"></div>
                <div className="col-lg-8 m-0 p-0">
                  {/* -------- 表格開始 -------- */}
                  <form>
                    <div className="label-group">
                      {/* -------- 姓名 -------- */}
                      <label for="" className="col-form-label label-title p-0">
                        姓名
                      </label>
                      <div class="form-floating mb-3">
                        <input
                          type="text"
                          className="form-control custom-input"
                          id="floatingInput"
                          placeholder="name@example.com"
                        />
                        <label for="floatingInput" className="floating-label">
                          請填入中文 / 英文姓名
                        </label>
                      </div>
                      {/* -------- 電子郵件 -------- */}
                      <label for="" className="col-form-label label-title p-0">
                        電子郵件
                      </label>
                      <div class="form-floating mb-3">
                        <input
                          type="email"
                          className="form-control custom-input "
                          id="floatingInput"
                          placeholder="name@example.com"
                        />
                        <label for="floatingInput" className="floating-label">
                          請填入電子信箱
                        </label>
                      </div>
                      {/* -------- 密碼 -------- */}
                      <label for="" className="col-form-label label-title p-0">
                        密碼
                      </label>
                      <div class="form-floating mb-3">
                        <input
                          type="password"
                          className="form-control custom-input"
                          id="floatingInput"
                          placeholder="name@example.com"
                        />
                        <label for="floatingInput" className="floating-label">
                          請填入密碼
                        </label>
                      </div>
                      {/* -------- 密碼確認 -------- */}
                      <label for="" className="col-form-label label-title p-0">
                        密碼確認
                      </label>
                      <div class="form-floating mb-3">
                        <input
                          type="password"
                          className="form-control custom-input "
                          id="floatingInput"
                          placeholder="name@example.com"
                        />
                        <label for="floatingInput" className="floating-label">
                          請再次輸入密碼
                        </label>
                      </div>
                      {/* -------- 手機-------- */}
                      <label for="" className="col-form-label label-title p-0">
                        手機
                      </label>
                      <div class="form-floating mb-3">
                        <input
                          type="phone"
                          className="form-control custom-input"
                          id="floatingInput"
                          placeholder="name@example.com"
                        />
                        <label for="floatingInput" className="floating-label">
                          09XXXXXXXX
                        </label>
                      </div>
                      {/* -------- 地址 -------- */}
                      <label for="" className="col-form-label label-title p-0">
                        地址
                      </label>
                      <div class=" mb-3 d-flex justify-content-between row gy-1">
                        {/* -------- 縣市 -------- */}
                        <div class="col-lg-6">
                          <select
                            className="form-select custom-input"
                            aria-label="Default select example"
                          >
                            <option selected>請選擇縣市</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                          </select>
                        </div>
                        {/* -------- 區域 -------- */}
                        <div class=" col-lg-6">
                          <select
                            className="form-select custom-input"
                            id="floatingSelectGrid"
                            aria-label="Floating label select example"
                          >
                            <option selected>請選擇區域 </option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="btn btn-register mb-2 col-lg-12"
                    >
                      註冊
                    </button>
                  </form>
                  {/* -------- 表格結束 -------- */}
                  <div className="split-line d-flex align-items-center justify-content-between mb-2 ">
                    <hr className="col-lg-5" />或<hr className="col-lg-5" />
                  </div>
                  {/* -------- Facebook 登入 -------- */}
                  <button className=" col-lg-12  p-0 m-0 btn">
                    <div
                      className=" btn btn-fb-login d-flex align-items-center text-center justify-content-center"
                      role="button"
                    >
                      <ImFacebook2 className="me-1" />
                      使用 Facebook 註冊
                    </div>
                  </button>
                  <Link to="">
                    <p>忘記密碼？</p>
                  </Link>
                  <p>
                    尚未加入GOODTOGO？
                    <Link to="/register">
                      <span>立即註冊</span>
                    </Link>
                  </p>
                </div>
                <div className="col-lg-1"></div>
              </div>

              <div className="col-lg-1"></div>
            </div>
          </div>
          <div className="col-lg-1 m-0 p-0"></div>
        </div>
>>>>>>> 53c5f90 (feat - login)
      </div>
    </>
  );
};

export default Register;
