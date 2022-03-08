import React, { useState } from "react";
import { useAuth } from "../context/auth";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
//alert套件
import Swal from "sweetalert2";
//引用antd popover
import { Menu } from "antd";
import "antd/dist/antd.css";
//引用漢堡
import Hamburger from "hamburger-react";
//引用icon
import { ReactComponent as UserIcon } from "../images/user-icon.svg";
import { ReactComponent as StoreIcon } from "../images/store-icon.svg";

const _menuToggle = () => {
  const { loginMember, setLoginMember } = useAuth();
  const [isOpen, setOpen] = useState(false);
  const navigate = useNavigate();
  // console.log("me open", isOpen);
  //antd menu
  const { SubMenu } = Menu;
  //swal
  const swal = Swal.mixin({
    customClass: {
      confirmButton: " btn confirmbtn ms-2 me-2",
      cancelButton: "btn cancelbtn ms-2 me-2",
    },
    buttonsStyling: false,
  });
  const click = () => {
    return (
      <>
        {swal
          .fire({
            text: "確定要登出嗎?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "確定登出",
            cancelButtonText: "保持登入",
            reverseButtons: true,
          })
          .then((result) => {
            if (result.isConfirmed) {
              setLoginMember(null);
              swal.fire("登出囉！", "我們隨時歡迎您:)", "success");
              navigate("/");
              window.scrollTo(0, 0);
            } else if (
              /* Read more about handling dismissals below */
              result.dismiss === Swal.DismissReason.cancel
            ) {
              swal.fire("", "yay繼續一起愛地球", "success");
            }
          })}
      </>
    );
  };
  const loggedin = (
    <div className="nav-toggle-menu">
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
  const notLoggedin = (
    <div className="nav-toggle-menu">
      <div className="popover-item text-center d-flex align-items-center">
        <UserIcon className="me-3" />
        <Link to="/auth/login" className="nav-popover-link no-link">
          會員登入
        </Link>
        <div className="me-3 ms-3">|</div>
        <Link to="＃" className="nav-popover-link">
          店家登入
        </Link>
      </div>
      <div className="popover-item text-center">
        <Link to="stores" className="nav-popover-link no-link">
          <StoreIcon className="me-3" />
          探索美食
        </Link>
      </div>
    </div>
  );

  return (
    <>
      <Menu mode="horizontal" triggerSubMenuAction="click">
        <SubMenu
          className="p-0 justify-self-end"
          icon={
            <Hamburger
              toggled={isOpen}
              toggle={setOpen}
              size={22}
              color="#668C4A"
              rounded
            />
          }
        >
          {loginMember ? loggedin : notLoggedin}
        </SubMenu>
      </Menu>
    </>
  );
};

export default _menuToggle;
