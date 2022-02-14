import React from "react";

// -------- svg圖檔 --------
import { ReactComponent as Hero2Text } from "../images/hero2Text.svg";
import { ReactComponent as Hero2Trash } from "../images/hero2Trash.svg";

const hero2 = () => {
  return (
    <div className="hero2 d-flex">
      <div className="col-lg-6">
        <Hero2Trash />
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
