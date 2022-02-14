import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";

import { ImFacebook2 } from "react-icons/im";
import Reset from "./Reset";

const LoginForm = ({
  fields,
  setFields,
  fieldErrors,
  setFieldErrors,
  onFieldChange,
  onFormChange,
  onSubmit,
  onInvalid,
}) => {
  return (
    <>
      <div className="h6 ">會員登入</div>
      {/* -------- 表格開始 -------- */}
      <div className="label-group d-flex flex-column">
        <form
          className="d-flex flex-column needs-validation"
          onSubmit={onSubmit}
          onChange={onFormChange}
          onInvalid={onInvalid}
          novalidate
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
              className="form-control custom-input"
              id="floatingInput"
              placeholder="帳號"
              value={fields.email}
              onChange={onFieldChange}
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
              type="password"
              className="form-control custom-input"
              id="floatingInput"
              placeholder="密碼"
              value={fields.password}
              onChange={onFieldChange}
              minLength="3"
              required
            />
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
        <button className="btn btn-fb-login col-lg-12 d-flex align-items-center text-center justify-content-between">
          <ImFacebook2 className="big-icon col-lg-2 " />
          使用 Facebook 登入
          <div className="col-lg-2"> </div>
        </button>
      </div>
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