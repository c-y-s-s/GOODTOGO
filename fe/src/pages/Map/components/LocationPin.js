import React from "react";
import { GoLocation } from "react-icons/go";

const LocationPin = ({ text }) => {
  return (
    <div className="pin">
      <GoLocation className="pin-icon" />
      <p className="pin-text">{text}</p>
    </div>
  );
};

export default LocationPin;
