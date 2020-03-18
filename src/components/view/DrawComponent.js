import React, { useState } from "react";
import Balloon from "../drawPanelElements/Balloon";
import BalloonContextmenu from "../drawPanelElements/BalloonContextMenu";
export default function DrawComponent({ type, balloons, deleteBalloon,changeBalloonImg,copyBalloon,copiedBalloon,clearBalloonImg }) {
  const [balloonData, setBData] = useState({});
  let randomTarget = Math.random();
  return (
    <div className="draw-component-wrapper">
      <div className="plane">
      <BalloonContextmenu randomTarget={randomTarget} clearBalloonImg={clearBalloonImg} deleteBalloon ={deleteBalloon} copiedBalloon={copiedBalloon} copyBalloon={copyBalloon} balloonData={balloonData} changeBalloonImg={changeBalloonImg}/>
        <div className={`balloons-container ${type}`}>          
          {/* {count>0 && Array(+count).fill(<Balloon type={type}/>)} */}
          {/* {Array(13).fill(<Round/>)} */}
          {balloons.map(item => (
            <Balloon
              setBData={setBData}
              deleteBalloon={deleteBalloon}
              randomTarget={randomTarget}
              // index={item.index}
              // type={item.type}
              // img={item.img}
              balloon={item}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
