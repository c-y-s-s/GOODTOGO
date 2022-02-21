import React from "react";
import { HiOutlineSearch } from "react-icons/hi";

const SearchBar = (props) => {
  const { searchWord, setSearchWord } = props;
  return (
    <div className="search-box col-lg-3 col-sm-12">
      <HiOutlineSearch />
      <input
        type="text"
        className="store-search"
        placeholder="熱門搜尋: 麵包"
        value={searchWord}
        onChange={(e) => {
          setSearchWord(e.target.value);
        }}
      />
    </div>
  );
};

export default SearchBar;
