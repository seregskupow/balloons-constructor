import React, { useEffect } from "react";
import BalloonSVG from "../../data/samplesImgs/round.svg";
import { ReactComponent as Round } from "../../data/samplesImgs/round.svg";
import { ReactComponent as Number } from "../../data/samplesImgs/number.svg";
import { ReactComponent as Figure } from "../../data/samplesImgs/figure.svg";
export default function Balloon({ balloon, deleteBalloon,setBData }) {
  const {img,id,price,index,type} = balloon;
  let removeEl = el => {
    // el.parentElement.removeChild([...el.parentElement.children].indexOf(el));
    console.log(el);
  };
  let balloonType;
  if (type === "number" || type === "numeral") {
    balloonType = <Number />;
  } else if (type === "figure" || type === "walker") {
    balloonType = <Figure />;
  } else if (img !== "") {
    balloonType = <img className="balloon-img" src={img} height="150px" />;
  } else {
    balloonType = <Round />;
  }
  const initializeDropDown = () => {
    var elems = document.querySelectorAll(".dropdown-trigger");
    var instances = window.M.Dropdown.init(elems, {
      closeOnClick: true
    });
    var script = document.createElement("script");
    script.src = "../src/additional/nouislider.js";
    document.getElementsByTagName("head")[0].appendChild(script);
  };
  useEffect(() => {
    initializeDropDown();
  }, []);
  return (
    <>
      <div
        className="balloon dropdown-trigger"
        data-target="dropdown2"
        data-index={index}
        onClick={e => {
          setBData(balloon)
        }}
      >
        {balloonType}
      </div>
    </>
  );
}
