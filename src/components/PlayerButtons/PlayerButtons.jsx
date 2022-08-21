import React from "react";

import { TbPlayerPlay, TbPlayerStop, TbPlayerPause } from "react-icons/tb";
import { Button } from "../Button/Button";
export const PlayerButtons = (props) => {
  const { playing, onPlayClick, onStopClick, onPauseClick } = props;
  return (
    <>
      {!playing ? (
        <Button
          onClick={() => {
            onPlayClick();
          }}
        >
          <TbPlayerPlay color="black" size={25} />
        </Button>
      ) : (
        <Button
          onClick={() => {
            onPauseClick();
          }}
        >
          <TbPlayerPause color="black" size={25} />
        </Button>
      )}

      <Button
        onClick={() => {
          onStopClick();
        }}
      >
        <TbPlayerStop color="black" size={25} />
      </Button>
    </>
  );
};
