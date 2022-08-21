import React from "react";

import "./SeekBar.css";

export const SeekBar = ({ referance, music, onChange }) => {
  return (
    <div>
      <input
      className="seekBar_range"
        ref={referance}
        type="range"
        min={0}
        max={music.duration}
        onChange={onChange}
        defaultValue={0}
        step="0.25"
      />
    </div>
  );
};
