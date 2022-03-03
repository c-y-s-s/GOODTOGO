import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as Logo } from "../images/navLogo.svg";

const Footer = () => {
  return (
    <footer className="container-fluid">
      <div className="row justify-content-center">
        <div className="col-lg-10 col-sm-9 footer-content">
          <div className="footer-top row justify-content-center">
            <div className="col-lg-auto col-sm-12 col-12 text-center me-1">
              <Logo className="" />
            </div>
            <div className="p-3 col-lg-3 offset-lg-1  text-center">
              <span>Tel: 03-000-1234</span>
              <br />
              <span>Email: service@goodtogo.com</span>
            </div>
            <div className="col-lg-3 row row-col-3 link-groups justify-content-between gx-3 col-12">
              <Link to="/" className="col-auto footer-link ">
                回到首頁
              </Link>
              <Link to="/store_check" className="footer-link col-auto">
                申請店家
              </Link>
              <Link to="/member/profile" className="footer-link col-auto">
                我的帳戶
              </Link>
              {/* TODO:點下去會先去登入頁 */}
              <Link to="/" className="footer-link col-auto">
                領取優惠
              </Link>

              <Link to="/about" className="footer-link col-auto">
                了解我們
              </Link>
              <Link to="#" className="footer-link col-auto">
                常見問題
              </Link>
              <Link to="#" className="footer-link col-auto">
                搜尋店家
              </Link>
              <Link to="#" className="footer-link col-auto">
                聯絡我們
              </Link>
            </div>
          </div>
          <div className="split col-lg-12"></div>

          <div className="footer-bottom row justify-content-end">
            {/* <div className="text-end col-3"></div> */}
            <div className="col-md-6 offset-md-3 text-center ">
              Copyright © 2022 Good To Go - All Rights Reserved.
            </div>
            <div className="footer-sign-info col-lg-3 col-12">
              本網站僅為練習製作網站之用
              <br />
              如有侵權敬請告知 (02) 6631-6588
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
