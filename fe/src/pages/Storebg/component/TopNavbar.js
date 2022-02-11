import {React, useState, useEffect} from "react";

// -------- icons 開始 --------
// 放大鏡 icon
import { AiOutlineSearch } from "react-icons/ai";
// 鈴鐺 icon
import { BsBellFill } from "react-icons/bs";
// -------- icons 結束 --------

const TopNavbar = (props) => {
  const { storeData } = props;
  const [storeName, setStoreName] = useState([])
  useEffect(() => {
    const findName = ()=>{
      storeData.map((item, i)=>setStoreName([...storeName, item.name]))
      console.log(storeName);
    }
    findName();
  }, [])
  
  return (
    <>
      <div className="topbar ">
        <div className="product-list">商品清單</div>
        <div className="storeBg-topNavbar-right">
          <div className="search">
            <input type="text" placeholder="Search here" />
            <AiOutlineSearch className="storeBg-topNavbar-aiOutlineSearch me-2 my-2" />
          </div>
          <BsBellFill className="storeBg-topNavbar-bsBellFill" />
          <div className="mx-3 border-start border-2 ps-3">烘焙坊</div>
          {/* <div>烘焙坊</div> */}
          <div className="user">
            <img src={require("../images/img1.jpg")} alt="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default TopNavbar;
