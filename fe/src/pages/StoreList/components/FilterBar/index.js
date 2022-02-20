import React from "react";

const FilterBar = (props) => {
  const { category, selectedCat, setSelectedCat } = props;
  return (
    <>
      {/* 篩選區域 */}

      <div className="store-select-outline">
        <select className="store-select">
          <option value="">所有店家</option>
        </select>
      </div>
      <div className="store-select-outline">
        <select
          name="store-type"
          id="store-type"
          className="store-select"
          value={selectedCat}
          onChange={(e) => {
            setSelectedCat(e.target.value);
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
      <div className="store-select-outline">
        <select className="store-select">
          <option value="">地區</option>
        </select>
      </div>
    </>
  );
};

export default FilterBar;
