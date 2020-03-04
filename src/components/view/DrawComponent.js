import React, { useState } from "react";
import Balloon from "../drawPanelElements/Balloon";
import BalloonContextmenu from "../drawPanelElements/BalloonContextMenu";
export default function DrawComponent({ type, balloons, deleteBalloon,changeBalloonImg,copyBalloon,copiedBalloon }) {
  const [balloonData, setBData] = useState({});

  return (
    <div className="draw-component-wrapper">
      <div className="plane">
      <BalloonContextmenu copiedBalloon={copiedBalloon} copyBalloon={copyBalloon} balloonData={balloonData} changeBalloonImg={changeBalloonImg}/>
        <div className={`balloons-container ${type}`}>          
          {/* {count>0 && Array(+count).fill(<Balloon type={type}/>)} */}
          {/* {Array(13).fill(<Round/>)} */}
          {balloons.map(item => (
            <Balloon
              setBData={setBData}
              deleteBalloon={deleteBalloon}
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
