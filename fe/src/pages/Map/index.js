import React, { useEffect, useState } from "react";
import StoreForMap from "./components/StoreForMap";
import Map from "./components/Map";
import { HiOutlineSearch } from "react-icons/hi";
//後端套件
import axios from "axios";
import { API_URL } from "../../utils/config";

const MapPage = () => {
  const [filterOp, setFilterOp] = useState();
  const [category, setCategory] = useState();
  const [filterCategory, setFilterCategory] = useState();
  const [storeLocation, setStoreLocation] = useState();

  const location = {
    address: "320桃園市中壢區新生路二段421號",
    lat: 24.985128,
    lng: 121.221719,
  };
  useEffect(() => {
    let getStores = async () => {
      let storesRes = await axios.get(`${API_URL}/map/info`);
      // let stores = storesRes.data[0];
      // let category = storesRes.data[1];
      // let storeLikeCount = storesRes.data[3];
      // let productAmount = storesRes.data[4];
      // let storeStarsCount = storesRes.data[5];
      // setCategory(category);
      console.log("cat", storesRes.data);
    };
    getStores();
  }, []);

  return (
    <div className="container-fluid map-bg d-flex p-0">
      <div className="map-wrapper col-lg-8">
        <div className="map-search">
          <form
            action=""
            method="get"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <HiOutlineSearch
              type="submit"
              className="ms-3 me-2 map-search-icon"
            />
            <input
              type="text"
              className="col-lg-12 search-bar"
              placeholder="地圖搜尋: 店名"
            />
          </form>
        </div>
        <div className="google-map col-lg-12">
          <Map location={location} zoomLevel={17} />
        </div>
      </div>
      <div className="map-side-bar col-lg-4 text-center d-flex flex-column">
        <div className="map-title">搜尋附近店家</div>
        <div className="col-lg-8 map-filter-bar m-auto align-items-center  d-flex flex-column">
          <select name="" id="" className="col-lg-10">
            <option value="">營業中店家</option>
            <option value="">休息中店家</option>
          </select>
          <select name="" id="" className="col-lg-10">
            <option value="">港式</option>
          </select>
          <div className="map-store-card">
            <StoreForMap />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapPage;
