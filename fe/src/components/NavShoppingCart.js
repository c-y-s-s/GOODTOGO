import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import { Popover } from "antd";
import "antd/dist/antd.css";
import { useAuth } from "../context/auth";
import { API_URL } from "../utils/config";
//引用icon
import { ReactComponent as ShoppingBag } from "../images/shopping-bag-icon.svg";
import axios from "axios";
const NavShoppingCart = ({
  setShoppingCartTotalPages,
  setNavShoppingDeleteParameter,
  navshoppingDeleteParameter,
}) => {
  const { loginMember, setLoginMember } = useAuth(true);
  const [navshoppingCartData, setNavShoppingCartData] = useState([]);

  const click = () => {
    return <></>;
  };

  // 抓出使用者購物車商品
  useEffect(() => {
    let getShoppingData = async () => {
      let ShoppingDataResponse = await axios.get(
        `${API_URL}/shop/shoppingcar/${loginMember.id}`
      );
      setNavShoppingCartData(ShoppingDataResponse.data);
      setShoppingCartTotalPages(ShoppingDataResponse.data.length);
    };
    getShoppingData();
  }, [navshoppingDeleteParameter]);

  // 寫入刪除商品
  async function handleDeleteNavShoppingCartData(item) {
    let response = await axios.post(
      `${API_URL}/shop/shoppingcartotoaldelete`,
      item
    );
    setNavShoppingDeleteParameter(navshoppingDeleteParameter + 1);
  }

  const notLoggedin = <div className="nav-popover">尚未登入帳號</div>;

  const shoppingList = (
    <div>
      {navshoppingCartData.length > 0 ? (
        navshoppingCartData.map((item) => {
          return (
            <div className="nav-shopping-cart" key={item.products_id}>
              <div className="nav-shopping-cart-products">
                <img
                  src={require(`../images/products_img/${item.img}`)}
                  alt=""
                  className="nav-shopping-cart-products-img"
                />
                <div className="nav-shopping-cart-products-text">
                  <div className="d-flex justify-content-between">
                    <div className="nav-shopping-cart-products-text-name">
                      {item.product_name}
                    </div>
                    <button
                      className="nav-shopping-cart-products-text-delete"
                      onClick={() => {
                        handleDeleteNavShoppingCartData({
                          id: item.id,
                        });
                      }}
                    >
                      X
                    </button>
                  </div>
                  <div className="d-flex justify-content-between w-100">
                    <div className="nav-shopping-cart-products-text-amount">
                      {item.amount} X
                    </div>
                    <div className="nav-shopping-cart-products-text-price">
                      NT $ 60
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div className="nav-shopping-cart-nothing-products-text">
          購物車沒有商品
        </div>
      )}

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
        // content={loginMember ? shoppingList : notLoggedin}
        content={shoppingList}
        // content={shoppingList}
        // trigger="click"
        // trigger={loginMember && "click" }
      >
        <ShoppingBag className="nav-icon me-2" />
      </Popover>
    </>
  );
};

export default NavShoppingCart;
