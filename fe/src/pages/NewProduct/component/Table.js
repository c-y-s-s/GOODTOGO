import React from "react";

const Table = () => {
  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="mb-3">
              <label htmlFor="productName" className="form-label">
                商品名稱
              </label>
              <input
                className="form-control"
                id="productName"
                placeholder="請輸入商品名稱"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="productDescription" className="form-label">
                商品描述
              </label>
              <textarea
                className="form-control"
                id="productDescription"
                rows="3"
                placeholder="請輸入商品描述"
              ></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="amountOfGoods" className="form-label">
                商品數量
              </label>
              <input
                className="form-control"
                id="amountOfGoods"
                placeholder="請輸入商品數量"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="commodityPrice" className="form-label">
                商品價格
              </label>
              <div className="input-group has-validation">
                <span className="input-group-text" id="inputGroupPrepend">
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
            <div className="row ">
                <label htmlFor="SalesTime" className="form-label">
                  販售時間
                </label>
              <div className="col">
                <input className="form-control" id="SalesTime" />
              </div>
              ：
              <div className="col">
                <input className="form-control" id="SalesTime" />
              </div>
              <div className="col">
                <input className="form-control" id="SalesTime" />
              </div>
              <div className="col">
                <input className="form-control" id="SalesTime" />
              </div>
            </div>
          </div>
          <div className="col">Column</div>
        </div>
      </div>
    </div>
  );
};

export default Table;
