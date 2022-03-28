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
  const {
    setTotalHeart,
    setProductAmount,
    setTotalStar,
    likeList,
    setLikeList,
  } = props;
  //*儲存-顯示的商家列表
  const [storeList, setStoreList] = useState([]);
  //*儲存-全部類別
  const [category, setCategory] = useState([]);
  //*儲存-剩餘餐點數量
  const [amount, setAmount] = useState([]);
  //*儲存-收藏愛心
  const [storeLikeCount, setStoreLikeCount] = useState([]);
  //*儲存-星星
  const [storeStarsCount, setStoreStarsCount] = useState([]);
  //總共幾筆資料
  const [total, setTotal] = useState([]);
  //*搜尋-開關
  const [searchSwitch, setSearchSwitch] = useState(false);
  //搜尋-關鍵字
  const [keyword, setKeyword] = useState("");
  //filter類別-顯示
  const [selectedCat, setSelectedCat] = useState("");
  //*filter營業中-開關
  const [opSwitch, setOpSwitch] = useState(false);
  //filter營業中-顯示
  const [opState, setOpState] = useState("");
  //*Rating排序 - 收藏開關
  const [ratingHeartOn, setRatingHeartOn] = useState("");
  //*Rating排序 - 評論開關
  const [ratingCommentOn, setRatingCommentOn] = useState("");
  const [loading, setLoading] = useState(false);
  const [pageDisplay, setPageDisplay] = useState(true);

  // -------- 分頁處理 --------
  //取出網址上的 currentPage 這邊的 currentPage是對應到 app.js -> :currentPage 若要更改要同步更改
  // const { currentPage } = useParams();
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  useEffect(() => {
    setLoading(true);
    // console.log("page effect", page);
    //*有分頁的全部店家api:  api/stores/
    let getStore = async () => {
      let storeRes = await axios.get(`${API_URL}/stores?page=${page}`);
      let stores = storeRes.data[0];
      let category = storeRes.data[1];
      let pagination = storeRes.data[2];
      let storeLikeCount = storeRes.data[3];
      let productAmount = storeRes.data[4];
      let storeStarsCount = storeRes.data[5];
      setCategory(category);
      setStoreList(stores);
      setLastPage(pagination.lastPage);
      setStoreLikeCount(storeLikeCount);
      setStoreStarsCount(storeStarsCount);
      setTotal(pagination.total);
      setAmount(productAmount);
      //子女元件資料互傳
      setTotalHeart(storeLikeCount);
      setTotalStar(storeStarsCount);
      setProductAmount(productAmount);
      // console.log("愛心", storeLikeCount);
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
    };
    //*排序-營業時間的店家列表api: api/stores/rating/heart
    let getRatingByHeart = async () => {
      let ratingRes = await axios.get(`${API_URL}/stores/rating/heart`);
      console.log("ratingRes", ratingRes);
      setStoreList(ratingRes.data);
      setTotal(ratingRes.data.length);
      setLastPage(1);
    };
    //*排序-營業時間的店家列表api: api/stores/rating/comment
    let getRatingByComment = async () => {
      let ratingRes = await axios.get(`${API_URL}/stores/rating/comment`);
      console.log("ratingRes", ratingRes);
      setStoreList(ratingRes.data);
      setTotal(ratingRes.data.length);
      setLastPage(1);
    };
    //*顯示清單條件
    if (keyword.trim().length > 0 && page === 1) {
      setSearchSwitch(true);
      setRatingHeartOn(false);
      getSearch();
    } else if (selectedCat !== "" && page === 1) {
      setSearchSwitch(false);
      setRatingHeartOn(false);
      getCategoryStore();
      setPage(1);
    } else if (opState !== "") {
      setRatingHeartOn(false);
      setPage(1);
      getOpStateStore();
    } else if (ratingHeartOn === true) {
      setPage(1);
      getRatingByHeart();
    } else if (ratingCommentOn === true) {
      setRatingHeartOn(false);
      setPage(1);
      getRatingByComment();
    } else {
      getStore();
    }
    // 2秒後關起指示器
    setTimeout(() => {
      setLoading(false);
    }, 1500);

    // window.scrollTo(2000, 2000);
  }, [
    page,
    searchSwitch,
    keyword,
    selectedCat,
    opState,
    ratingHeartOn,
    ratingCommentOn,
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

  return (
    <div className="store-list">
      {/* <div className="prefix"></div> */}
      <div className="header"></div>
      <div className="store-list-content col-lg-10 col-9 m-auto">
        {/* 標題 */}
        <div className="title align-self-end text-center col-12  mb-lg-3">
          <div className="title-box mb-2">
            <Star />
            <span className="ps-3 pe-3 text-dark-grey input-label-title">
              探索美食
            </span>
            <Star />
          </div>
        </div>
        {/* 商家列表處理區 */}
        <div className="function-box d-flex flex-wrap mt-lg-5 col-lg-10 m-auto">
          <SearchBar
            setSearchSwitch={setSearchSwitch}
            keyword={keyword}
            setKeyword={setKeyword}
          />
          <div className="col-lg-3 col-12 justify-content-lg-between d-flex flex-wrap justify-content-evenly mt-3">
            <FilterBar
              setOpSwitch={setOpSwitch}
              category={category}
              selectedCat={selectedCat}
              setSelectedCat={setSelectedCat}
              setOpState={setOpState}
              setKeyword={setKeyword}
              opState={opState}
            />
          </div>
          <Rating
            setRatingHeartOn={setRatingHeartOn}
            setKeyword={setKeyword}
            setOpState={setOpState}
            setSelectedCat={setSelectedCat}
            setRatingCommentOn={setRatingCommentOn}
          />
        </div>
        <div className="total-count col-lg-10 col-12 text-center  mt-lg-5 mb-lg-2 text-lg-end m-auto">
          總共 {total} 筆
        </div>
        {/* 商家列表顯示區 */}

        <div className="store-info-list d-flex flex-wrap justify-content-start m-auto col-12 col-lg-12 mt-lg-5">
          <StoreInfoCard
            storeList={storeList}
            storeLikeCount={storeLikeCount}
            setStoreLikeCount={setStoreLikeCount}
            amount={amount}
            storeStarsCount={storeStarsCount}
            likeList={likeList}
            setLikeList={setLikeList}
            loading={loading}
            total={total}
          />
        </div>
        {lastPage === 1 ? (
          ""
        ) : (
          <ul className="pages p-0 align-items-center d-flex col-12 col-lg-3 justify-content-lg-between justify-content-center m-auto mt-lg-5 mb-lg-2 mt-4">
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
        )}
      </div>
      <div className="footer"></div>
    </div>
  );
};

export default StoreInfoList;
