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
    return <></>;
  };

  const notLoggedin = <div className="nav-popover"></div>;

  const shoppingList = (
    <div>
      <div className="nav-shopping-cart">
        <div className="nav-shopping-cart-products">
          <div className="nav-shopping-cart-products-img">圖片</div>
          <div className="nav-shopping-cart-products-text">
            <div className="d-flex justify-content-between">
              <div className="nav-shopping-cart-products-text-name">
                鴨肉蓋飯
              </div>
              <button className="nav-shopping-cart-products-text-delete">
                X
              </button>
            </div>
            <div className="d-flex justify-content-between w-100">
              <div className="nav-shopping-cart-products-text-amount">1 X</div>
              <div className="nav-shopping-cart-products-text-price">
                NT $ 60
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="nav-shopping-cart">
        <div className="nav-shopping-cart-products">
          <div className="nav-shopping-cart-products-img">圖片</div>
          <div className="nav-shopping-cart-products-text">
            <div className="d-flex justify-content-between">
              <div className="nav-shopping-cart-products-text-name">
                鴨肉蓋飯
              </div>
              <button className="nav-shopping-cart-products-text-delete">
                X
              </button>
            </div>
            <div className="d-flex justify-content-between w-100">
              <div className="nav-shopping-cart-products-text-amount">1 X</div>
              <div className="nav-shopping-cart-products-text-price">
                NT $ 60
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="nav-shopping-cart-gopage">
        <Link to="/shoppingcart" className="nav-shopping-cart-gopage-button">
          查看購物車
        </Link>
      </div>
    </div>
  );
  return (
    <>
      <Popover
        placement="bottomRight"
        // content={loginMember ? loggedin : notLoggedin}
        content={shoppingList}
        // trigger="click"
      >
        <ShoppingBag className="nav-icon mt-1" />
      </Popover>
    </>
  );
};

export default _popover;
