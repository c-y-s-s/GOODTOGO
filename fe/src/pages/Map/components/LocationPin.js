import React, { useState } from "react";
import { MdLocationPin } from "react-icons/md";
import { ReactComponent as Pin } from "../images/pin_map.svg";

const LocationPin = (props) => {
  // console.log("LocationPin裡面", props);
  return (
    <div className="pin d-flex flex-column align-items-center">
      <p className="pin-text d-flex flex-column align-items-center">
        <div className="title pt-2">{props.name}</div>
        <div className="time pt-2">
          {props.open_time} - {props.close_time}
        </div>
        <div className="product-left mt-2">剩餘: {props.amount}</div>
      </p>
      <MdLocationPin
        role="button"
        className="pin-icon"
        onClick={() => {
          props.setClickStoreId(props.storeId);
        }}
      />
    </div>
  );
};

export default LocationPin;
