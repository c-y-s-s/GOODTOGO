import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as Hero1Text } from "./images/hero1Text.svg";
import { ReactComponent as Hero1TextGo } from "./images/hero1TextGo.svg";
import { ReactComponent as Hero1TextArrow } from "./images/hero1TextArrow.svg";
import { ReactComponent as Hero2Text } from "./images/hero2Text.svg";
import { ReactComponent as Hero2Trash } from "./images/hero2Trash.svg";
import { ReactComponent as Hero3Food } from "./images/hero3Food.svg";
import { ReactComponent as Hero3Text } from "./images/hero3Text.svg";
import { ReactComponent as Hero3Tower } from "./images/hero3Tower.svg";
import { ReactComponent as Hero3Earth } from "./images/hero3Earth.svg";
import { ReactComponent as WaveA } from "./images/waveA.svg";
import { ReactComponent as WaveB } from "./images/waveB.svg";
//import { ReactComponent as WaveTest } from "./images/waveTest.svg";
//import { ReactComponent as Hero3Wave } from "./images/hero3Wave.svg";

const Home = () => {
  return (
    <div>
      <div className="hero1">
        <Hero1Text className="hero1Text drop-shadow" />
        <Link to="/store" className="hero-actionBtn">
          <Hero1TextGo className="hero1TextGo drop-shadow " />
          <Hero1TextArrow className="hero1TextArrow drop-shadow " />
        </Link>
        <img
          src={require("./images/hero1.png")}
          alt="hero1"
          className="hero1bg"
        ></img>
      </div>

      <div className="hero2 d-flex">
        <Hero2Trash />
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
          <div className="hero3food" />
        </div>
        <div className="wave">
          <div className="waveA" />
          <div className="waveA" />
          <div className="waveA" />
          {/* <WaveA /> */}
          <WaveB className="waveB" />
        </div>
      </div>
      <div className="hero4"></div>
    </div>
  );
};

export default Home;
