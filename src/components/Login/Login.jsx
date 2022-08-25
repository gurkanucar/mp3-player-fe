import React from "react";
import "./Login.css";
export const Login = ({value,onChange,onSubmit}) => {
  return (
    <div className="login_root">
      <form className="login_form" onSubmit={onSubmit}>
        <input
          type="text"
          required
          placeholder="room name"
          value={value}
          onChange={onChange}
        />
       
        <input type="submit" value="Login" />
      </form>
    </div>
  );
};
