import React from "react";

// -------- 圖檔 --------
import Hero3Food from "../images/hero3Food.png";
import { ReactComponent as Hero3Text } from "../images/hero3Text.svg";
import { ReactComponent as Hero3Text1_1 } from "../images/hero3Text1-1.svg";
import { ReactComponent as Hero3Text1_2 } from "../images/hero3Text1-2.svg";
import { ReactComponent as Hero3Text3 } from "../images/hero3Text-3.svg";
import { ReactComponent as Hero3Tower } from "../images/hero3Tower.svg";
import { ReactComponent as Hero3Earth } from "../images/hero3Earth.svg";

const hero3 = () => {
  return (
    <div className="hero3">
      <img src={Hero3Food} alt="food" className="pizza" />
      <div className="hero3-info-1 text-center m-auto">
        <Hero3Text className="hero3-info-1-text" />
        <div className="hero3-info-1-p">
          台灣一天丟棄的廚餘量，可以堆 100 棟 101 大樓
          <br />
          依環保署統計，平均每人每年生產 150 公斤的廚餘
          <br />
          比中國大陸、日本、韓國平均多 20 ％
        </div>
      </div>
      <div className="wave-bg"></div>
      <div className="bg-sm-fix"></div>
      <Hero3Tower
        className="hero3-tower"
        // viewBox="0 0 1500 1000"
        width="100vw"
        height="fit-content"
        preserveAspectRatio="xMinYMin meet"
      />
      <div className="hero3-info-2 text-center m-auto">
        <div className="hero3-info-2-text d-flex justify-content-center">
          <Hero3Text1_1 className="text-1" />
          <Hero3Text1_2 className="text-2" />
        </div>
        <div className="hero3-info-2-p">
          全球每年浪費近 10 億噸食物，
          <br />
          大量的食物廢棄物掩埋
          <br />
          造成全球約 10 ％ 的排放量， <br />
          成為溫室氣體的主要來源
        </div>
      </div>
      <div className="hero3-last d-flex justify-content-lg-evenly justify-content-center flex-wrap">
        <Hero3Earth className="hero3-earth" />
        <div className="hero3-info-3 text-center">
          <Hero3Text3 className="hero3-text" />
          <div className="hero3-info-3-p">
            減少食物浪費，是減少人類對環境影響最簡單的方法之一
            <br />
            從源頭開始，珍惜食物，你的每一個決定都可以帶來改變
            <br />
            讓我們一起拯救剩食，到零剩食！
          </div>
        </div>
      </div>
    </div>
  );
};
export default hero3;
