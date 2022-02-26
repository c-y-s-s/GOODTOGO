import React from 'react'

const CheckModel = ({productValid, productId}) => {
    console.log("bbbbbbbbbbb",parseInt(productValid))
  return (
    <div>               <div className="modal-dialog modal-sm modal-dialog-centered">
    <div className="modal-content">
      <div className="modal-header">
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
        ></button>
      </div>
      <div className="modal-body mx-auto fw-bold">
      {/* 不管item.valid 等於 1 或 0 只會顯示 true 的結果 */}
        {productValid === 1 ? "確定下架商品嗎?" : "確定上架商品嗎?"}
      </div>   
      <div className="modal-footer  mx-auto">
        {/* <button
          type="button"
          className="btn btn-secondary"
          data-bs-dismiss="modal"
        >
          Close
        </button> */}
     
        <button type="button" className="btn btn-danger">
          確定 {productValid} - {productId}
        </button>
      </div>
    </div>
  </div></div>
  )
}

export default CheckModel