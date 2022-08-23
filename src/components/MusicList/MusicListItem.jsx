import React from "react";

import "./MusicList.css";

export const MusicListItem = ({ item, setSelectedMusic }) => {
  return (
    <div className="music_item" onClick={() => setSelectedMusic(item)}>
      {item.name}
    </div>
  );
};
