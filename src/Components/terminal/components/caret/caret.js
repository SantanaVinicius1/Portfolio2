import React, { useRef } from "react";
import "./caret.scss";

const Caret = () => {
  const moveIt = (count, e) => {
    var cursor = document.getElementById("cursor");
    e = e || window.event;
    var keycode = e.keyCode || e.which;
    if (cursor) {
      if (
        keycode == 37 &&
        parseInt(cursor.style.left) >= 0 - (count - 1) * 10
      ) {
        cursor.style.left = parseInt(cursor.style.left) - 10 + "px";
      } else if (keycode == 39 && parseInt(cursor.style.left) + 10 <= 0) {
        cursor.style.left = parseInt(cursor.style.left) + 10 + "px";
      }
    }
  };
  return (
    <span className="cursor blink" id="cursor">
      █
    </span>
  );
};

export default Caret;
