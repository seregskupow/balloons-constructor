import React, {useContext } from "react";
import { ReactComponent as Round } from "../../data/samplesImgs/round.svg";
import { ReactComponent as Number } from "../../data/samplesImgs/number.svg";
import { ReactComponent as Figure } from "../../data/samplesImgs/figure.svg";
import { MainContext } from '../../context/context'
export default function Balloon({ balloon,setBData }) {
  const {img,index,type=""} = balloon;
  const { dropdown } = useContext(MainContext);
  let balloonType;
  if (type.includes("number") || type.includes("numeral")) {
    balloonType = <Number />;
  } else if (type.includes("figure") || type.includes("walker")) {
    balloonType = <Figure />;
  } else if (img !== "") {
    balloonType = <img className="balloon-img" alt="ballon-img" src={img} height="160px" />;
  } else {
    balloonType = <Round />;
  }
  const findAncestor = (el, cls) => {
    while ((el = el.parentElement) && !el.classList.contains(cls));
    return el;
  };
  const positionMenu = (el)=>{
    const drop = document.getElementById(dropdown);
          drop.style.display = "block";
          var rect = el.getBoundingClientRect(),
          container = findAncestor(el,"balloon"),
          scrollTop = window.pageYOffset || document.documentElement.scrollTop;
          console.log(container.offsetTop);
          console.log(container.offsetHeight)
          drop.style.bottom = Math.abs(container.offsetTop-container.offsetHeight)+"px";
          drop.style.left = container.offsetLeft+"px";
  }
  return (
    <>
      <div
        className="balloon dropdown-triggerr"
        data-target={dropdown}
        data-index={index}
        onClick={e => {
          setBData(balloon)
          positionMenu(e.target)
        }}
      >
        {balloonType}
      </div>
    </>
  );
}
