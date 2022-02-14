import React from "react";

import Hero1 from "./components/hero1";
import Hero2 from "./components/hero2";
import Hero3 from "./components/hero3";
import Hero4 from "./components/hero4";
import Hero5 from "./components/hero5";

const Home = () => {
  return (
    <div className="container-fluid p-0">
<<<<<<< HEAD
      <Hero1 />
      <Hero2 />
      <Hero3 />
      <Hero4 />
      <Hero5 />
=======
      <div className="hero1">
        <div className="row p-0 m-0">
          <div className="container d-flex justify-content-around m-0 p-0">
            <div className="col-lg-1" />
            <div className="col-lg-auto  align-items-center">
              <div className="hero1-btn ">
                <Link to="/store">
                  <Hero1Text />
                  <Hero1TextArrow className="hero1-btn-arrow" />
                </Link>
              </div>
            </div>
            <div className="col-lg-1"></div>
          </div>
        </div>
      </div>
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
          <WaveB className="waveB" />
        </div>
        <Hero3Tower />
        <Hero3Earth className="hero3Earth" />
      </div>
      <div className="hero4 pt-5">
        <div className="container-fluid p-0 m-0 ">
          <div className="row hero4-top justify-content-around ">
            <div className="col-lg-2 p-0 m-0"></div>
            <div className="col-auto hero4-title p-0 m-0 mt-5">
              <Hero4Text className=" mt-5" />
            </div>
            <div className="col-lg-2 p-0 m-0"></div>
          </div>
          <div className="row hero4-bottom justify-content-around pt-5 mt-3">
            <div className="col-lg-1"></div>
            <div className="box"></div>
            <div className="box"></div>
            <div className="box"></div>
            <div className="col-lg-3 hero4-btn-group flex-column d-flex justify-content-evenly align-items-center">
              <Hero4Logo />
              <p className="align-middle m-0">探索您周邊的即期美食</p>

              <div className="btn-box text-center  align-items-center m-0">
                <div className="">
                  立即前往
                  <BiRightArrowAlt />
                </div>
              </div>
              {/* <Link to="" /> */}
            </div>
            <div className="col-lg-1"></div>
          </div>
        </div>
      </div>
      <div className="hero5">
        <div className="container-fluid hero5-bg m-0 p-0"></div>
      </div>
>>>>>>> 53c5f90 (feat - login)
    </div>
  );
};

export default Home;
