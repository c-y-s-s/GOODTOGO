import { useState, useEffect } from "react";
import { useParams ,useNavigate} from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../utils/config";

// -------- 引入元件區塊 --------
import StoreLogo from "./component/StoreLogo";
import StoreDetails from "./component/StoreDetails";
import StoreCanopy from "./component/StoreCanopy";
import Storebutton from "./component/StoreButton";
import StoreCard from "./component/StoreCard";
import StoreProductsCommit from "./component/Productscommit.js";
import ProductsDetails from "./component/ProductsDetails";
// -------- 引入元件區塊結束 --------

const Product = () => {
  //取出網址上的 storeId 這邊的 sroreId 是對應到 app.js 若要更改要同步更改
  const { storeId } = useParams();
  const { currentPage } = useParams();

  const [error, setError] = useState(null);
  //後端資料使用陣列格式，所以這邊給她空陣列
  const [data, setData] = useState([]);
  const [storeData, setStoreData] = useState([]);
  const [productsComment, setproductsComment] = useState([]);
  //總筆數
  const [totalPages, setTotalPages] = useState([]);
  //拿到總共要幾頁
  const [lastPage, SetLastPage] = useState(1);
  const [page, setPage] = useState(parseInt(currentPage, 10) || 1);
  //切換按鈕
  const [buttonToggle, setbutonToggle] = useState("products");
  //切換 className

  //串接後端API
  useEffect(() => {
    let getProducts = async () => {
      // let page = currentPage ? currentPage : 1;
      let productsResponse = await axios.get(`${API_URL}/products/${storeId}`);
      let storeResponse = await axios.get(`${API_URL}/stores/${storeId}`);
      let productsCommentResponse = await axios.get(
        `${API_URL}/productscommit/${storeId}?page=${page}`
      );
      setData(productsResponse.data);
      setStoreData(storeResponse.data);
      setproductsComment(productsCommentResponse.data.data);
      setTotalPages(productsCommentResponse.data.pagination.total);
      SetLastPage(productsCommentResponse.data.pagination.lastPage);
    };
    getProducts();
  }, [page]);


  let navigate = useNavigate();
  //頁碼
  const getPages = () => {
    let pages = [];
    for (let i = 1; i <= lastPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={(e) => {
            setPage(i);
            navigate(`/store/1/page=${i}`)
          }}
        >
          {i}
        </button>
      );
    }
    return pages;
  };
  //計算商家平均評價
  function storeStarTotal() {
    let StarTotal = 0;
    productsComment.map((item) => {
      StarTotal += item.star;
    });
    return (StarTotal = (StarTotal / productsComment.length).toFixed(1));
  }
  storeStarTotal();

  // 遮雨棚參數
  const canopyTotal = Array.from({ length: 30 });

  // -------- ID區塊先用來避免產生錯誤之後會修改 -------
  let storeDataID = 1;
  // -------- ID 結束 --------

  return (
    <div>
      {/* -------- 商家Logo、詳細資訊區塊 -------- */}
      {storeData.map((item) => {
        {
          storeDataID++;
        }
        return (
          <div key={storeDataID}>
            <StoreLogo logo={item.logo} />
            <StoreDetails item={item} storeStarTotal={storeStarTotal()} />
          </div>
        );
      })}
      {/* -------- 商家Logo、詳細資訊區塊結束 -------- */}

      {/* -------- 綠色裝飾橫條小條  --------*/}
      <div className="container-fluid p-0 horizontalBar">
        <div></div>
      </div>

      <div className="container">
        {/*-------- 遮雨棚區塊 --------*/}
        {/* <StoreCanopy canopy={canopyTotal} /> */}
        {/* -------- 餐點、評論按鈕 --------*/}
        <Storebutton storeId={storeId} setbutonToggle={setbutonToggle} />
      </div>

      {/* ------- 商品資訊 --------*/}
      {buttonToggle === "products" ? (
        <StoreCard data={data} />
      ) : (
        <StoreProductsCommit
          productsComment={productsComment}
          totalPages={totalPages}
          getPages={getPages()}
        />
      )}

      {/* -------- 商店總評論 -------- */}
      {/* <StoreProductsCommit /> */}

      {/* 商品詳細資料 */}
      {/* <ProductsDetails /> */}

      {/* 商品詳細資料結束 */}
      {/* -------- 綠色裝飾橫條大條 --------*/}
      <div className="container-fluid p-0  horizontalBarBottom">
        <div></div>
      </div>
    </div>
  );
};
export default Product;
