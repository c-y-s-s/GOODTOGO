import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { HiOutlineSearch } from "react-icons/hi";
//後端套件
import axios from "axios";
import { API_URL } from "../../../../utils/config";

const SearchBar = (props) => {
  const { setSearchSwitch, keyword, setKeyword } = props;

  return (
    <div className="search-box col-lg-3 col-12 col-md-4 col-sm-5 mt-4 justify-content-evenly">
      <form
        method="get"
        onSubmit={(e) => {
          e.preventDefault();
          console.log("form submit");
          setSearchSwitch(true);
          Navigate(`?page=0&keyword=${keyword}`);
          // window.scrollTo(0, 1500);
        }}
      >
        <HiOutlineSearch type="submit" className="ms-2" />
        <input
          name="keyword"
          type="text"
          className="store-search"
          placeholder="熱門搜尋: 麵包"
          value={keyword}
          onChange={(e) => {
            setKeyword(e.target.value);
          }}
        />
      </form>
    </div>
  );
};

export default SearchBar;
