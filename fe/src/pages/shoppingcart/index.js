import { useState, useEffect, useLayoutEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import ProductsData from "./component/ProductsData";
import { API_URL } from "../../utils/config";
// -------- react icon --------
import { v4 as uuidv4 } from "uuid";
import { FaStore } from "react-icons/fa";
import { ReactComponent as JumpIcon }  from "../../images/editor-0.9s-215px.gif";
import { useAuth } from "../../context/auth";
const Shoppingcart = ({
  setCheckoutData,
  checkoutData,
  navshoppingDeleteParameter,
  setNavShoppingDeleteParameter,
}) => {

   
  // 購物車資料
  const [shoppingCartData, setShoppingCartData] = useState([]);
    const { loginMember } = useAuth();
         console.log("~~~~~~~~1~", loginMember.id);
  // 刪除商品刷新頁面開關
  const [deleteLive, setDeleteLive] = useState(true);
  // 總金額刷新開關
  const [priceTotal, setPriceTotal] = useState(true);
  // 付款方式
  const [paymentData, setPatMentData] = useState(1);
  // 存入所要結帳商家 ID 和 付款方式寫進資料庫
  const [shoppingCheckData, setShoppingCheckData] = useState({
    //!整合須改為目前登入者 id
    userId: loginMember.id,
    storeId: "",
    paymentMethod: "",
    storeName: "",
    storeCategory: "",
  });
  useEffect(() => {
    let getShoppingData = async () => {
      // 撈 user_id 所存入購物車的資料
      let shoppingDataResponse = await axios.get(
        `${API_URL}/shop/shoppingstoredata/${loginMember.id}`
      );
      setShoppingCartData(shoppingDataResponse.data);
    };
    getShoppingData();
  }, [deleteLive, priceTotal, navshoppingDeleteParameter]);

  return (
    <div>
      <div className="container-fluid shopping-title">購物車</div>
      <div className="container user-shopping-cart">
        {shoppingCartData.length > 0 ? (
          shoppingCartData.map((item) => {
            console.log(item);
            return (
              <div
                className="col-9 mx-auto user-shopping-cart-data"
                key={item.store_id}
              >
                {/* 標頭 */}
                <div className="d-flex user-shopping-cart-data-title">
                  <div className="d-flex align-items-center">
                    <div>
                      <FaStore className="store-icon" />
                    </div>
                    <div className="user-shopping-cart-data-title-name">
                      {item.store_name}
                    </div>
                    <div className="user-shopping-cart-data-title-category ">
                      {item.category}
                    </div>
                  </div>

                  <div className="user-shopping-cart-data-title-rwd user-shopping-cart-data-price">
                    單價
                  </div>
                  <div className="user-shopping-cart-data-title-rwd user-shopping-cart-data-amount">
                    數量
                  </div>
                  <div className="d-flex  user-shopping-cart-data-title-rwd">
                    <div className="mx-5 user-shopping-cart-data-title-rwd">
                      小計
                    </div>
                    <div className="user-shopping-cart-data-title-rwd">
                      刪除
                    </div>
                  </div>
                </div>
                {/* 商品資料 */}
                <ProductsData
                  storeid={item.store_id}
                  setDeleteLive={setDeleteLive}
                  deleteLive={deleteLive}
                  setPriceTotal={setPriceTotal}
                  priceTotal={priceTotal}
                  setNavShoppingDeleteParameter={setNavShoppingDeleteParameter}
                  navshoppingDeleteParameter={navshoppingDeleteParameter}
                  loginMemberId={loginMember.id}
                />
                {/* 下排 */}
                <div className="d-flex justify-content-between   user-shopping-cart-data-payment ">
                  <div className="d-flex ">
                    <div>付款方式 : </div>
                    <div className="user-shopping-cart-data-payment-method">
                      <div className="site">
                        <input
                          type="radio"
                          id={`promptCash${item.store_id}`}
                          name={`drone${item.store_id}`}
                          value="1"
                          onClick={() => {
                            setCheckoutData({
                              ...checkoutData,
                              paymentMethod: "1",
                            });
                          }}
                          defaultChecked={paymentData === 1}
                        />
                        <label htmlFor={`promptCash${item.store_id}`}>
                          現場取貨付款
                        </label>
                      </div>

                      <div className="credit-card">
                        <input
                          type="radio"
                          id={`creditCard${item.store_id}`}
                          name={`drone${item.store_id}`}
                          value="2"
                          onClick={() => {
                            setCheckoutData({
                              ...checkoutData,
                              paymentMethod: "2",
                            });
                          }}
                          defaultChecked={paymentData === 2}
                        />
                        <label htmlFor={`creditCard${item.store_id}`}>
                          信用卡付款
                        </label>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div>
                      訂單金額 :
                      <span className="price_total">NT${item.total}</span>
                    </div>
                  </div>
                </div>

                {/* 結帳 */}
                <div className="user-shopping-cart-data-checkout">
                  <Link
                    to="/checkout"
                    className="checkout-button"
                    onClick={() => {
                      setCheckoutData({
                        ...checkoutData,
                        storeId: item.store_id,
                        storeName: item.store_name,
                        storeCategory: item.category,
                        orderPriceTotal: item.total,
                      });
                    }}
                  >
                    去結帳
                  </Link>
                </div>
              </div>
            );
          })
        ) : (
          <div className="shopping-cart-nothing-products">
            <img src={require(`../../images/editor-0.9s-215px.gif`)} />
            <div className="shopping-cart-nothing-products-text">
              購物車沒有商品
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Shoppingcart;
