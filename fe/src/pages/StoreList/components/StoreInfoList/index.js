import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

//後端套件
import axios from "axios";
import { API_URL } from "../../../../utils/config";
//引用元件
import StoreInfoCard from "./StoreInfoCard";
//篩選功能元件
import FilterBar from "../FilterBar";
import SearchBar from "../SearchBar";
import Rating from "../Rating";
//引用圖檔
import { ReactComponent as Star } from "../../images/star.svg";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
//uuid
import { v4 as uuidv4 } from "uuid";

const StoreInfoList = (props) => {
  const { setTotalHeart, setProductAmount } = props;
  //顯示的商家列表
  const [storeList, setStoreList] = useState([]);
  //全部類別
  const [category, setCategory] = useState([]);
  //剩餘餐點數量
  const [amount, setAmount] = useState([]);
  //收藏愛心
  const [storeLikeCount, setStoreLikeCount] = useState([]);
  //總共幾筆資料
  const [total, setTotal] = useState([]);
  //*搜尋-開關
  const [searchSwitch, setSearchSwitch] = useState(false);
  //搜尋-關鍵字
  const [keyword, setKeyword] = useState("");
  //*filter類別-開關
  const [categorySwitch, setCategorySwitch] = useState(false);
  //filter類別-顯示
  const [selectedCat, setSelectedCat] = useState("");
  //*filter營業中-開關
  const [opSwitch, setOpSwitch] = useState(false);
  //filter營業中-顯示
  const [opState, setOpState] = useState("");

  // -------- 分頁處理 --------
  //取出網址上的 currentPage 這邊的 currentPage是對應到 app.js -> :currentPage 若要更改要同步更改
  // const { currentPage } = useParams();
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  useEffect(() => {
    // console.log("page effect", page);
    //*有分頁的全部店家api:  api/stores/
    let getStore = async () => {
      let storeRes = await axios.get(`${API_URL}/stores?page=${page}`);
      let stores = storeRes.data[0];
      let category = storeRes.data[1];
      let pagination = storeRes.data[2];
      let storeLikeCount = storeRes.data[3];
      let productAmount = storeRes.data[4];

      setCategory(category);
      setStoreList(stores);
      setLastPage(pagination.lastPage);
      setStoreLikeCount(storeLikeCount);
      setTotal(pagination.total);
      setAmount(productAmount);
      //子女元件資料互傳
      setTotalHeart(storeLikeCount);
      setProductAmount(productAmount);
    };
    //*搜尋店家列表api:  api/stores/search
    let getSearch = async () => {
      let storeSearchRes = await axios.get(
        `${API_URL}/stores/search?page=${page}&keyword=${keyword.trim()}`
      );
      console.log(storeSearchRes);
      setStoreList(storeSearchRes.data[0]);
      setTotal(storeSearchRes.data[1].total);
      setLastPage(storeSearchRes.data[1].lastPage);
    };
    //*過濾-類別的店家列表api:  api/stores/filter/c
    let getCategoryStore = async () => {
      let categoryStoreRes = await axios.get(
        `${API_URL}/stores/filter/c?page=${page}&category=${selectedCat}`
      );
      setStoreList(categoryStoreRes.data[0]);
      setTotal(categoryStoreRes.data[1].total);
      setLastPage(categoryStoreRes.data[1].lastPage);
      // console.log("categoryStoreRes.data", categoryStoreRes);
    };
    //*過濾-營業時間的店家列表api: api/stores/filter/op
    let getOpStateStore = async () => {
      let opStateRes = await axios.get(
        `${API_URL}/stores/filter/op?page=${page}&op=${opState}`
      );
      // console.log("opStateRes", opStateRes.data);
      setStoreList(opStateRes.data);
      setTotal(opStateRes.data.length);
      setLastPage(1);

      // setTotal(opStateRes.data[1].total);
      // setLastPage(opStateRes.data[1].lastPage);
    };
    //*顯示清單條件
    if (keyword.trim().length > 0 && page === 1) {
      setSearchSwitch(true);
      getSearch();
    } else if (selectedCat !== "" && page === 1) {
      setSearchSwitch(false);
      getCategoryStore();
      setPage(1);
    } else if (opState !== "") {
      setPage(1);
      getOpStateStore();
    } else {
      getStore();
    }
    // window.scrollTo(2000, 2000);
  }, [
    page,
    searchSwitch,
    //opSwitch,
    categorySwitch,
    keyword,
    selectedCat,
    opState,
  ]);

  //*計算頁面總數量並顯示頁碼，該頁碼
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
              // window.scrollTo(0, 1450);
              setPage(i);
            }}
          >
            {i}
          </button>
        </li>
      );
    }
    return pages;
  };
  // console.log("storeLikeCount", storeLikeCount);
  // console.log("searchSwitch", searchSwitch);
  // console.log("selected category", selectedCat);
  // console.log("storeList", storeList);
  // console.log("open hour", opState);
  // console.log("keyword", keyword);
  // console.log("opSwitch", opSwitch);

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
        <SearchBar
          setSearchSwitch={setSearchSwitch}
          keyword={keyword}
          setKeyword={setKeyword}
        />
        <div className="col-lg-3 justify-content-between d-flex flex-wrap">
          <FilterBar
            setOpSwitch={setOpSwitch}
            setCategorySwitch={setCategorySwitch}
            category={category}
            selectedCat={selectedCat}
            setSelectedCat={setSelectedCat}
            setOpState={setOpState}
            setKeyword={setKeyword}
            opState={opState}
          />
        </div>
        <Rating />
      </div>
      <div className="total-count">總共 {total} 筆</div>
      {/* 商家列表顯示區 */}

      <div className="store-info-list">
        <StoreInfoCard
          storeList={storeList}
          storeLikeCount={storeLikeCount}
          amount={amount}
        />
      </div>
      <ul className="pages p-0 align-items-center d-flex">
        <IoIosArrowBack
          role="button"
          className={`page-arrow mt-1 ${page === 1 ? "d-none" : ""}`}
          onClick={() => {
            navigate(`?page=${page - 1}`);
            setPage(page - 1);
          }}
        />
        {getPages()}
        <IoIosArrowForward
          role="button"
          className={`page-arrow mt-1 ${page === lastPage ? "d-none" : ""}`}
          onClick={() => {
            navigate(`?page=${page + 1}`);
            setPage(page + 1);
          }}
        />
      </ul>
      <div className="footer"></div>
    </div>
  );
};

export default StoreInfoList;
