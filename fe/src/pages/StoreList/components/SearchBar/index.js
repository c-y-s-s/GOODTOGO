import React, { useState, useEffect } from "react";
import { HiOutlineSearch } from "react-icons/hi";
//後端套件
import axios from "axios";
import { API_URL } from "../../../../utils/config";

const SearchBar = (props) => {
  const { setSearchOn } = props;
  const [searchname, setSearchName] = useState();

  useEffect(() => {
    let getRecomm = async () => {
      let recommRes = await axios.get(`${API_URL}/storeRecommRouter`);
      let recommStores = recommRes.data[0];
    };
    getRecomm();
  }, []);
  return (
    <div className="search-box col-lg-3 col-12 col-md-4 col-sm-5">
      <HiOutlineSearch type="submit" className="ms-2" />

      <input
        name="keyword"
        type="text"
        className="store-search"
        placeholder="熱門搜尋: 麵包"
        onChange={handleOnChange}
      />
    </div>
  );
};

export default SearchBar;
