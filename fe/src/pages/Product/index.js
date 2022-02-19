import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Product = () => {
  const [error, setError] = useState(null);

  //後端資料使用陣列格式，所以這邊給她空陣列
  const [data, setData] = useState([]);
  const [storeData, setStoreData] = useState([]);

  //取出網址上的 storeId 這邊的 sroreId 是對應到 app.js 若要更改要同步更改
  const { storeId } = useParams();

  useEffect(() => {
    let getProducts = async () => {
      let productsResponse = await axios.get(
        `http://localhost:3001/api/products/${storeId}`
      );
      let storeResponse = await axios.get(
        `http://localhost:3001/api/stores/${storeId}`
      );
      // console.log("productsData", productsResponse.data);
      // console.log("setStoreData", storeResponse.data);
      setData(productsResponse.data);
      setStoreData(storeResponse.data);
    };
    getProducts();
  }, []);

  const canopyTotal = Array.from({ length: 30 });

  return (
    <div>
      {storeData.map((item) => {
        return (
          <div>
            <div class="container-fluid p-0">
              <div class="storeLogo">
                <img
                  class="w-100 storeLogoImg"
                  src={require(`../../images/store_img/${item.logo}`)}
                  alt=""
                />
              </div>
            </div>
            <div class="container store-data">
              <div class="d-flex">
                <div class="storeDataLeft">
                  <h1>{item.name}</h1>
                  <div class="d-flex">
                    <p>分類</p>
                    <p>星星</p>
                    <p>愛心</p>
                  </div>
                  <p>{item.address}</p>
                  <div>
                    <p>營業日</p>
                    <p>顯示營業中非營業中</p>
                  </div>
                  <p>{item.tel_no}</p>
                  <p>店家介紹 : Lorem ipsum, dolor sit amet consectetur</p>
                </div>
                <div class="store-map">
                  <p class="">google地圖</p>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      <div className="container-fluid p-0 horizontalBar">
        <div></div>
      </div>

      <div className="container canopy">
        <ul class="d-flex">
          {canopyTotal.map((item) => {
            return <li></li>;
          })}
        </ul>
      </div>
    </div>
  );
};

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

{
  /* <div>
            <ul class=" ms-5 list-unstyled">
              <li>name : {item.name}</li>
              <li>
                <img
                  src={require(`../../images/products_img/${item.img}`)}
                  alt=""
                />
              </li>
              <li>price : {item.price}</li>
              <li>amount : {item.amount}</li>
              <li>description: {item.description}</li>
              <li>start_time: {item.start_time}</li>
              <li>due_time: {item.due_time}</li>
              <li>created_at: {item.created_at}</li>
            </ul>
          </div> */
}
