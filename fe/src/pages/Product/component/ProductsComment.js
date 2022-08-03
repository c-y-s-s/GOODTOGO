import React from "react";
import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {UseProductsCommentPageDate,UseProductsCommentTotalData} from '../Hooks/Usedata'
import Loading from "./Loading"
import SortButton from "./SortButton";
import ProductsCommentInformation from "./ProductsCommentInformation";
import Pages from "./Pages";
// -------- uuid --------
import { v4 as uuidv4 } from "uuid";
// -------- 商品評論 --------
const StoreProductsComment = () => {
  const { storeId } = useParams();
  const { currentPage } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(parseInt(currentPage, 10) || parseInt(1));

  // 評分留言切換開關
  const [productsCommitStarSortSwitch, setproductsCommitStarSortSwitch] =
    useState("");
  // 時間排序切換開關
  const [productsCommitTimeSortSwitch, setproductsCommitTimeSortSwitch] =
    useState("");

  // api 總筆數 、 總頁數
  const { totalPage, lastPage } = UseProductsCommentPageDate(
    "productscommit",
    storeId,
    page
  );
  // api 指定商家 ID 評論跟排序條件評論
  const productsComment = UseProductsCommentTotalData(
    "productscommit",
    storeId,
    page,
    setIsLoading,
    productsCommitStarSortSwitch,
    productsCommitTimeSortSwitch
  );

  // sort 開關切換
  function handleSort(condition){
    if(condition === 'time'){
    setproductsCommitTimeSortSwitch(!productsCommitTimeSortSwitch);
    setproductsCommitStarSortSwitch("");
    }else if(condition === 'star'){
   setproductsCommitStarSortSwitch(!productsCommitStarSortSwitch);
    setproductsCommitTimeSortSwitch("");
    }
  }

  // 計算頁碼
  let navigate = useNavigate();

  let pages = [];
  for (let i = 1; i <= lastPage; i++) {
    pages.push(
      <a
        href="#mark-1"
        className={`pages ${page === i ? "active" : ""}`}
        key={uuidv4()}
        onClick={(e) => {
          setPage(i);
          navigate(`/store/1/${i}`);
        }}
      >
        {i}
      </a>
    );
  }

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="container products-comment">
          <SortButton handleSort={handleSort} totalPage={totalPage} />
          {productsComment.map((item) => {
            return <ProductsCommentInformation item={item} />;
          })}
          {/* 分頁 */}
          <Pages
            page={page}
            pages={pages}
            lastPage={lastPage}
            setPage={setPage}
          />
        </div>
      )}
    </div>
  );
};

export default StoreProductsComment;
