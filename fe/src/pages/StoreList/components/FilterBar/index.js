import React from "react";

const FilterBar = (props) => {
  const {
    category,
    selectedCat,
    setSelectedCat,
    setOpState,
    opState,
    setCategorySwitch,
    setOpSwitch,
    setKeyword,
  } = props;
  return (
    <>
      {/* -------- 篩選區域 -------- */}

      {/* 店家類別 */}
      <div className="store-select-outline">
        <select
          name="store-type"
          id="store-type"
          className="store-select"
          value={selectedCat}
          onChange={(e) => {
            setSelectedCat(e.target.value);
            setKeyword("");
            setOpState("");
          }}
        >
          <option value="">店家類別</option>
          {category.map((title) => {
            return (
              <option key={title.id} value={title.category}>
                {title.category}
              </option>
            );
          })}
        </select>
      </div>
      {/* 所有店家 */}
      <div className="store-select-outline">
        <select
          name="op"
          className="store-select"
          value={opState}
          onChange={(e) => {
            setOpState(e.target.value);
            setKeyword("");
            setSelectedCat("");
          }}
        >
          <option value="">所有店家</option>
          <option value="true">營業中</option>
          <option value="false">休息中</option>
        </select>
      </div>
    </>
  );
};

export default FilterBar;
