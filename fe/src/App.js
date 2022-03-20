import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthContext } from "./context/auth";
import { API_URL } from "./utils/config";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./styles/index.scss";
import "antd/dist/antd.css";

// -------- import pages --------
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Map from "./pages/Map";
import About from "./pages/About";
import LatestNews from "./pages/LatestNews";
import Activity from "./pages/Activity";
import StoreList from "./pages/StoreList";
//admin
import StoreRegister from "./pages/Admin/components/Register";
import StoreLogin from "./pages/Admin/components/Login";
import StoreBg from "./pages/Storebg";

import NewProduct from "./pages/NewProduct";
import ProductEdit from "./pages/ProductEdit";
import StoreProfileEditing from "./pages/StoreProfileEditing";

import CheckoutPhone from "./pages/CheckoutPhone";
import Coupon from "./pages/Coupon";

import Product from "./pages/Product";
import Footer from "./components/Footer";
import ProductComment from "../src/pages/Productcomment";

import Admin from "./pages/Admin/";
//會員註冊
import Login from "./pages/Auth/Login";
import Reset from "./pages/Auth/Reset";
import Register from "./pages/Auth/Register";
import MyAccount from "./pages/MyAccount";
import ShoppingCart from "./pages/shoppingcart";
import CheckOut from "./pages/Checkout";

function App() {
  // -------- 判斷登入與否 member有資料就是已登入 --------
  const [loginMember, setLoginMember] = useState(null);
  const [loginSeller, setLoginSeller] = useState(null);

  // todo 修改  navbar顯示方式判斷↓↓
  // const [auth, setAuth] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  // todo 修改  navbar顯示方式判斷↑↑

  console.log("11111111111", loginMember);
  // 商品細節頁 Modal 判斷有沒有點就讓導覽列消失
  const [isModalTouch, setisModalTouch] = useState(true);
  // console.log("aaaaaaaaa",isModalTouch);

  // Nav shoppingCart 刪除觸發刷新 api 開關需與購物車頁面同步
  const [navshoppingDeleteParameter, setNavShoppingDeleteParameter] =
    useState(0);
  // 用來頁面購物車與導覽列購物車同步加減數量的state
  const [shoppingNumPost, setShoppingNumPost] = useState(0);
  // 結帳所需 data
  const [checkoutData, setCheckoutData] = useState({
    //!整合須改為目前登入者 id
    userId: "1",
    storeId: "",
    paymentMethod: "1",
  });
  // console.log("哈囉",checkoutData);
  useEffect(() => {
    // 每次重新整理或開啟頁面時，都去確認一下是否在已經登入的狀態。
    const getMember = async () => {
      try {
        let result = await axios.get(`${API_URL}/checkMember`, {
          withCredentials: true,
        });
        setLoginMember(result.data);
      } catch (e) {}
    };
    getMember();
  }, []);
  useEffect(() => {
    // 每次重新整理或開啟頁面時，都去確認一下是否在已經登入的狀態。
    const getSeller = async () => {
      try {
        let result = await axios.get(`${API_URL}/checkStore`, {
          withCredentials: true,
        });
        setLoginSeller(result.data);
      } catch (e) {}
    };
    getSeller();
  }, []);
  // console.log("member from App.js", loginMember); //ok
  return (
    <AuthContext.Provider
      value={{ loginMember, setLoginMember, loginSeller, setLoginSeller }}
    >
      <Router>
        {isModalTouch && (
          <Navbar
            setNavShoppingDeleteParameter={setNavShoppingDeleteParameter}
            navshoppingDeleteParameter={navshoppingDeleteParameter}
          />
        )}
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/auth/*">
            <Route path="login" element={<Login />}></Route>
            <Route path="register" element={<Register />}></Route>
            <Route path="reset" element={<Reset />}></Route>
          </Route>
          <Route path="/storebg" element={<StoreBg setIsAdmin={setIsAdmin} />}>
            <Route
              path=":currentPage"
              element={<StoreBg setIsAdmin={setIsAdmin} />}
            ></Route>
          </Route>
          <Route
            path="/newproduct"
            element={<NewProduct setIsAdmin={setIsAdmin} />}
          ></Route>
          <Route
            path="/productedit/:productId/"
            element={<ProductEdit setIsAdmin={setIsAdmin} />}
          ></Route>
          <Route
            path="/storeprofileediting"
            element={<StoreProfileEditing setIsAdmin={setIsAdmin} />}
          ></Route>
          <Route path="/latestnews" element={<LatestNews />}></Route>
          <Route path="/activity" element={<Activity />}></Route>
          <Route path="/checkoutphone" element={<CheckoutPhone />}></Route>
          <Route path="/coupon" element={<Coupon />}></Route>
          <Route path="/Joinus" element={<StoreRegister />}></Route>
          <Route path="/storeLogin" element={<StoreLogin />}></Route>
          <Route path="/admin" element={<Admin />}></Route>
          <Route path="/stores" element={<StoreList />} />
          {/* 店家商品頁，店家點進來顯示店家所賣商品 */}
          <Route
            path="/store/:storeId/"
            element={<Product setisModalTouch={setisModalTouch} />}
          >
            <Route path=":currentPage" element={<Product />} />
          </Route>
          <Route
            path="/shoppingcart"
            element={
              loginMember ? (
                <ShoppingCart
                  setCheckoutData={setCheckoutData}
                  checkoutData={checkoutData}
                  setNavShoppingDeleteParameter={setNavShoppingDeleteParameter}
                  navshoppingDeleteParameter={navshoppingDeleteParameter}
                />
              ) : (
                <Login />
              )
            }
          ></Route>
          <Route
            path="/checkout"
            element={
              <CheckOut
                checkoutData={checkoutData}
                setNavShoppingDeleteParameter={setNavShoppingDeleteParameter}
                navshoppingDeleteParameter={navshoppingDeleteParameter}
              />
            }
          ></Route>
          <Route path="/map" element={<Map />}></Route>

          <Route
            path="member/*"
            element={<MyAccount setisModalTouch={setisModalTouch} />}
          >
            <Route path=":userInfo" element={<MyAccount />}>
              <Route path=":status" element={<MyAccount />} />
            </Route>
          </Route>
        </Routes>
        <Footer />
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
