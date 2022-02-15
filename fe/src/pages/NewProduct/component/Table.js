import React from "react";

const Table = () => {
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
                placeholder="請輸入商品名稱"
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
                rows="3"
                placeholder="請輸入商品描述"
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
                placeholder="請輸入商品數量"
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
                  aria-describedby="inputGroupPrepend"
                  placeholder="請輸入商品價格"
                  required
                />
                <div className="invalid-feedback">請輸入商品價格.</div>
              </div>
            </div>
            <div className="row align-items-center">
              <label htmlFor="SalesTime" className="form-label fw-bold">
                販售時間
              </label>
              <div className="col">
                <input className="form-control" id="SalesTime" required />
              </div>
              ：
              <div className="col">
                <input className="form-control" id="SalesTime" required />
              </div>
              ～
              <div className="col">
                <input className="form-control" id="SalesTime" required />
              </div>
              ：
              <div className="col">
                <input className="form-control" id="SalesTime" required />
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
          <button type="button" className="col-2 btn btn-light btn-lg ">
            取消
          </button>
          <div className="col-1"></div>
          <div className="col-1"></div>
          <button type="submit" className="col-2 btn btn-warning btn-lg ">
            上架
          </button>
        </div>
      </form>
    </div>
  );
};

export default Table;
