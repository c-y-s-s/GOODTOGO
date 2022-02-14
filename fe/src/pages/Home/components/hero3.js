import React from "react";

// -------- 圖檔 --------
import Hero3Food from "../images/hero3Food.png";
import { ReactComponent as Hero3Text } from "../images/hero3Text.svg";
import { ReactComponent as Hero3Text1 } from "../images/hero3Text-1.svg";
import { ReactComponent as Hero3Text3 } from "../images/hero3Text-3.svg";
import { ReactComponent as Hero3Tower } from "../images/hero3Tower.svg";
import { ReactComponent as Hero3Earth } from "../images/hero3Earth.svg";
// import { ReactComponent as WaveB } from "../images/waveB.svg";
// import { ReactComponent as Wave } from "../images/wave.svg";

const hero3 = () => {
  return (
    <div className="hero3">
      <div className="d-flex justify-content-between">
        <div className="hero3-info hero-text-sm">
          <Hero3Text className="hero3Text" />
          <br />
          台灣一天丟棄的廚餘量，可以堆 100 棟 101 大樓
          <br />
          依環保署統計，平均每人每年生產 150 公斤的廚餘
          <br />
          比中國大陸、日本、韓國平均多 20 ％
        </div>
        <img src={Hero3Food} alt="food" />
      </div>
      <Hero3Text1 className="mb-5 " />
      <div className="hero-text-sm text-light">
        全球每年浪費近 10 億噸食物，大量的食物廢棄物掩埋
        <br />
        造成全球約 10 ％ 的排放量，成為溫室氣體的主要來源
      </div>
      <div className="container-fluid wave-bg p-0">
        {/* <div className="wave">
        <div className="waveA" />
        <div className="waveA" />
        <div className="waveA" />
        <WaveB className="waveB" />
      </div> */}
        <Hero3Tower className="hero3Tower" />

        <div className="d-flex hero3-info-3">
          <div className="col-lg-1"></div>
          <div className="col-lg-5">
            <Hero3Earth className="" />
          </div>
          <div className="col-lg-5">
            <Hero3Text3 className="mt-5 hero-text-sm" />
            <p className="hero-text-sm mt-5 text-light text-center">
              減少食物浪費，是減少人類對環境影響最簡單的方法之一
              <br />
              從源頭開始，珍惜食物，你的每一個決定都可以帶來改變
              <br />
              讓我們一起拯救剩食，到零剩食！
            </p>
          </div>
          <div className="col-lg-1"></div>
        </div>
      </div>
    </div>
  );
};
