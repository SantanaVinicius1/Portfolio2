import BubbleUI from "react-bubble-ui";
import "react-bubble-ui/dist/index.css";
import "./bubbleComponent.scss";
import { default as Child } from "./ChildComponent";
import { useEffect } from "react";

export default function BubbleComponent(props) {
  const options = {
    size: 180,
    minSize: 10,
    gutter: 8,
    provideProps: true,
    numCols: 6,
    fringeWidth: 100,
    yRadius: 130,
    xRadius: 200,
    cornerRadius: 50,
    showGuides: false,
    compact: true,
    gravitation: 5,
  };

  const children = props.data.slice(0, 33).map((data, i) => {
    return <Child {...data} key={i} />;
  });

  return (
    <BubbleUI options={options} className="myBubbleUI">
      {children}
    </BubbleUI>
  );
}
