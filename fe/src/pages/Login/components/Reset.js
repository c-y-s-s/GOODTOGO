import React from "react";
import { Link } from "react-router-dom";

const Reset = () => {
  return (
    <>
      <div className="container-fluid login-con">
        <div className="row">
          <div className="col-lg-4 m-0 p-0"></div>
          <div className="col-lg-4 m-0 p-0">
            <div className="content text-center row justify-content-between gy-0">
              <div className="col-lg-1"></div>
              <div className="col-lg-10 row mt-4 mb-4 flex-column justify-content-evenly align-items-center">
                {/* <LoginForm
                  fields={fields}
                  setFields={setFields}
                  fieldErrors={fieldErrors}
                  setFieldErrors={setFieldErrors}
                  onFieldChange={onFieldChange}
                  onFormChange={onFormChange}
                  onSubmit={onSubmit}
                  onInvalid={handleInvalid}
                /> */}
                {/* <Reset /> */}
                <>
                  <div className="h6">忘記密碼</div>
                  {/* -------- 表格開始 -------- */}
                  <div className="label-group d-flex flex-column">
                    <form className="d-flex flex-column">
                      {/* email */}
                      <label
                        for=""
                        className="col-form-label input-label-title p-0 text-start"
                      >
                        電子郵件
                      </label>
                      <div class="form-floating mb-4">
                        <input
                          type="email"
                          className="form-control custom-input"
                          id="floatingInput"
                          placeholder="name@example.com"
                        />
                        <label
                          for="floatingInput"
                          className="floating-label text-grey "
                        >
                          請填入電子信箱
                        </label>
                      </div>

                      <button
                        type="submit"
                        className="btn submit-btn text-light mb-4 mt-3 col-lg-12"
                      >
                        傳送重新設定密碼至以上電子信箱
                      </button>
                    </form>
                    {/* -------- 表格結束 -------- */}
                  </div>
                  <hr className="col-lg-12 " />
                  <div className=" col-lg-12 d-flex justify-content-center">
                    <Link to="/register" className="no-link">
                      <span className="text-yellow  ">會員註冊</span>
                    </Link>
                    <div className="col-lg-1 text-yellow">|</div>
                    <Link to="/login" className="no-link">
                      <span className="text-yellow  ">會員登入</span>
                    </Link>
                  </div>
                </>
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

export default Reset;
