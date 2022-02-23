import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import "./styles/index.scss";

// 這邊的資料夾命名方式可以不用指定裡面的 index
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Map from "./pages/Map";
import About from "./pages/About";
import Store from "./pages/Store";
import StoreBg from "./pages/Storebg";
import NewProduct from "./pages/NewProduct";
import StoreProfileEditing from "./pages/StoreProfileEditing";
import LatestNews from "./pages/LatestNews";
import Activity from "./pages/Activity";
import Checkout from "./pages/Checkout";
import Coupon from "./pages/Coupon";
import StoreList from "./pages/StoreList";
import StoreCheck from "./pages/StoreCheck";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MyAccount from "./pages/MyAccount";
import UserLikeList from "./pages/MyAccount/UserLikeList";
import UserOrderList from "./pages/MyAccount/UserOrderList";
import UserCoupon from "./pages/MyAccount/UserCoupon";
import UserCreditCard from "./pages/MyAccount/UserCreditCard";
import Product from "./pages/Product";
import Footer from "./components/Footer";
import ProductComment from "../src/pages/Productcomment";

function App() {
  const [auth, setAuth] = useState(false);
  // 判斷後台不用頁首頁尾
  const [isAdmin, setIsAdmin] = useState(false);
 
  return (
    <Router>
      <Navbar auth={auth} isAdmin={isAdmin} />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/storebg"  element={<StoreBg setIsAdmin={setIsAdmin}/> }></Route>
        <Route path="/newproduct" element={<NewProduct setIsAdmin={setIsAdmin}/>}></Route>
        <Route
          path="/storeprofileediting"
          element={<StoreProfileEditing setIsAdmin={setIsAdmin}/>}
        ></Route>
        <Route path="/latestnews" element={<LatestNews />}></Route>
        <Route path="/activity" element={<Activity />}></Route>
        <Route path="/checkout" element={<Checkout />}></Route>
        <Route path="/coupon" element={<Coupon />}></Route>
        <Route path="/store" element={<Store />}></Route>
        {/* 店家商品頁，店家點進來顯示店家所賣商品 */}
        <Route path="/store/:storeId" element={<Product />}></Route>
        <Route
          path="/productcomment/:storeId"
          element={<ProductComment />}
        ></Route>
        <Route path="/map" element={<Map />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/my_account/like-list" element={<UserLikeList />}></Route>
        <Route path="/my_account/order" element={<UserOrderList />}></Route>
        <Route path="/my_account/coupon" element={<UserCoupon />}></Route>
        <Route path="/my_account/payment" element={<UserCreditCard />}></Route>
        <Route path="/my_account" element={<MyAccount />}></Route>
      </Routes>

      {/* <StoreList />
      <StoreCheck />

      <Product /> */}
      <Footer isAdmin={isAdmin} />
    </Router>
  );
}

export default App;
