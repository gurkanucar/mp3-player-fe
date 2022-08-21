import React from "react";

export const MusicListItem = ({ item, setSelectedMusic }) => {
  return <div onClick={() => setSelectedMusic(item.id)}>{item.name}</div>;
};
