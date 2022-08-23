import React from "react";
import { MusicListItem } from "./MusicListItem";

export const MusicList = ({ musicList, setSelectedMusic }) => {
  return (
    <div className="music_list">
      {musicList.map((x, idx) => (
        <MusicListItem key={idx} item={x} setSelectedMusic={setSelectedMusic} />
      ))}
    </div>
  );
};
