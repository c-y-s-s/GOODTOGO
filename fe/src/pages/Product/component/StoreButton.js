import React from "react";
// -------- 餐點評論切換按鈕 --------

const StoreButton = ({ storeId, setbutonToggle, buttonToggle }) => {
  return (
    <div>
      <div className="product-button text-center" id="mark-1">
        <button
          className={`btn ${buttonToggle === "products" ? "active" : ""}`}
          type="button"
          onClick={() => {
            setbutonToggle("products");
          }}
        >
          餐點
        </button>
        <button
          className={`btn ${buttonToggle === "commit" ? "active" : ""}`}
          type="button"
          onClick={() => {
            setbutonToggle("commit");
          }}
        >
          評論
        </button>
      </div>
    </div>
  );
};

export default StoreButton;
