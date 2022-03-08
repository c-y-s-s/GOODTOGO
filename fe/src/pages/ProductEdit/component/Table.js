import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { API_URL, IMAGE_URL, PROFILE_IMAGE_URL } from "../../../utils/config";
import Swal from "sweetalert2";

import axios from "axios";
import { ERR_MSG } from "../../../utils/error";
import moment from "moment";
import "moment/min/locales";
const Table = () => {
  // 抓出目前時間格式
  let timeInsecond = moment().format("YYYY-MM-DD HH:mm:ss");
  const [productsUpdate, setProductsUpdate] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState([]);
  let navigate = useNavigate();

  const { productId } = useParams();
  // 要 post 到後端的物件
  const [product, setProduct] = useState({
    id:"",
    storeId: "1",
    productSelected: "",
    productName: "",
    productImg: "",
    commodityPrice: "",
    amountOfGoods: "",
    productDescription: "",
    salesTimeStart: "",
    salesTimeEnd: "",
    createdAt: timeInsecond,
  });
  console.log(product);
  // input 上傳的圖片物件(二進位檔)
  const [imageSrc, setImageSrc] = useState("");

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
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
    // console.log("/member/profile 上傳圖片檔名 file.name: ", file.name); // e.target.files[0].name
    // console.log("/member/profile 要 setMember 的圖片 file(二進位檔): ", file); // e.target.files[0]
    setProduct({ ...product, [e.target.name]: e.target.files[0] });
  };
  // -------- 表單送出 --------
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let formData = new FormData(); // 物件
      formData.append("id", product.id);
      formData.append("store_id", product.storeId);
      formData.append("category_id", product.productSelected);
      formData.append("name", product.productName);
      formData.append("img", product.productImg ? product.productImg : "");
      formData.append("price", product.commodityPrice);
      formData.append("amount", product.amountOfGoods);
      formData.append("description", product.productDescription);
      formData.append("start_time", product.salesTimeStart);
      formData.append("due_time", product.salesTimeEnd);
      formData.append("created_at", product.createdAt);

      // for (var pair of formData.entries()) {
      //   console.log(pair);
      // }

      let response = await axios.post(
        `${API_URL}/storebgeditproduct/productedit`,
        formData,
        { withCredentials: true }
      );
      console.log("上傳商品資料: ", response.data);
      Swal.fire({
        icon: "success",
        title: "資料修改成功",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (e) {
      // console.error("錯誤:", e.response.data);
      console.error(ERR_MSG[e.response.data].code);
    }
    navigate(`/storebg`);
  };
  // 抓符合網址上 product ID 的 API
  useEffect(() => {
    const getProducts = async () => {
      let result = await axios.get(
        `${API_URL}/products/productsdifferent/${productId}`
      );
      setProductsUpdate(result.data);
      let selectedProductResponse = await axios.get(
        `${API_URL}/selectedProductList`
      );
      let selectedProductListData = selectedProductResponse.data;

      setSelectedProduct(selectedProductListData);

      setProduct({
        ...product,
        id: result.data[0].id,
        productSelected: result.data[0].category_id,
        productName: result.data[0].name,
        productDescription: result.data[0].description,
        amountOfGoods: result.data[0].amount,
        commodityPrice: result.data[0].price,
        productImg: result.data[0].img,
        salesTimeStart: result.data[0].start_time,
        salesTimeEnd: result.data[0].due_time,
        createdAt: result.data[0].created_at,
      });
    };
    getProducts();
  }, []);

  return (
    <div>
      <form className="container">
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
                value={product.productName}
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
                value={product.productDescription}
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
                value={product.amountOfGoods}
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
                  value={product.commodityPrice}
                  onChange={handleChange}
                  required
                />
                <div className="invalid-feedback">請輸入商品價格.</div>
              </div>
            </div>
            <div className="row align-items-center mb-3">
              <label htmlFor="salesTime" className="form-label fw-bold">
                販售時間
              </label>
              <div className="col">
                <input
                  type="time"
                  className="form-control"
                  id="salesTimeStart"
                  name="salesTimeStart"
                  value={product.salesTimeStart}
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
                  value={product.salesTimeEnd}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <select
              className="form-select"
              aria-label="Default select example"
              id="productSelected"
              name="productSelected"
              value={product.productSelected}
              onChange={handleChange}
            >
              <option value="">商品類別</option>
              {selectedProduct.map((index) => {
                return (
                  <option key={index.id} value={index.id}>
                    {index.category}
                  </option>
                );
              })}
            </select>
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
                <img
                  src={
                    imageSrc
                      ? imageSrc
                      : product.productImg
                      ? IMAGE_URL + product.productImg
                      : PROFILE_IMAGE_URL
                  }
                  alt="product img"
                  className="rounded cover-product"
                />
              </div>
              <input
                className="mt-3 form-control"
                type="file"
                id="productImg"
                name="productImg"
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
    </div>
  );
};

export default Table;
