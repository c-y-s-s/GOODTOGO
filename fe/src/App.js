import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthContext } from "./context/auth";
import { API_URL } from "./utils/config";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./styles/index.scss";

// 這邊的資料夾命名方式可以不用指定裡面的 index
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Map from "./pages/Map";
import About from "./pages/About";
import Store from "./pages/Store";
import StoreCheck from "./pages/StoreCheck";
//註冊登入
import Auth from "./pages/Auth";
import Login from "./pages/Auth/Login";
import Reset from "./pages/Auth/Reset";
import Register from "./pages/Auth/Register";

//會員中心
import MyAccount from "./pages/MyAccount";
import UserLikeList from "./pages/MyAccount/UserLikeList";
import UserOrderList from "./pages/MyAccount/UserOrderList";
import UserCoupon from "./pages/MyAccount/UserCoupon";
import UserCreditCard from "./pages/MyAccount/UserCreditCard";
import StoreList from "./pages/StoreList";
import Product from "./pages/Product";
import ProductComment from "../src/pages/Productcomment";
import Admin from "./pages/Admin/";

// import Reset from "./pages/Auth/components/Reset";
function App() {
  // 全域狀態
  
  {/* // -------- 判斷登入與否 member有資料就是已登入 -------- */}
  const [member, setMember] = useState(null);
  
  // 商品細節頁 Modal 判斷有沒有點就讓導覽列消失
  const [isModalTouch , setisModalTouch] = useState(true)

  useEffect(() => {
    // 每次重新整理或開啟頁面時，都去確認一下是否在已經登入的狀態。
    const getMember = async () => {
      try {
        let result = await axios.get(`${API_URL}/checkMember`, {
          withCredentials: true,
        });
        setMember(result.data);
      } catch (e) {}
    };
    getMember();
  }, []);
  console.log("member from App.js", member); //ok
  return (
    <AuthContext.Provider value={{ member, setMember }}>
      <Router>
      {isModalTouch && <Navbar />}
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/auth/*" element={<Auth />}>
            <Route path="login" element={<Login />}></Route>
            <Route path="register" element={<Register />}></Route>
            <Route path="reset" element={<Reset />}></Route>
          </Route>
          <Route path="/admin" element={<Admin />}></Route>
          <Route path="/stores" element={<StoreList />}>
            <Route path=":currentPage" element={<StoreList />} />
            <Route path="search?=" element={<StoreList />}>
              <Route path=":keyword" element={<StoreList />} />
            </Route>
          </Route>
          {/* 店家商品頁，店家點進來顯示店家所賣商品 */}

          <Route
            path="/productcomment/:storeId"
            element={<ProductComment />}
          ></Route>
          <Route path="/map" element={<Map />}></Route>

          <Route
            path="/my_account/like-list"
            element={<UserLikeList />}
          ></Route>
          <Route path="/my_account/order" element={<UserOrderList />}></Route>
          <Route path="/my_account/coupon" element={<UserCoupon />}></Route>
          <Route
            path="/my_account/payment"
            element={<UserCreditCard />}
          ></Route>
          <Route path="/my_account" element={<MyAccount />}></Route>
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
