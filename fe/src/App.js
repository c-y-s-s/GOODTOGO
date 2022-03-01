import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./styles/index.scss";

// 這邊的資料夾命名方式可以不用指定裡面的 index
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Map from "./pages/Map";
import About from "./pages/About";
import Store from "./pages/Store";
import StoreList from "./pages/StoreList";
import StoreCheck from "./pages/StoreCheck";
import Auth from "./pages/Auth";
// import Register from "./pages/Register";
import MyAccount from "./pages/MyAccount";
import UserLikeList from "./pages/MyAccount/UserLikeList";
import UserOrderList from "./pages/MyAccount/UserOrderList";
import UserCoupon from "./pages/MyAccount/UserCoupon";
import UserCreditCard from "./pages/MyAccount/UserCreditCard";
import Product from "./pages/Product";
import Footer from "./components/Footer";
import ProductComment from "../src/pages/Productcomment";
import Admin from "./pages/Admin/";
import Login from "./pages/Auth/Login";
import Reset from "./pages/Auth/Reset";
import Register from "./pages/Auth/Register";
import ShoppingCart from "./pages/shoppingcart"
import CheckOut from "./pages/Checkout"
// import Reset from "./pages/Auth/components/Reset";
function App() {
  // 全域狀態
  // -------- 判斷登入與否 --------
  const [isLogin, setIsLogin] = useState(false);

  // 商品細節頁 Modal 判斷有沒有點就讓導覽列消失
  const [isModalTouch , setisModalTouch] = useState(true)
  // 結帳所需 data 
  const [checkoutData, setCheckoutData] = useState({
    //!整合須改為目前登入者 id
    userId: 1,
    storeId: "",
    paymentMethod: "1",
  });
  return (
    <Router>
      {isModalTouch && <Navbar auth={isLogin} />}
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/auth" element={<Auth />} auth={isLogin}>
          <Route path="login" element={<Login />} auth={isLogin}></Route>
          <Route path="register" element={<Register />}></Route>
          <Route path="reset" element={<Reset />}></Route>
        </Route>
        <Route path="/admin" element={<Admin />}></Route>
        <Route path="/stores" element={<StoreList />}>
          <Route path=":currentPage" element={<StoreList />}></Route>
          <Route path="all/:storeId" element={<Product />}></Route>
        </Route>
        {/* 店家商品頁，店家點進來顯示店家所賣商品 */}
        <Route
          path="/store/:storeId/"
          element={<Product setisModalTouch={setisModalTouch} />}
        >
          <Route path=":currentPage" element={<Product />} />
        </Route>

        <Route
          path="/productcomment/:storeId"
          element={<ProductComment />}
        ></Route>
        <Route
          path="/shoppingcart"
          element={
            <ShoppingCart
              setCheckoutData={setCheckoutData}
              checkoutData={checkoutData}
            />
          }
        ></Route>
        <Route
          path="/checkout"
          element={<CheckOut checkoutData={checkoutData} />}
        ></Route>

        <Route path="/map" element={<Map />}></Route>
        <Route path="/my_account/like-list" element={<UserLikeList />}></Route>
        <Route path="/my_account/order" element={<UserOrderList />}></Route>
        <Route path="/my_account/coupon" element={<UserCoupon />}></Route>
        <Route path="/my_account/payment" element={<UserCreditCard />}></Route>
        <Route path="/my_account" element={<MyAccount />}></Route>
      </Routes>

      {/* <StoreList />
      <StoreCheck />

      <Product /> */}
      {/* <Footer /> */}
    </Router>
  );
}

export default App;
