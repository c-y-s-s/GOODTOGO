import React, { useState } from "react";
import { GoLocation } from "react-icons/go";
import { ReactComponent as Pin } from "../images/pin_map.svg";

const LocationPin = ({ text }) => {
  return (
    <div className="pin d-flex flex-column align-items-center">
      <p className="pin-text d-flex flex-column align-items-center">
        <div className="title pt-2">鵝媽媽總店</div>
        <div className="time pt-2">10:00 - 18:00</div>
        <div className="product-left mt-2">剩餘:2</div>
      </p>
      <Pin className="pin-icon" />
    </div>
  );
};

export default LocationPin;
