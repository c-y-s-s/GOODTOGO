import React from "react";

// -------- 圖檔 --------
import Hero3Food from "../images/food.png";
import { ReactComponent as Hero3Text } from "../images/hero3Text.svg";
import { ReactComponent as Hero3Tower } from "../images/hero3Tower.svg";
import { ReactComponent as Hero3Earth } from "../images/hero3Earth.svg";
import { ReactComponent as WaveB } from "../images/waveB.svg";

const hero3 = () => {
  return (
    <div className="hero3">
      <div className="d-flex justify-content-between">
        <div className="hero3Info hero-text-sm">
          <Hero3Text className="hero3Text" />
          <br />
          台灣一天丟棄的廚餘量，可以堆 100 棟 101 大樓
          <br />
          依環保署統計，平均每人每年生產 150 公斤的廚餘
          <br />
          比中國大陸、日本、韓國平均多 20 ％
        </div>
        <img src={Hero3Food} alt="food" />
        {/* <div className="hero3food" /> */}
      </div>

      <div className="wave">
        <div className="waveA" />
        <div className="waveA" />
        <div className="waveA" />
        <WaveB className="waveB" />
      </div>
      <Hero3Tower />
      <Hero3Earth className="hero3Earth" />
    </div>
  );
};

export default hero3;
