import React, { useState ,useEffect} from "react";
import { useParams, useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { API_URL, IMAGE_URL, PROFILE_IMAGE_URL } from "../../../utils/config";

import axios from "axios";
import { ERR_MSG } from "../../../utils/error";
import moment from "moment";
import "moment/min/locales";
const Table = () => {
// 抓出目前時間格式
let timeInsecond = moment().format("YYYY-MM-DD HH:mm:ss");
   const [productsUpdate,setProductsUpdate] = useState([])
   console.log(productsUpdate)
   const { productId } = useParams();
  //預設個欄位的值為空（開發中所以有先給值）
  const [product, setProduct] = useState({
    // productName: "奶茶",
    // productDescription: "測試用商品描述",
    // amountOfGoods: "10",
    // commodityPrice: "100",
    // salesTimeStartmm: "10",
    // salesTimeStartss: "10",
    // salesTimeEndmm: "10",
    // salesTimeEndss: "10",
    storeId:"1",
    productName: "",
    productDescription: "",
    amountOfGoods: "",
    commodityPrice: "",
    img: "",
    salesTimeStart: "",
    salesTimeEnd: "",
    createdAt:timeInsecond
  });


  // input 上傳的圖片物件(二進位檔)
  const [imageSrc, setImageSrc] = useState("");

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };
  // -------- 表單送出 --------
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let response = await axios.post(`${API_URL}/storebgaddproduct/newproduct`, product);
      console.log(response.data);
    } catch (e) {
      // console.error("錯誤:", e.response.data);
      console.error(ERR_MSG[e.response.data].code);
    }
  };

  // -------- 使用者預覽上傳圖片 --------
  const handleOnPreview = (e) => {
    const file = e.target.files[0]; // 抓取上傳的圖片
    const reader = new FileReader(); // 讀取 input type="file" 的 file
    reader.addEventListener(
      "load",
      function () {
        // convert image file to base64 string
        setImageSrc(reader.result);
      },
      false // false -> e.preventDefault() 阻擋預設行為
    );

    if (file) {
      reader.readAsDataURL(file);
      // readAsDataURL 將讀取到的檔案編碼成 Data URL 內嵌網頁裡
    }
    console.log("/member/profile 上傳圖片檔名 file.name: ", file.name); // e.target.files[0].name
    console.log("/member/profile 要 setMember 的圖片 file(二進位檔): ", file); // e.target.files[0]
    setProduct({ ...product, [e.target.name]: e.target.files[0] });
  };

  // http://localhost:3002/api/products/productsdifferent/1


  
  // 抓符合網址上 product ID 的 API
  useEffect(() => {
    const getProducts = async () => {
        let result = await axios.get(`${API_URL}/products/productsdifferent/${productId}`)
        setProductsUpdate(result.data);
      } ;
    getProducts();
  }, []);
  return (
    <div>
    {productsUpdate.map((item)=>{
    
      return(
        <form className="container" key={item.id}>
        <div className="row">
          <div className="col">
            <div className="mb-3">
              <label htmlFor="productName" className="form-label fw-bold">
                商品名稱
              </label>
              <input
                className="form-control"
                id="productName"
                name="productName"
                placeholder="請輸入商品名稱"
                value={item.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="productDescription"
                className="form-label fw-bold"
              >
                商品描述
              </label>
              <textarea
                className="form-control"
                id="productDescription"
                name="productDescription"
                rows="3"
                placeholder="請輸入商品描述"
                value={item.description}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="amountOfGoods" className="form-label fw-bold">
                商品數量
              </label>
              <input
                className="form-control"
                id="amountOfGoods"
                name="amountOfGoods"
                placeholder="請輸入商品數量"
                value={item.amount}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="commodityPrice" className="form-label fw-bold">
                商品價格
              </label>
              <div className="input-group has-validation">
                <span
                  className="input-group-text newproduct-data-modal-green"
                  id="inputGroupPrepend"
                >
                  NT$
                </span>
                <input
                  type="text"
                  className="form-control"
                  id="commodityPrice"
                  name="commodityPrice"
                  aria-describedby="inputGroupPrepend"
                  placeholder="請輸入商品價格"
                  value={item.price}
                  onChange={handleChange}
                  required
                />
                <div className="invalid-feedback">請輸入商品價格.</div>
              </div>
            </div>
            <div className="row align-items-center">
              <label htmlFor="salesTime" className="form-label fw-bold">
                販售時間
              </label>
              <div className="col">
                <input
                type="time"
                  className="form-control"
                  id="salesTimeStart"
                  name="salesTimeStart"
                  value={item.start_time}
                  onChange={handleChange}
                  required
                />
        </div>
              <div className="col">
                <input
                  type="time"
                  className="form-control"
                  id="salesTimeEnd"
                  name="salesTimeEnd"
                  value={item.due_time}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>
          <div className="col d-flex justify-content-center">
            <div className="mb-3">
              <label
                htmlFor="formFile"
                className="form-label d-flex justify-content-center fw-bold"
              >
                商品圖片
              </label>
              <div className="text-center">
                {/* <img
                  // src="https://fakeimg.pl/400x400/"
                  src={
                    imageSrc
                      ? imageSrc
                      : product.img
                      ? IMAGE_URL + product.img
                      : PROFILE_IMAGE_URL
                  }
                  alt="product img"
                  className="rounded "
                /> */}
                {/* <img
                      className="cover-photo"
                      src={require(`../../../images/products_img/${item.img}`)}
                      alt=""
                    /> */}
                <img
                      className="cover-photo"
                      src={require(`../../../../../be/public/uploads/products/${item.img}`)}
                      alt=""
                    />
              </div>
              <input
                className="mt-3 form-control"
                type="file"
                id="formFile"
                accept=".jpg,.jpeg,.png"
                onChange={handleOnPreview}
              />
            </div>
          </div>
        </div>
        <div className="row  mt-3">
          <div className="col-3"></div>

          <NavLink
            type="button"
            className="col-2 btn btn-lg cancel-bg"
            to="/storebg"
          >
            取消
          </NavLink>

          <div className="col-1"></div>
          <div className="col-1"></div>
          <button
            type="submit"
            className="col-2 btn btn-warning btn-lg "
            onClick={handleSubmit}
          >
            上架
          </button>
        </div>
      </form>
      )

    })}
     
    </div>
  );
};

export default Table;
