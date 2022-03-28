import React from "react";
import { Link } from "react-router-dom";

const Reset = () => {
  return (
    <div className="container-fluid reset-bg m-auto align-items-center d-flex">
      <div className="col-lg-5 col-md-8 col-12 m-0 p-0 m-auto">
        <div className="reset-bg_content text-center  m-auto">
          <div className="col-lg-10 col-10 d-flex flex-column pt-5 pb-4 m-auto text-center">
            <>
              <div className="h4 text-dark-grey">忘記密碼</div>
              {/* -------- 表格開始 -------- */}
              <div className="label-group d-flex flex-column">
                <form className="d-flex flex-column col-lg-10 col-12 m-auto">
                  {/* email */}
                  <label
                    for=""
                    className=" input-label-title p-0 text-start text-green mt-3 mb-2"
                  >
                    電子郵件
                  </label>
                  <div class="form-floating mb-2">
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
                      className="btn submit-btn mt-2 mb-2 col-lg-12"
                    >
                      請填入您已註冊的電子郵件 以傳送新密碼
                    </button>
                  </div>

                  {/* -------- 表格結束 -------- */}
                  <hr className="col-lg-12 " />
                </form>
              </div>
              <div className="col-lg-12 d-flex justify-content-center">
                <Link to="/auth/register" className="no-link">
                  <span className="text-yellow ">會員註冊 </span>
                </Link>
                <div className="col-lg-1 text-yellow ps-1 pe-1"> | </div>
                <Link to="/auth/login" className="no-link">
                  <span className="text-yellow"> 會員登入</span>
                </Link>
              </div>
            </>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reset;
