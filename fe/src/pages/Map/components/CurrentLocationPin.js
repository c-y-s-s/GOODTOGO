import React, { useState } from "react";
import { MdLocationPin, MdOutlineEmojiPeople } from "react-icons/md";
import { ReactComponent as Pin } from "../images/pin_map.svg";

const LocationPin = (props) => {
  // console.log("LocationPin裡面", props);
  return (
    <div className="">
      <MdOutlineEmojiPeople role="button" className="pin-icon-user" />
    </div>
  );
};

export default LocationPin;
