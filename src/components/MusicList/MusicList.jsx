import React from "react";
import { MusicListItem } from "./MusicListItem";

export const MusicList = ({ musicList, setSelectedMusic }) => {
  return (
    <div>
      {musicList.map((x, idx) => (
        <MusicListItem key={idx} item={x} setSelectedMusic={setSelectedMusic} />
      ))}
    </div>
  );
};
