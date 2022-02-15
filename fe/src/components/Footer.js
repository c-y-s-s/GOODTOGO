import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as Logo } from "../images/navLogo.svg";

const Footer = () => {
  return (
    <footer>
      <div className="footerSec1 d-flex ">
        <div>
          <Logo />
        </div>
        <div className="p-0">
          <span className="align-middle">Tel: 03-000-1234</span>
          <br />
          <span>Email: service@goodtogo.com</span>
        </div>
        <div className="d-flex flex-wrap link-groups  justify-content-end">
          <Link to="/" className="FooterLink ">
            回到首頁
          </Link>
          <Link to="/store_check" className="FooterLink ">
            申請店家
          </Link>
          <Link to="/member/profile" className="FooterLink ">
            我的帳戶
          </Link>
          <Link to="#" className="FooterLink ">
            領取優惠
          </Link>

          <Link to="#" className="FooterLink ">
            了解我們
          </Link>
          <Link to="#" className="FooterLink ">
            常見問題
          </Link>
          <Link to="#" className="FooterLink ">
            搜尋店家
          </Link>
          <Link to="#" className="FooterLink ">
            聯絡我們
          </Link>
        </div>
      </div>
      <div className="split"></div>

      <div className="footerSec2 d-flex">
        <div className="text-end col-3"></div>
        <div className="col-5 text-center">
          Copyright © 2022 Good To Go - All Rights Reserved.
        </div>
        <div className="text-end  col-4">
          本網站僅為練習製作網站之用
          <br />
          如有侵權敬請告知 (02) 6631-6588
        </div>
      </div>
    </footer>
  );
};

export default Footer;
