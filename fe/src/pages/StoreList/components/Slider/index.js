import React, { useState, useEffect } from "react";
// -------- 引用圖檔 --------
import Slider1 from "../../images/Slider1.png";
import Slider2 from "../../images/Slider2.png";
import Slider3 from "../../images/Slider3.png";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { v4 as uuidv4 } from "uuid";

//! 現在的問題是，需要調整wrapper的transform:translateX(-1000px * slideIndex)，每張圖片固定寬為1000px，在瀏覽器上的element裡面調整幻燈片就可以動了

const Slider = () => {
  //把圖片檔案存成陣列
  const displayImage = [Slider1, Slider2, Slider3];
  //
  const [slideIndex, setSlideIndex] = useState(1);

  // 讓幻燈片自動歸零
  useEffect(() => {
    const lastIndex = displayImage.length;
    //如果slideIndex為-1（繼續往左按)，會回到slideIndex=3
    if (slideIndex <= 0) {
      setSlideIndex(lastIndex);
    }
    //如果slideIndex為4以上（繼續往右按)，會回到slideIndex=1
    if (slideIndex > lastIndex) {
      setSlideIndex(1);
    }
  }, [slideIndex, displayImage]);

  //每兩秒自動往右滑
  // useEffect(() => {
  //   let slider = setInterval(() => {
  //     setSlideIndex(slideIndex + 1);
  //   }, 2000);
  //   return () => clearInterval(slider);
  // }, [slideIndex]);

  //移動點點
  const moveDot = (index) => {
    setSlideIndex(index);
  };
  console.log(typeof slideIndex);
  console.log(slideIndex);
  // console.log("圖片的數量", displayImage.length); //長度跟陣列[1]都有值
  // const showSlide = () => {
  //   for (let i = 0; i <= displayImage.length; i++) {
  //     return (
  //       <div key={uuidv4()} index={i}>
  //         <img src={`${displayImage[i]}`} alt="" />
  //       </div>
  //     );
  //   }
  // };

  return (
    <>
      <div className="slider d-grid">
        <div className="slider-box text-center">
          <div className="wrapper d-flex">
            {/* {showSlide()} */}
            {displayImage.map((img, i) => {
              return (
                <div key={uuidv4()} index={i}>
                  <img src={`${img}`} alt="" />
                </div>
              );
            })}
          </div>
        </div>
        <div className="slider-point list-unstyled">
          <li> </li>
          <li> </li>
          <li> </li>
        </div>
        <div className="controller">
          {/* <BtnSlider moveSlide={prevSlide} direction={"next"} /> */}
          <button className="btn arrow-bg text-center p-0 m-0">
            <IoIosArrowBack
              className="arrow-btn pe-1"
              onClick={() => setSlideIndex(slideIndex - 1)}
            />
          </button>
        </div>
        <div className="controller">
          {/* <BtnSlider moveSlide={nextSlide} direction={"prev"} /> */}
          <button className="btn arrow-bg text-center p-0 m-0">
            <IoIosArrowForward
              className="arrow-btn ps-1"
              onClick={() => setSlideIndex(slideIndex + 1)}
            />
          </button>
        </div>
      </div>
    </>
  );
};

export default Slider;
