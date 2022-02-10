import React from "react";
import { Link } from "react-router-dom";
import "../Login/style/login.scss";

const Login = () => {
  return (
    <>
      <div className="container-fluid login-con">
        <div className="row">
          <div className="col-lg-4 m-0 p-0"></div>
          <div className="col-lg-4 m-0 p-0">
            <div className="content text-center row justify-content-between gy-0">
              <div className="col-lg-1"></div>
              <div className="col-lg-10">
                <div className="h3">會員登入</div>
                <form>
                  <div className="label-group">
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
                  </div>
                  <button type="submit" className="submit-btn mb-3" />
                  <button type="submit" className="submit-btn">
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
          <div className="col-lg-4 m-0 p-0"></div>
        </div>
      </div>
    </>
  );
};

export default Login;
