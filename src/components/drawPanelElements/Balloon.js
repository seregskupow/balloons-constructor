import React, {useContext } from "react";
import { ReactComponent as Round } from "../../data/samplesImgs/round.svg";
import { ReactComponent as Number } from "../../data/samplesImgs/number.svg";
import { ReactComponent as Figure } from "../../data/samplesImgs/figure.svg";
import { MainContext } from '../../context/context'
export default function Balloon({ balloon,setBData }) {
  const {img,index,type} = balloon;
  const { dropdown } = useContext(MainContext);

  let balloonType;
  if (type === "number" || type === "numeral") {
    balloonType = <Number />;
  } else if (type === "figure" || type === "walker") {
    balloonType = <Figure />;
  } else if (img !== "") {
    balloonType = <img className="balloon-img" alt="ballon-img" src={img} height="160px" />;
  } else {
    balloonType = <Round />;
  }
 
  return (
    <>
      <div
        className="balloon dropdown-triggerr"
        data-target={dropdown}
        data-index={index}
        onClick={e => {
          setBData(balloon)
          const drop = document.getElementById(dropdown);
          drop.style.display = "block";
          var rect = e.target.getBoundingClientRect();
          console.log(rect);
          drop.style.top = rect.y+"px"-drop.offsetHeight;
          drop.style.left = rect.x+"px";
        }}
      >
        {balloonType}
      </div>
    </>
  );
}
