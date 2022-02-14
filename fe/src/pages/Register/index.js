import React from "react";
import { Link } from "react-router-dom";
import { ImFacebook2 } from "react-icons/im";
import { ReactComponent as Logo } from "../../images/logo-face.svg";
import TWzipcode from "react-twzipcode";

const Register = () => {
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
                    <form className="d-flex flex-column ">
                      {/* -------- 姓名 -------- */}
                      <label
                        for=""
                        className="col-form-label input-label-title text-green p-0"
                      >
                        姓名
                      </label>
                      <div class="form-floating mb-3">
                        <input
                          type="text"
                          className="form-control custom-input "
                          id="floatingInput"
                          placeholder="name@example.com"
                        />
                        <label
                          for="floatingInput"
                          className="floating-label text-grey"
                        >
                          請填入中文 / 英文姓名
                        </label>
                      </div>
                      {/* -------- 電子郵件 -------- */}
                      <label
                        for=""
                        className="col-form-label input-label-title   text-green p-0"
                      >
                        電子郵件
                      </label>
                      <div class="form-floating mb-3">
                        <input
                          type="email"
                          className="form-control custom-input "
                          id="floatingInput"
                          placeholder="name@example.com"
                        />
                        <label
                          for="floatingInput"
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
                          type="password"
                          className="form-control custom-input"
                          id="floatingInput"
                          placeholder="name@example.com"
                        />
                        <label
                          for="floatingInput"
                          className="floating-label  text-grey"
                        >
                          請填入密碼
                        </label>
                      </div>
                      {/* -------- 密碼確認 -------- */}
                      <label
                        for=""
                        className="col-form-label input-label-title   text-green p-0"
                      >
                        密碼確認
                      </label>
                      <div class="form-floating mb-3">
                        <input
                          type="password"
                          className="form-control custom-input "
                          id="floatingInput"
                          placeholder="name@example.com"
                        />
                        <label
                          for="floatingInput"
                          className="floating-label  text-grey"
                        >
                          請再次輸入密碼
                        </label>
                      </div>
                      {/* -------- 手機-------- */}
                      <label
                        for=""
                        className="col-form-label input-label-title  text-green p-0"
                      >
                        手機
                      </label>
                      <div class="form-floating mb-3">
                        <input
                          type="phone"
                          className="form-control custom-input"
                          id="floatingInput"
                          placeholder="name@example.com"
                        />
                        <label
                          for="floatingInput"
                          className="floating-label  text-grey"
                        >
                          09XXXXXXXX
                        </label>
                      </div>
                      {/* -------- 地址 -------- */}
                      <label
                        for=""
                        className="col-form-label input-label-title  text-green p-0"
                      >
                        地址
                      </label>
                      <div class="col-lg-6 d-flex flex-column">
                        <TWzipcode
                          css={[
                            " custom-input form-control county-sel mb-2",
                            " custom-input form-control district-sel ",
                            "form-control zipcode d-none",
                          ]}

                          // handleChangeCounty={this.handleChange}
                          // handleChangeDistrict={this.handleChange}
                          // handleChangeZipcode={this.handleChange}
                        />
                      </div>

                      <div className="col-lg-6">
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

                      <button
                        type="submit"
                        className="btn btn-register col-lg-12 mb-2"
                      >
                        註冊
                      </button>
                    </form>
                    {/* -------- 表格結束 -------- */}
                    <div className="d-flex align-items-center justify-content-between mb-2">
                      <hr className="col-lg-5" />或<hr className="col-lg-5" />
                    </div>
                    {/* -------- Facebook 登入 -------- */}
                    <button className="col-lg-12 btn-fb-login btn d-flex align-items-center text-center justify-content-center m-0 mb-3">
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
      </div>
    </>
  );
};

export default Register;
