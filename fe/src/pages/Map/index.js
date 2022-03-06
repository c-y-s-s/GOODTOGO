import React, { useEffect, useState } from "react";
import StoreForMap from "./components/StoreForMap";
import Map from "./components/Map";
import {
  HiOutlineSearch,
  HiOutlineChevronDown,
  HiOutlineChevronUp,
  HiOutlineAdjustments,
} from "react-icons/hi";
import { FaSlidersH } from "react-icons/fa";
//後端套件
import axios from "axios";
import { API_URL } from "../../utils/config";

const MapPage = () => {
  //儲存脞有店家資料
  const [storeList, setStoreList] = useState([]);
  // console.log("storeListO_O",storeList);
  //要顯示到map上的店家
  const [displayStoreList, setDisplayStoreList] = useState([]);
//  console.log("displayStoreListO_O", displayStoreList);
  //儲存所有分類
  const [category, setCategory] = useState();
  //下拉式選單顯示選到的
  const [showCategory, setShowCategory] = useState("全部店家");
 
  const [showIsOpen, setShowIsOpen] = useState("營業中店家");
  //下拉式表單開關
  const [cateListShowSwitch, setcateListShowSwitch] = useState(false);
  const [opListShowSwitch, setOpListShowSwitch] = useState(false);
  //儲存輸入關鍵字
  const [keyword, setKeyword] = useState("");

  const [filterOp, setFilterOp] = useState();
  const [filterCategory, setFilterCategory] = useState();
  const [storeLocation, setStoreLocation] = useState();

  // ! 取得點擊到的storeID
   const [clickStoreId, setClickStoreId] = useState("");
   console.log("yoyoyoyo", clickStoreId);
  // const location = {
  //   address: "320桃園市中壢區新生路二段421號",
  //   lat: 24.985128,
  //   lng: 121.221719,
  // };
  useEffect(() => {
    let getStores = async () => {
      let storesRes = await axios.get(`${API_URL}/map/info`);
      // let stores = storesRes.data[0];
      // let category = storesRes.data[1];
      // let storeLikeCount = storesRes.data[3];
      // let productAmount = storesRes.data[4];
      // let storeStarsCount = storesRes.data[5];
      // setCategory(category);
      // console.log("cat", storesRes.data);
      setStoreList(storesRes.data[0]);
      setDisplayStoreList(storesRes.data[0]);
      setCategory(storesRes.data[1]);
    };
    getStores();
  }, []);
  const handleKeywordChange = (e) => {
    setKeyword(e.target.value);
  };
  // console.log("選到的類別", storeList);
  const showCategoryList = () => {
    // console.log("click");

    // return category.map((c) => <li>{c.category}</li>);
  };
  return (
    <div className="container-fluid map-bg p-0">
      <div className="map-wrapper col-lg-8 col-12">
        <div className="map-search d-flex align-items-center justify-content-between">
          <form
            action=""
            method="get"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <HiOutlineSearch className="ms-lg-3 me-lg-2 ms-1 me-1 map-search-icon" />
            <input
              type="text"
              className="col-lg-12  search-bar"
              placeholder="地圖搜尋: 店名"
              value={keyword}
              // onChange={handleKeywordChange}
            />
          </form>
          <HiOutlineAdjustments className="toggle-controller me-2" />
        </div>
        <div className="google-map col-lg-12">
          <Map
            displayStoreList={displayStoreList}
            zoomLevel={12}
            setClickStoreId={setClickStoreId}
          />
          {/* {console.log("ssss",displayStoreList)} */}
        </div>
      </div>
      <div className="map-side-bar col-lg-4 text-center d-flex flex-column">
        <div className="map-title">搜尋附近店家</div>
        <div className="col-lg-8 map-filter-bar m-auto align-items-center d-flex flex-column">
          <ul
            name=""
            id=""
            className="col-lg-10 list-unstyled map-select-bar"
            onClick={() => {
              setOpListShowSwitch(!opListShowSwitch);
            }}
          >
            <div
              role="button"
              className="me-3 ms-3 d-flex align-items-center justify-content-between"
            >
              {showIsOpen}
              {opListShowSwitch === true ? (
                <HiOutlineChevronUp className="" />
              ) : (
                <HiOutlineChevronDown className="" />
              )}
            </div>
            {opListShowSwitch ? (
              <>
                <li
                  role="button"
                  className="cate-option"
                  onClick={() => {
                    setShowIsOpen("營業中店家");
                  }}
                >
                  營業中店家
                </li>
                <li
                  role="button"
                  className="cate-option"
                  onClick={() => {
                    setShowIsOpen("休息中店家");
                  }}
                >
                  休息中店家
                </li>
              </>
            ) : (
              <>
                <div></div>
              </>
            )}
          </ul>
          {/* <select name="" id="" className="col-lg-10">
            <option value="1">營業中店家</option>
            <option value="0">休息中店家</option>
          </select> */}

          <ul
            name=""
            id=""
            className="col-lg-10 list-unstyled map-select-bar"
            onClick={() => {
              setcateListShowSwitch(!cateListShowSwitch);
            }}
          >
            <div
              role="button"
              className="me-3 ms-3 d-flex align-items-center justify-content-between"
            >
              {showCategory}
              {cateListShowSwitch === true ? (
                <HiOutlineChevronUp className="" />
              ) : (
                <HiOutlineChevronDown className="" />
              )}
            </div>
            {cateListShowSwitch ? (
              category.map((c) => {
                return (
                  <>
                    <li
                      role="button"
                      className="cate-option"
                      onClick={() => {
                        setShowCategory(c.category);
                        setDisplayStoreList(
                          [...storeList].filter((v) => {
                            return c.category === "全部店家"
                              ? v
                              : v.category === c.category;
                          })
                        );
                      }}
                    >
                      {c.category}
                    </li>
                  </>
                );
              })
            ) : (
              <>
                <div></div>
              </>
            )}
          </ul>

          <div className="map-store-card mt-lg-5">
            <StoreForMap clickStoreId={clickStoreId} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapPage;
