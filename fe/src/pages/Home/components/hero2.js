import React from "react";

// -------- svg圖檔 --------
import { ReactComponent as Hero2Text } from "../images/hero2Text.svg";
// import { ReactComponent as Hero2Trash } from "../images/hero2Trash.svg";

const hero2 = () => {
  return (
    <div className="hero2 d-grid">
      <img
        src={require("../images/hero2Trash.png")}
        alt="hero2Trash"
        className="hero2-trash"
      />

      <div className="hero2-info hero-text-sm">
        據聯合國環境署統計
        <br />
        <Hero2Text className="hero2-text" />
        <br />
        全球1/3食物還沒進到胃，就先進了垃圾桶
        <br />
        其中餐廳和商店食物浪費，佔總食物浪費量的17 ％
      </div>
    </div>
  );
};

export default hero2;
