import React, { useState } from "react";
import { useAuth } from "../context/auth";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
//alert套件
import Swal from "sweetalert2";

//引用icon
import { ReactComponent as UserIcon } from "../images/user-icon.svg";
import { ReactComponent as StoreIcon } from "../images/store-icon.svg";
import { ReactComponent as MapIcon } from "../images/map-pin-icon.svg";
import { FiMapPin, FiLogOut } from "react-icons/fi";
import { BiStore } from "react-icons/bi";
import { BsCardChecklist } from "react-icons/bs";
import { VscSmiley } from "react-icons/vsc";

const _menuToggle = (props) => {
  const { loginMember, setLoginMember } = useAuth();
  const navigate = useNavigate();

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
    <ul className="list-unstyled drop-down-menu">
      <li class="popover-item">
        <Link to="/member" className="nav-popover-link">
          <VscSmiley className="me-3 toggle-menu-icon" />
          會員中心
        </Link>
      </li>
      <li class="popover-item">
        <Link to="/member/order" className="nav-popover-link">
          <BsCardChecklist className="me-3 toggle-menu-icon" />
          我的訂單
        </Link>
      </li>
      <li class="popover-item mt-1">
        <Link
          to="stores"
          className="nav-popover-link d-flex align-items-center"
        >
          <BiStore className="me-3 toggle-menu-icon" />
          探索美食
        </Link>
      </li>
      <li class="popover-item">
        <Link to="map" className="nav-popover-link d-flex align-items-center">
          <FiMapPin className="me-3 toggle-menu-icon" />
          <span>地圖探索</span>
        </Link>
      </li>
      <li onClick={click} className="popover-item">
        <Link to="#" className="nav-popover-link d-flex align-items-center">
          <FiLogOut className="me-3 toggle-menu-icon" />
          <span>登出</span>
        </Link>
      </li>
    </ul>
  );
  const notLoggedin = (
    <ul className="list-unstyled drop-down-menu">
      <li class="popover-item">
        <Link to="/auth/login" className="nav-popover-link no-link">
          會員登入
        </Link>
      </li>
      <li class="popover-item">
        <Link to="/storelogin" className="nav-popover-link">
          店家登入
        </Link>
      </li>
      <hr className="col-8 m-auto" />
      <li class="popover-item mt-1">
        <Link
          to="stores"
          className="nav-popover-link d-flex align-items-center"
        >
          <BiStore className="me-3 toggle-menu-icon" />
          探索美食
        </Link>
      </li>
      <li class="popover-item">
        <Link to="map" className="nav-popover-link d-flex align-items-center">
          <FiMapPin className="me-3 toggle-menu-icon" />
          <span>地圖探索</span>
        </Link>
      </li>
      {/* <li class="popover-item">
        <Link to="/storecheck" className="nav-popover-link">
          店家申請
        </Link>
      </li> */}
    </ul>
  );

  return <>{loginMember !== null ? loggedin : notLoggedin}</>;
};

export default _menuToggle;
