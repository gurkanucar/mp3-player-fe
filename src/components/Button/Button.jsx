import React from "react";

import "./Button.css";

export const Button = (props) => {
  return (
    <div className="circle_button" onClick={props.onClick}>
      {props.children}
    </div>
  );
};
