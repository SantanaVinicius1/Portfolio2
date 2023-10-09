import React, { Component, useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWindowMinimize, faXmark } from "@fortawesome/free-solid-svg-icons";
import { faSquare } from "@fortawesome/free-regular-svg-icons";
import { Commands } from "../../Helpers";
import Line from "./components/line/line";
import { terminalBackground } from "../../Assets/images";
import { aurora } from "../../Assets/images";
import "./Terminal.scss";

const Terminal = () => {
  const [text, setText] = useState("");
  const [pass, setPass] = useState(false);
  const [init, setInit] = useState(true);

  const ref = useRef(null);

  useEffect(() => {
    if (init) {
      loopLines(Commands.banner, "typer-10", 10);
      clearText();
      setInit(false);
    }
  }, []);

  useEffect(() => {
    const onKeyUp = (event) => {
      if (event.keyCode == 13) {
        if (!pass) handleCommand(event);
        else verifyPassword(event);
      }
    };

    window.addEventListener("keyup", onKeyUp);

    return () => {
      window.removeEventListener("keyup", onKeyUp);
    };
  }, [text]);

  const setPasswordMode = (active) => {
    var liner = document.getElementById("liner");
    var linehead = document.getElementById("linehead");

    if (active) {
      setPass(true);
      if (linehead) linehead.style.display = "none";
      liner?.classList.add("password");
      clearText();
    } else {
      setPass(false);
      if (linehead) linehead.style.display = "inline";
      liner?.classList.remove("password");
      clearText();
    }
  };

  const verifyPassword = (e) => {
    if (text.trim() === "aurora") {
      addLine("Youre good " + text, "typer-10", 0);
    } else {
      addLine("<br /> wrong password!", "error", 10);
    }
    setPasswordMode(false);
  };

  const handleCommand = (e) => {
    setCommand();
    switch (text.trim()) {
      case "clear":
        clearTerminal();
        break;
      case "help":
        loopLines(Commands.help, "typer-40", 10);
        clearText();
        break;
      case "social":
        loopLines(Commands.social, "typer-40", 10);
        clearText();
        break;
      case "whois":
        loopLines(Commands.whois, "typer-40", 10);
        clearText();
        break;
      case "dog":
        loopLines(Commands.dog, "typer-40", 10);
        setTimeout(() => {
          window.open(aurora);
        }, 1500);
        clearText();
        break;
      case "overview":
        break;
      case "puzzle":
        setPasswordMode(true);
        break;
      case "banner":
        loopLines(Commands.banner, "typer-10", 10);
        clearText();
        break;
      default:
        loopLines(Commands.invalid, "typer-10", 100);
        clearText();
        break;
    }
  };

  const setCommand = () => {
    addLine(
      "<br/><div><div style='display: inline; margin-top: 20px;'>" +
        "<span style='color: red'>root@mykali</span>:<span style='color:blue'>~</span>$ &nbsp;</div>" +
        "<span class='typer'>" +
        text +
        "</span></div>",
      "typer-10",
      0
    );
  };

  const loopLines = (name, style, time) => {
    name.forEach((item, index) => {
      addLine(item, style, index * time);
    });
  };

  const clearTerminal = () => {
    var pastcmds = document.getElementById("history");
    if (pastcmds) pastcmds.innerHTML = "<a id='before'></a>";
    clearText();
  };

  const clearText = () => {
    setTimeout(() => {
      setText("");
      var texter = document.getElementById("texter");
      var typer = document.getElementById("typer");
      if (texter) texter.innerHTML = text;
      if (typer) typer.innerHTML = "";
    }, 100);
  };
  const handleClick = () => {
    if (ref.current != null) {
      ref.current.focus();
      document.getElementById("cursor")?.classList.add("blink");
    }
  };

  const nl2br = (txt) => {
    var passChar = "*";
    if (!pass) {
      return txt.replace(/\n/g, "");
    } else {
      return passChar.repeat(txt.length);
    }
  };

  const handleLoseFocus = () => {
    document.getElementById("cursor")?.classList.remove("blink");
  };

  const handleChange = () => {
    var typer = document.getElementById("typer");
    if (typer) typer.innerHTML = nl2br(text);
  };

  const addLine = (text, style, time) => {
    var t = "";
    var before = document.getElementById("before");
    for (let i = 0; i < text.length; i++) {
      if (text.charAt(i) == " " && text.charAt(i + 1) == " ") {
        t += "&nbsp;&nbsp;";
        i++;
      } else {
        t += text.charAt(i);
      }
    }
    setTimeout(function () {
      var content = document.getElementById("content");
      var next = document.createElement("p");
      next.innerHTML = t;
      next.classList.add("p");
      next.classList.add(style);

      if (before?.parentNode) before.parentNode.insertBefore(next, before);

      if (content) content.scrollTop = content?.scrollHeight;
    }, time);
  };

  return (
    <div className="terminal-outside">
      <div className="header">
        <div
          style={{
            paddingTop: "10px",
            width: "800px",
            display: "inline-block",
          }}
        >
          root@mykali: ~
        </div>
        <div className="icons">
          <div className="iconsContent">
            <span className="spacer-l-30" />
            <FontAwesomeIcon icon={faWindowMinimize} size="sm" />
            <span className="spacer-l-15" />
            <FontAwesomeIcon icon={faSquare} size="sm" />
            <span className="spacer-l-12" />
            <FontAwesomeIcon icon={faXmark} size="sm" />
          </div>
        </div>
      </div>
      <div className="options">
        <span className="options-text">File</span>
        <span className="options-text">Actions</span>
        <span className="options-text">Edit</span>
        <span className="options-text">View</span>
        <span className="options-text">Help</span>
      </div>
      <div id="content" className="content" onClick={handleClick}>
        <div id="history">
          <a id="before"></a>
        </div>
        {/* <img src={terminalBackground} className="bg-image"></img> */}
        <textarea
          id="texter"
          className="texter"
          ref={ref}
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
          onKeyDown={(e) => {
            handleChange();
          }}
          onKeyUp={handleChange}
          onBlur={handleLoseFocus}
          autoFocus
        />
        <div style={{ marginTop: "10px" }}></div>
        <Line />
      </div>
    </div>
  );
};

export default Terminal;
