import React from "react";

//引用元件
import Slider from "./components/Slider";
import Recommodation from "./components/Recommondation";
import StoreInfoList from "./components/StoreInfoList";

const StoryList = () => {
  return (
    <>
      <div className="container-fluid p-0">
        <Slider />
        <Recommodation />
        <StoreInfoList />
      </div>
    </>
  );
};

export default StoryList;
