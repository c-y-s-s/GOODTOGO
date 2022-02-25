import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Popover } from "antd";
import "antd/dist/antd.css";
import { useAuth } from "../context/auth";
import { ReactComponent as UserIcon } from "../images/user-icon.svg";
//引用icon
import { BsPersonCircle } from "react-icons/bs";

const _popover = () => {
  const { member } = useAuth();
  const notLoggedin = (
    <div className="nav-popover">
      <div className="popover-item text-center">
        <Link to="/auth/login" className="nav-popover-link no-link">
          會員登入
        </Link>
      </div>
      <div className="popover-item text-center">
        <Link to="＃" className="nav-popover-link">
          店家登入
        </Link>
      </div>
    </div>
  );
  const loggedin = (
    <div className="nav-popover">
      <div className="popover-item text-center">
        <Link to="/my_account" className="nav-popover-link">
          會員中心
        </Link>
      </div>
      <div className="popover-item text-center">
        <Link to="＃" className="nav-popover-link">
          我的訂單
        </Link>
      </div>
      <div className="popover-item text-center">
        <Link to="＃" className="nav-popover-link">
          優惠券
        </Link>
      </div>
      <div className="popover-item text-center">
        <Link to="＃" className="nav-popover-link">
          登出
        </Link>
      </div>
    </div>
  );
  return (
    <>
      <Popover
        placement="bottom"
        content={member ? loggedin : notLoggedin}
        // trigger="click"
      >
        <UserIcon className="nav-icon mt-1" />
      </Popover>
    </>
  );
};

export default _popover;
