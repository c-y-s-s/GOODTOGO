import React, { useState } from "react";

//引用元件
import Slider from "./components/Slider";
import Recommodation from "./components/Recommondation";
import StoreInfoList from "./components/StoreInfoList";

const StoryList = () => {
  const [totalHeart, setTotalHeart] = useState("");
  const [totalStar, setTotalStar] = useState("");
  const [productAmount, setProductAmount] = useState("");

  return (
    <>
      <div className="container-fluid p-0">
        <Slider />
        <Recommodation
          totalHeart={totalHeart}
          productAmount={productAmount}
          totalStar={totalStar}
        />
        <StoreInfoList
          setTotalHeart={setTotalHeart}
          setTotalStar={setTotalStar}
          setProductAmount={setProductAmount}
        />
      </div>
    </>
  );
};

export default StoryList;
