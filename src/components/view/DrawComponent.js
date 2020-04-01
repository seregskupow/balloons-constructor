import React, { useState } from "react";
import Balloon from "../drawPanelElements/Balloon";
import BalloonContextMenu from "../drawPanelElements/BalloonContextMenu";
import BalloonImgMenu from "../drawPanelElements/BalloonImgMenu";
import { findAllByDisplayValue } from "@testing-library/react";
export default function DrawComponent({
  type="",
  balloons,
  deleteBalloon,
  changeBalloonImg,
  copyBalloon,
  copiedBalloon,
  clearBalloonImg,
  figureClass
}) {
  const [balloonData, setBData] = useState({});
  const [display, setDisplay] = useState(false);
  const [category, setCategory] = useState("");
  type = type.includes('special') ? type.split('.').shift() : type;
  let randomTarget = Math.random();
  return (
    <>
      <BalloonContextMenu
        figureClass={figureClass}
        display={display}
        setDisplay={setDisplay}
        setCategory={setCategory}
        randomTarget={randomTarget}
        clearBalloonImg={clearBalloonImg}
        deleteBalloon={deleteBalloon}
        copiedBalloon={copiedBalloon}
        copyBalloon={copyBalloon}
        balloonData={balloonData}
        changeBalloonImg={changeBalloonImg}
        
      />
       <BalloonImgMenu
            balloonData={balloonData}
            setDisplay={setDisplay}
            display={display}
            category={category}
            changeBalloonImg={changeBalloonImg}
          />
      <div className="draw-component-wrapper">
        <div className="plane">
          <div className={`balloons-container ${type}`}>
            {/* {count>0 && Array(+count).fill(<Balloon type={type}/>)} */}
            {/* {Array(13).fill(<Round/>)} */}
            {balloons.map(item => (
              <Balloon
                key={Math.random()}
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
    </>
  );
}
