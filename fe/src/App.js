import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import "./styles/index.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { AuthContext } from "./context/auth";

// 這邊的資料夾命名方式可以不用指定裡面的 index

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Map from "./pages/Map";
import About from "./pages/About";
import Store from "./pages/Store";
import StoreList from "./pages/StoreList";
import Storecheck from "./pages/StoreCheck";
import StoreReset from "./pages/StoreCheck/components/StoreReset";
import StoreLogin from "./pages/StoreLogin";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MyAccount from "./pages/MyAccount";
import Product from "./pages/Product";
import Footer from "./components/Footer";
import ProductComment from "../src/pages/Productcomment";
import Reset from "./pages/Login/components/Reset";

function App() {
  // -------- 判斷登入與否 --------
  const [loginMember, setLoginMember] = useState(null);
  const [loginSeller, setLoginSeller] = useState(null);

  // const [auth, setAuth] = useState(false);

  return (
    <AuthContext.Provider value={{ loginMember, setLoginMember }}>

    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/store" element={<Store />}></Route>
        {/* 店家商品頁，店家點進來顯示店家所賣商品 */}
        <Route path="/store/:storeId" element={<Product />}></Route>
        <Route
          path="/productcomment/:storeId"
          element={<ProductComment />}
        ></Route>
        <Route path="/map" element={<Map />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/reset" element={<Reset />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/my_account" element={<MyAccount />}></Route>
        <Route path="/Storecheck" element={<Storecheck />}></Route>
        <Route path="/storeLogin" element={<StoreLogin />}></Route>
        <Route path="/StoreReset" element={<StoreReset />}></Route>
      </Routes>

      {/* <StoreList />
      <StoreCheck />

      <Product /> */}
      <Footer />
    </Router>
    </AuthContext.Provider>

  );
}

export default App;
