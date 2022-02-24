import React from "react";
import { HiOutlineSearch } from "react-icons/hi";

const SearchBar = (props) => {
  const { filterOn, setFilterOn } = props;
  return (
    <div className="search-box col-lg-3 col-sm-12">
      <form method="GET">
        <HiOutlineSearch type="submit" className="ms-2" />
        <input
          name="keyword"
          type="text"
          className="store-search"
          placeholder="熱門搜尋: 麵包"
          // onClick={setFilterOn(true)}
        />
      </form>
    </div>
  );
};

export default SearchBar;
