import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";

//引用元件
import Slider from "./components/Slider";
import Recommodation from "./components/Recommondation";
import StoreInfoList from "./components/StoreInfoList";

//後端套件
import axios from "axios";
import { API_URL } from "../../utils/config";

const StoryList = () => {
  const { loginMember } = useAuth();
  const [totalHeart, setTotalHeart] = useState("");
  const [totalStar, setTotalStar] = useState("");
  const [productAmount, setProductAmount] = useState("");
  const [likeList, setLikeList] = useState([]);
  //TODO知道目前user的收藏
  useEffect(() => {
    const getLikeList = async () => {
      let likeListRes = await axios.get(
        `${API_URL}/stores/likelist/${loginMember.id}`
      );
      // console.log("likeListRes", likeListRes.data);
      setLikeList(likeListRes.data);
    };
    if (loginMember !== null) {
      getLikeList();
    }
  }, [loginMember]);
  // console.log("likeList", likeList);
  //TODO比對如果收藏列表裡面有這個店的id就呈現實心，無則否
  //TODO 如果空愛心(沒有在收藏列表)onclick就要加入，實心onclick就要移除
  return (
    <>
      <div className="container-fluid p-0">
        <Slider />
        <Recommodation
          totalHeart={totalHeart}
          setTotalHeart={setTotalHeart}
          productAmount={productAmount}
          totalStar={totalStar}
          likeList={likeList}
          setLikeList={setLikeList}
        />
        <StoreInfoList
          setTotalHeart={setTotalHeart}
          setTotalStar={setTotalStar}
          setProductAmount={setProductAmount}
          likeList={likeList}
          setLikeList={setLikeList}
        />
      </div>
    </>
  );
};

export default StoryList;
