import React from "react";

import "./SeekBar.css";

export const SeekBar = ({ referance, music, onChange, onMouseUp }) => {
  return (
    <div className="seekBar">
      <input
        className="seekBar_range"
        ref={referance}
        type="range"
        min={0}
        max={music.duration}
        onMouseUp={onMouseUp}
        onKeyUp={onMouseUp}
        onPointerUp={onMouseUp}
        onChange={onChange}
        defaultValue={0}
        step="0.25"
      />
    </div>
  );
};
