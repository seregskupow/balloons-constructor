import React from "react";
import BalloonSVG from "../../data/samplesImgs/round.svg";
import { ReactComponent as Round } from "../../data/samplesImgs/round.svg";
import { ReactComponent as Number } from "../../data/samplesImgs/number.svg";
import { ReactComponent as Figure } from "../../data/samplesImgs/figure.svg";
export default function Balloon({ type,index,img,deleteBalloon }) {
    let removeEl =(el)=>{
        // el.parentElement.removeChild([...el.parentElement.children].indexOf(el));
        console.log(el)
    }
  let balloonType;
  if (type === "number" || type === "numeral") {
    balloonType = <Number />;
  } else if (type === "figure" || type === "walker") {
    balloonType = <Figure />;
  } 
  else if(img!==""){
      balloonType=<img src={img} height="100px"/>
  }
  else {
    balloonType = <Round />;
  }
  
  return <div className="balloon" data-index={index} onClick={(e)=>{deleteBalloon(index)
e.target.style.border="2px solid black"}}>{balloonType}</div>;
}
