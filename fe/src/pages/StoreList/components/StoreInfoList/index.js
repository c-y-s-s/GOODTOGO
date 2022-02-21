import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
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

const StoreInfoList = () => {
  // -------- 篩選處理 --------
  //商家列表
  const [storeList, setStoreList] = useState([]);
  //處理後要顯示的列表
  const [displayList, setDisplayList] = useState([]);
  //類別篩選
  const [category, setCategory] = useState([]);
  const [selectedCat, setSelectedCat] = useState("");
  //關鍵字搜尋
  const [searchWord, setSearchWord] = useState("");
  //排序
  // -------- 分頁處理 --------
  //總共有lastPage這個麽多頁
  const [lastPage, setLastPage] = useState(1);

  //取出網址上的 currentPage 這邊的 currentPage是對應到 app.js -> :currentPage 若要更改要同步更改
  const { currentPage } = useParams();

  // const [page, setPage] = useState("");
  //TODO: 怎麼設定當前頁面顯示
  const [isActive, setIsActive] = useState("");
  let page = parseInt(currentPage, 10) || 1;
  console.log("currentPage", currentPage, page);

  //後端api傳資料
  useEffect(() => {
    let getStore = async () => {
      let storeRes = await axios.get(`${API_URL}/stores?page=${page}`);
      let stores = storeRes.data[0];
      let rawStore = storeRes.data[1];
      let category = storeRes.data[2];
      let pagination = storeRes.data[3];
      setCategory(category);
      setStoreList(stores);
      setLastPage(pagination.lastPage);
      setDisplayList(stores);
      console.log("pagination", pagination);
      console.log("storeRes", storeRes);
    };
    getStore();
  }, [page]);

  const getPages = () => {
    let pages = [];
    for (let i = 1; i <= lastPage; i++) {
      pages.push(
        <Link to={`${i}`}>
          <li className="page-li">
            <button
              className={isActive ? "page-links btn active" : "page-links btn"}
              key={i}
            >
              {i}
            </button>
          </li>
        </Link>
      );
    }
    return pages;
  };

  //處理搜尋欄位
  const handleSearch = (storeList, searchWord) => {
    let newList = [...storeList];

    if (searchWord.length) {
      newList = storeList.filter((storeList) => {
        return storeList.name.includes(searchWord);
      });
    }

    return newList;
  };

  //當function-box資料有更動時
  useEffect(() => {
    let newList = [];

    newList = handleSearch(storeList, searchWord);
    setDisplayList(newList);
  }, [searchWord, storeList]);

  return (
    <div className="store-list d-grid">
      <div className="prefix"></div>
      <div className="header"></div>
      {/* 標題 */}
      <div className="title align-self-end text-center">
        <div className="title-box mb-2">
          <Star />
          <span className="ps-3 pe-3 text-dark-grey input-label-title">
            探索美食{" "}
          </span>
          <Star />
        </div>
      </div>
      {/* 商家列表處理區 */}
      <div className="function-box">
        <SearchBar searchWord={searchWord} setSearchWord={setSearchWord} />
        <div className="col-lg-4 justify-content-between d-flex">
          <FilterBar
            category={category}
            selectedCat={selectedCat}
            setSelectedCat={setSelectedCat}
            searchWord={searchWord}
            setSearchWord={setSearchWord}
          />
        </div>
        <Rating />
      </div>
      {/* 商家列表顯示區 */}
      <div className="store-info-list">
        <StoreInfoCard storeList={displayList} />
      </div>
      <ul className="pages p-0 align-items-center d-flex">
        <Link to={`${page - 1}`} className="page-arrow">
          <IoIosArrowBack />
        </Link>
        {getPages()}
        <Link to={`${page + 1}`} className="page-arrow">
          <IoIosArrowForward />
        </Link>
      </ul>
      <div className="footer"></div>
      <div className="footer-fix"></div>
    </div>
  );
};

export default StoreInfoList;
