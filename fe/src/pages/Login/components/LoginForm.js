import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { ImFacebook2 } from "react-icons/im";

const LoginForm = (
  {
    // fields,
    // setFields,
    // fieldErrors,
    // setFieldErrors,ˆ
    // onFieldChange,
    // onFormChange,
    // onSubmit,
    // onInvalid,
  }
) => {
  return (
    <>
      <div className="h4 mt-5">會員登入</div>
      {/* -------- 表格開始 -------- */}

      <form
        className="needs-validation justify-content-start"
        // onSubmit={onSubmit}
        // onChange={onFormChange}
        // onInvalid={onInvalid}
        novalidate
      >
        <div className="label-group d-flex flex-column ">
          {/* email */}
          <div className="text-start mt-3 mb-4">
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
                className="form-control custom-input"
                id="floatingInput"
                placeholder="帳號"
                // value={fields.email}
                // onChange={onFieldChange}
                required
              />
              <label for="floatingInput" className="floating-label text-grey ">
                請填入電子信箱
              </label>
            </div>
          </div>

          {/* password */}
          <div className=" text-start   mt-2 mb-4">
            <label
              for=""
              className="col-form-label input-label-title  text-green text-start p-0"
            >
              密碼
            </label>
            <div class="form-floating">
              <input
                name="password"
                type="password"
                className="form-control custom-input"
                id="floatingInput"
                placeholder="密碼"
                // value={fields.password}
                // onChange={onFieldChange}
                minLength="3"
                required
              />

              <label for="floatingInput" className="floating-label text-grey">
                請填入密碼
              </label>
            </div>
          </div>
        </div>
        {/* {fieldErrors.password !== "" && (
            <div className="error text-end mb-3">{fieldErrors.password}</div>
          )} */}
        <button
          type="submit"
          className="btn submit-btn text-light mb-4 mt-3 col-lg-12"
        >
          登入
        </button>
        <button className="btn btn-fb-login col-lg-12 d-flex align-items-center text-center justify-content-between">
          <ImFacebook2 className="big-icon col-lg-2 " />
          使用 Facebook 登入
          <div className="col-lg-2"> </div>
        </button>
        {/* -------- 表格結束 -------- */}
      </form>
      <Link to="/reset" className="no-link">
        <p className="text-grey no-link m-0 mt-3">忘記密碼？</p>
      </Link>

      <hr className="col-lg-12 mt-3" />

      <p className="text-grey  m-0">
        尚未加入GOODTOGO？
        <Link to="/register" className="no-link">
          <span className="text-yellow  ">立即註冊</span>
        </Link>
      </p>
    </>
  );
};

export default LoginForm;
