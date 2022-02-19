import React from "react";
import { Link } from "react-router-dom";

const Reset = () => {
  return (
    <div className="container-fluid login-con">
      <div className="row">
        <div className="col-lg-4 m-0 p-0"></div>
        <div className="col-lg-4 m-0 p-0">
          <div className="content text-center row justify-content-between gy-0">
            <div className="col-lg-2"></div>
            <div className="col-lg-8 row mb-4 flex-column justify-content-evenly align-items-center fix-height  pt-5 pb-4">
              <>
                <div className="h4 text-dark-grey">忘記密碼</div>
                {/* -------- 表格開始 -------- */}
                <div className="label-group d-flex flex-column">
                  <form className="d-flex flex-column">
                    {/* email */}
                    <label
                      for=""
                      className=" input-label-title p-0 text-start text-green mt-3 mb-4"
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
                    <div className="btn-group">
                      <button
                        type="submit"
                        className="btn submit-btn text-light mb-4 mt-2 col-lg-12"
                      >
                        傳送重新設定密碼至以上電子信箱
                      </button>
                    </div>
                  </form>
                </div>
                {/* -------- 表格結束 -------- */}

                <hr className="col-lg-12 " />
                <div className=" col-lg-12 d-flex justify-content-center">
                  <Link to="/auth/register" className="no-link">
                    <span className="text-yellow  ">會員註冊</span>
                  </Link>
                  <div className="col-lg-1 text-yellow">|</div>
                  <Link to="/auth/login" className="no-link">
                    <span className="text-yellow">會員登入</span>
                  </Link>
                </div>
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

export default Reset;
