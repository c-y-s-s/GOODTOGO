import React from "react";
import { Link } from "react-router-dom";
import "../Register/style/register.scss";

const Register = () => {
  return (
    <>
      <div className="container-fluid login-con">
        <div className="row">
          <div className="col-lg-1 m-0 p-0"></div>
          <div className="col-lg-5 m-0 p-0"></div>
          <div className="col-lg-5 m-0 p-0">
            <div className="content text-center row justify-content-between gy-0">
              <div className="col-lg-1"></div>
              <div className="col-lg-10">
                <form>
                  <div className="label-group">
                    {/* name */}
                    <label for="" className="col-form-label label-title p-0">
                      姓名
                    </label>
                    <div class="form-floating mb-3">
                      <input
                        type="text"
                        className="form-control "
                        id="floatingInput"
                        placeholder=""
                      />
                      <label for="floatingInput" className="floating-label">
                        請輸入中文 / 英文姓名
                      </label>
                    </div>
                    {/* email */}
                    <label for="" className="col-form-label label-title p-0">
                      電子郵件
                    </label>
                    <div class="form-floating mb-3">
                      <input
                        type="email"
                        className="form-control "
                        id="floatingInput"
                        placeholder="name@example.com"
                      />
                      <label for="floatingInput" className="floating-label">
                        請填入電子信箱
                      </label>
                    </div>
                    {/* password */}
                    <label for="" className="col-form-label label-title p-0">
                      密碼
                    </label>
                    <div class="form-floating mb-3">
                      <input
                        type="password"
                        className="form-control "
                        id="floatingInput"
                        placeholder="name@example.com"
                      />
                      <label for="floatingInput" className="floating-label">
                        請填入密碼
                      </label>
                    </div>
                    {/* confirm password */}
                    <label for="" className="col-form-label label-title p-0">
                      密碼確認
                    </label>
                    <div class="form-floating mb-3">
                      <input
                        type="password"
                        className="form-control "
                        id="floatingInput"
                        placeholder="name@example.com"
                      />
                      <label for="floatingInput" className="floating-label">
                        請再次輸入密碼
                      </label>
                    </div>
                    {/* confirm password */}
                    <label for="" className="col-form-label label-title p-0">
                      手機
                    </label>
                    <div class="form-floating mb-3">
                      <input
                        type="number"
                        className="form-control "
                        id="floatingInput"
                        placeholder="name@example.com"
                      />
                      <label for="floatingInput" className="floating-label">
                        09XXXXXXXX
                      </label>
                    </div>
                    {/* 地址 */}
                    <label for="" className="col-form-label label-title p-0">
                      地址
                    </label>
                    <div class="form-floating mb-3 d-flex justify-content-between row gy-1">
                      {/* 縣市 */}
                      <div class="form-floating col-lg-6">
                        <select
                          class="form-select"
                          aria-label="Default select example"
                        >
                          <option selected>請選擇縣市</option>
                          <option value="1">One</option>
                          <option value="2">Two</option>
                          <option value="3">Three</option>
                        </select>
                      </div>
                      {/* 區域 */}
                      <div class="form-floating col-lg-6">
                        <select
                          class="form-select"
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
                  <button type="submit" className="submit-btn mb-3">
                    登入
                  </button>
                </form>
                <button className="fb-login">使用Facebook登入</button>
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
          </div>
          <div className="col-lg-1 m-0 p-0"></div>
        </div>
      </div>
    </>
  );
};

export default Register;
