import React, { useState, useContext } from "react";
import styled from "styled-components";
import Balloon from "../drawPanelElements/Balloon";
import BalloonContextMenu from "../drawPanelElements/BalloonContextMenu";
import BalloonImgMenu from "../drawPanelElements/BalloonImgMenu";
import { findAllByDisplayValue } from "@testing-library/react";
import { MainContext } from "../../context/context";


export default function DrawComponent({
  type="",
  balloons,
  deleteBalloon,
  changeBalloonImg,
  copyBalloon,
  copiedBalloon,
  clearBalloonImg,
  figureClass,
  orderDisplay
}) {
  const [balloonData, setBData] = useState({});
  const [display, setDisplay] = useState(false);
  const [category, setCategory] = useState("");
  const { dropdown } = useContext(MainContext);
  type = type.includes('special') ? type.split('.').shift() : type;
  let randomTarget = Math.random();
  const changeHeight = ()=>{
    if(balloons.length>10 && figureClass!=='tree'){
      let num = balloons.length-10;
      if(num%3===0){
        // console.log(500+num*50)
        return 550+num*30
      }
    }else{
      return 550
    }
  }
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
      <div className="draw-component-wrapper" style={{height:`${changeHeight()}px`}}>
        <Plane translate={orderDisplay} className={`plane`} id={`plane${+dropdown.replace( /^\D+/g, '')}`}>
          <div className={`balloons-container ${type}`}>
            {/* {count>0 && Array(+count).fill(<Balloon type={type}/>)} */}
            {/* {Array(13).fill(<Round/>)} */}
            <div className="tree-helper">
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
        </Plane>
      </div>
    </>
  );
}
const Plane = styled.div`
transform:translateX(${props=>props.translate===true?"-120%":"0%"});
`;