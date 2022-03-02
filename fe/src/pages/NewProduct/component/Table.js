import React, { useState } from "react";
import { NavLink } from "react-router-dom";

import axios from "axios";
import { API_URL } from "../../../utils/config";
import { ERR_MSG } from "../../../utils/error";

const Table = () => {
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
    productName: "",
    productDescription: "",
    amountOfGoods: "",
    commodityPrice: "",
    salesTimeStartmm: "",
    salesTimeStartss: "",
    salesTimeEndmm: "",
    salesTimeEndss: "",
  });
  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };
  // -------- 表單送出 --------
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let response = await axios.post(`${API_URL}/storebg/newproduct`, product);
      console.log(response.data);
    } catch (e) {
      // console.error("錯誤:", e.response.data);
      console.error(ERR_MSG[e.response.data].code);
    }
  };
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
            <div className="row align-items-center">
              <label htmlFor="salesTime" className="form-label fw-bold">
                販售時間
              </label>
              <div className="col">
                <input
                  className="form-control"
                  id="salesTimeStartmm"
                  name="salesTimeStartmm"
                  value={product.salesTimeStartmm}
                  onChange={handleChange}
                  required
                />
              </div>
              ：
              <div className="col">
                <input
                  className="form-control"
                  id="salesTimeStartss"
                  name="salesTimeStartss"
                  value={product.salesTimeStartss}
                  onChange={handleChange}
                  required
                />
              </div>
              ～
              <div className="col">
                <input
                  className="form-control"
                  id="salesTimeEndmm"
                  name="salesTimeEndmm"
                  value={product.salesTimeEndmm}
                  onChange={handleChange}
                  required
                />
              </div>
              ：
              <div className="col">
                <input
                  className="form-control"
                  id="salesTimeEndss"
                  name="salesTimeEndss"
                  value={product.salesTimeEndss}
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
                <img
                  src="https://fakeimg.pl/400x400/"
                  className="rounded"
                  alt="..."
                />
              </div>
              <input
                className="mt-3 form-control"
                type="file"
                id="formFile"
                required
              />
            </div>
          </div>
        </div>
        <div className="row  mt-3">
          <div className="col-3"></div>

          <NavLink type="button" className="col-2 btn btn-lg cancel-bg" to="/storebg">
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
