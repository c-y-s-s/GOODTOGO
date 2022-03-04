import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Popover } from "antd";
import "antd/dist/antd.css";
import { useAuth } from "../context/auth";
//引用icon
import { ReactComponent as UserIcon } from "../images/user-icon.svg";
import Swal from "sweetalert2";
import { ReactComponent as ShoppingBag } from "../images/shopping-bag-icon.svg";
const _popover = () => {
  const { loginMember, setLoginMember } = useAuth(true);

  const click = () => {
    return (
      <>

      </>
    );
  };

  const notLoggedin = (
    <div className="nav-popover">
      
    </div>
  );
  const loggedin = (
    <div className="nav-popover">
      <div className="popover-item text-center">
        <Link to="/member" className="nav-popover-link">
          會員中心
        </Link>
      </div>
      <div className="popover-item text-center">
        <Link to="/member/order" className="nav-popover-link">
          我的訂單
        </Link>
      </div>
      {/* <div className="popover-item text-center">
        <Link to="#" className="nav-popover-link">
          優惠券
        </Link>
      </div> */}
      <div className="popover-item text-center">
        {/* <Link to="auth/logout" className="nav-popover-link">
          登出
        </Link> */}
        <div onClick={click} className="nav-popover-link">
          登出
        </div>
      </div>
    </div>
  );
  return (
    <>
      <Popover
        placement="bottom"
        content={loginMember ? loggedin : notLoggedin}
        // trigger="click"
      >
        <ShoppingBag className="nav-icon mt-1" />
      </Popover>
    </>
  );
};

export default _popover;
