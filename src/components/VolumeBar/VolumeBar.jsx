import React from "react";
import "./VolumeBar.css";

import { MdVolumeDownAlt, MdVolumeMute } from "react-icons/md";

export const VolumeBar = ({ onChange, referance }) => {
  return (
    <div className="volumeBar">
      <MdVolumeDownAlt size={25} />
      <input
        ref={referance}
        type="range"
        max={100}
        step="1"
        onChange={onChange}
        min={0}
        defaultValue={80}
        className="volumeBar__range"
      />
      <MdVolumeMute size={25} />
    </div>
  );
};
