import react from "react";

export default function ChildComponent(props) {
  return (
    <div style={{ backgroundColor: props.Color + "d0" }} className="child">
      <div>
        <img
          alt=""
          src={props.Icon}
          style={{
            width: 80,
            borderRadius: `0%`,
            marginBottom: 10,
          }}
        />
      </div>
    </div>
  );
}
