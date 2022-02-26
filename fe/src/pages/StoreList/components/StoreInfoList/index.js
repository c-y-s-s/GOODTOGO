import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

//後端套件
import axios from "axios";
import { API_URL } from "../../../../utils/config";
//引用元件
import StoreInfoCard from "./StoreInfoCard";
//篩選功能
import FilterBar from "../FilterBar";
import SearchBar from "../SearchBar";
import Rating from "../Rating";
//引用圖檔
import { ReactComponent as Star } from "../../images/star.svg";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
//uuid
import { v4 as uuidv4 } from "uuid";

const StoreInfoList = () => {
  //有分頁的商家列表
  const [storeList, setStoreList] = useState([]);
  //收藏愛心
  const [storeLikeCount, setStoreLikeCount] = useState([]);
  //處理後要顯示的列表
  const [displayList, setDisplayList] = useState([]);
  //類別篩選
  const [category, setCategory] = useState([]);
  const [selectedCat, setSelectedCat] = useState("");
  //過濾開關
  const [filterOn, setFilterOn] = useState(false);
  //搜尋開關
  const [searchOn, setSearchOn] = useState(false);

  // -------- 分頁處理 --------
  //取出網址上的 currentPage 這邊的 currentPage是對應到 app.js -> :currentPage 若要更改要同步更改
  const { currentPage } = useParams();
  // -------- 搜尋處理 --------
  const { keyword } = useParams();

  const [lastPage, setLastPage] = useState(1);
  let page = parseInt(currentPage, 10) || 1;
  console.log("currentPage", currentPage, page);
  //後端API：有類別＋有分頁的店家資訊 API(差星星跟愛心)
  useEffect(() => {
    let getStore = async () => {
      //有分頁的 API
      let storeRes = await axios.get(`${API_URL}/stores?page=${page}`);
      let stores = storeRes.data[0];
      let category = storeRes.data[1];
      let pagination = storeRes.data[2];
      let storeLikeCount = storeRes.data[3];
      //let storeKeywordRes = await axios.get(`${API_URL}/storeSearch?`);//keyword怎麼寫
      // let storeSearchRes = await axios.get(`${API_URL}/storeSearch`);
      setCategory(category);
      setStoreList(stores);
      setLastPage(pagination.lastPage);
      setDisplayList(stores);
      setStoreLikeCount(storeLikeCount);
      // console.log("storeSearchRes", storeSearchRes.data);
      console.log("storeLikeCount", storeLikeCount);
      // if (searchOn) {
      //   setStoreList(storeSearchRes.data);
      // }
    };
    getStore();

    // window.scrollTo(2000, 2000);
  }, [page]);
  //計算頁面總數量並顯示頁碼，該頁碼
  let navigate = useNavigate();
  const getPages = () => {
    let pages = [];
    for (let i = 1; i <= lastPage; i++) {
      pages.push(
        <li className="page-li" key={uuidv4()}>
          <button
            className={`page-links ${page === i ? "active" : ""} `}
            onClick={() => {
              navigate(`?page=${i}`);
              window.scrollTo(0, 1450);
            }}
          >
            {i}
          </button>
        </li>
      );
    }
    return pages;
  };

  //-------- 處理搜尋欄位 --------
  //取出網址上的 keyword 這邊的 keyword是對應到 app.js -> search=?:keyword 若要更改要同步更改
  //const { keyword } = useParams();

  // const handleSearch = (storeList, searchWord) => {
  //   let newList = [...storeList];

  //   if (searchWord.length) {
  //     newList = storeList.filter((storeList) => {
  //       return storeList.name.includes(searchWord);
  //     });
  //   }

  //   return newList;
  // };

  // //當function-box資料有更動時
  // useEffect(() => {
  //   let newList = [];
  //   newList = handleSearch(storeList, searchWord);
  //   setDisplayList(newList);
  // }, [searchWord, storeList]);
  //過濾開關
  // if ((filterOn = "")) {
  //   setDisplayList(storeList);
  // }else{
  //   setDisplayList()
  // }
  console.log("fliterOn", filterOn);
  console.log("SearchOn", searchOn);

  return (
    <div className="store-list d-grid">
      <div className="prefix"></div>
      <div className="header"></div>
      {/* 標題 */}
      <div className="title align-self-end text-center">
        <div className="title-box mb-2">
          <Star />
          <span className="ps-3 pe-3 text-dark-grey input-label-title">
            探索美食
          </span>
          <Star />
        </div>
      </div>
      {/* 商家列表處理區 */}
      <div className="function-box">
        <SearchBar setSearchOn={setSearchOn} searchOn={searchOn} />
        <div className="col-lg-4 justify-content-between d-flex flex-wrap">
          <FilterBar
            category={category}
            selectedCat={selectedCat}
            setSelectedCat={setSelectedCat}
          />
        </div>
        <Rating />
      </div>
      {/* 商家列表顯示區 */}
      <div className="store-info-list">
        <StoreInfoCard storeList={storeList} storeLikeCount={storeLikeCount} />
      </div>
      <ul className="pages p-0 align-items-center d-flex">
        <IoIosArrowBack
          role="button"
          className={`page-arrow mt-1 ${page === 1 ? "d-none" : ""}`}
          onClick={() => {
            navigate(`${page - 1}`);
          }}
        />

        {getPages()}
        <IoIosArrowForward
          role="button"
          className={`page-arrow mt-1 ${page === lastPage ? "d-none" : ""}`}
          onClick={() => {
            navigate(`${page + 1}`);
          }}
        />
      </ul>
      <div className="footer"></div>
    </div>
  );
};

export default StoreInfoList;
