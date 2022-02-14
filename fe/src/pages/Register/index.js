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
      </div>
    </>
  );
};

export default Register;
