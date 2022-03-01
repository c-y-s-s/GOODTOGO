import React, { Component, useState } from "react";
import GoogleMapReact from "google-map-react";
import "./MapStyle.scss";
import { FiSearch } from "react-icons/fi";
// import Mapfilter from "./Mapfilter.svg";
import "../../styles/index.scss";
// import PlaceDetails from './components/PlaceDetails';

// const AnyReactComponent = ({ text }) => <div>{text}</div>;

// -------- Map功能開始 --------//

const Map = () => {
  //-------- classes管理功能 --------//
  // const classes = [];
  //-------- classes管理功能 --------//

  const coordinates = { lat: 23.5, lng: 121 };
  const [opened, setOpened] = useState("opened");
  const [type, setType] = useState("type1");
  const [where, setWhere] = useState("chung-li");
  const stores = useState("2");
  return (
    <>
      {/* -------- 地圖區塊開始 -------- */}
      <div className="container-fluid">
        <div className="container-fluid mSearchContainer d-lg-none">
          <div className="input-group">
            <label
              className="input-group-text searchIcon"
              htmlFor="searchInput"
            >
              <FiSearch />
            </label>
            <input
              className="searchInput "
              id="searchInput"
              placeholder="地圖搜尋: 關鍵字？"
            />
            <button className="filterBtn"></button>
          </div>
        </div>
        <div className="row gx-0">
          <div className="col-lg-9 gy-0 m-0 p-0 mapContainer">
            <GoogleMapReact
              //最後記得把KEY放進環境變數
              bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_API_KEY }}
              defaultCenter={coordinates}
              center={coordinates}
              defaultZoom={13}
              margin={[0, 0, 0, 0]}
              options={""}
              onChange={""}
              onChildClick={""}
            ></GoogleMapReact>
          </div>
          <div className="col-lg-3 gy-0 m-0 p-0 searchContainer d-none d-lg-block">
            <div className="input-group mt-3 mb-3">
              {/* 搜尋列，暫時先放在這，之後在移到地圖上 */}
              {/* <label className="input-group-text searchIcon" htmlFor="searchInput">
                <Search />
              </label>
              <input className="searchInput" id="searchInput" placeholder="地圖搜尋: 關鍵字？" /> */}
              <div className="d-flex flexwrap">
                <div className="col-10 mb-3 mt-3">搜尋附近店家</div>
                <select
                  class="col-10 form-select"
                  aria-label="Default select example"
                >
                  <option selected></option>
                  <option value="1">安安</option>
                  <option value="2">這裡</option>
                  <option value="3">在幹嘛</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// --------Map元件導出-------- //
export default Map;
