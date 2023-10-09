import React, { useRef } from "react";
import "./line.scss";
import Caret from "../caret/caret";

const Line = () => {
  return (
    <div className="constant-text">
      <span style={{ display: "inline" }} id="linehead">
        <span style={{ color: "red" }}>root@mykali</span>:
        <span style={{ color: "blue" }}>~</span>$ &nbsp;
      </span>
      <div id="liner" className="liner">
        <span id="typer" className="typer"></span>
        <Caret />
      </div>
    </div>
  );
};

export default Line;
