import React, { useState } from "react";
import Balloon from "../drawPanelElements/Balloon";
import BalloonContextmenu from "../drawPanelElements/BalloonContextMenu";
export default function DrawComponent({ type, balloons, deleteBalloon,changeBalloonImg }) {
  const [balloonId, setBId] = useState(false);
  return (
    <div className="draw-component-wrapper">
      <div className="plane">
      <BalloonContextmenu balloonId={balloonId} changeBalloonImg={changeBalloonImg}/>
        <div className={`balloons-container ${type}`}>          
          {/* {count>0 && Array(+count).fill(<Balloon type={type}/>)} */}
          {/* {Array(13).fill(<Round/>)} */}
          {balloons.map(item => (
            <Balloon
            setBId={setBId}
              deleteBalloon={deleteBalloon}
              index={item.index}
              type={item.type}
              img={item.img}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
