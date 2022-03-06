import React, { useState } from "react";
import { GoLocation } from "react-icons/go";
import { ReactComponent as Pin } from "../images/pin_map.svg";

const LocationPin = (props) => {
  // console.log("LocationPin裡面", props.storeId);
  const { text } = props;

  return (
    <div className="pin d-flex flex-column align-items-center">
      <p className="pin-text d-flex flex-column align-items-center">
        <div className="title pt-2">{props.name}</div>
        <div className="time pt-2">10:00 - 18:00</div>
        <div className="product-left mt-2">剩餘:2</div>
      </p>
      <GoLocation
        className="pin-icon"
        onClick={() => {
          props.setClickStoreId(props.storeId);
        }}
      />
    </div>
  );
};

export default LocationPin;
