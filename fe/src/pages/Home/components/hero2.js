import React from "react";

// -------- svg圖檔 --------
import { ReactComponent as Hero2Text } from "../images/hero2Text.svg";
<<<<<<< HEAD
// import { ReactComponent as Hero2Trash } from "../images/hero2Trash.svg";
=======
import { ReactComponent as Hero2Trash } from "../images/hero2Trash.svg";
>>>>>>> 9520249 (doc - 將首頁模組化)

const hero2 = () => {
  return (
    <div className="hero2 d-flex">
      <div className="col-lg-6">
<<<<<<< HEAD
        <img src={require("../images/hero2Trash.png")} alt="hero2Trash" />
=======
        <Hero2Trash />
>>>>>>> 9520249 (doc - 將首頁模組化)
      </div>
      <div className="col-lg-6">
        <div className="hero2Info hero-text-sm">
          據聯合國環境署統計
          <br />
          <Hero2Text className="hero2Text" />
          <br />
          全球 1/3 食物還沒進到胃，就先進了垃圾桶
          <br />
          其中餐廳和商店食物浪費，佔總食物浪費量的 17 ％
        </div>
      </div>
    </div>
  );
};

export default hero2;
