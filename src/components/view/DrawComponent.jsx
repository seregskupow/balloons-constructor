import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Balloon from '../drawPanelElements/Balloon';
import BalloonContextMenu from '../drawPanelElements/BalloonContextMenu';
import BalloonImgMenu from '../drawPanelElements/BalloonImgMenu';
import MainContext from '../../context/context';
import BalloonClass from '../Balloon';

export default function DrawComponent({
  type = '',
  balloons,
  deleteBalloon,
  changeBalloonImg,
  copyBalloon,
  copiedBalloon,
  clearBalloonImg,
  figureClass,
  orderDisplay,
}) {
  const [balloonData, setBData] = useState({});
  const [display, setDisplay] = useState(false);
  const [category, setCategory] = useState('');
  const { dropdown } = useContext(MainContext);
  type = type.includes('special') ? type.split('.').shift() : type;
  const randomTarget = Math.random();
  const changeHeight = () => {
    if (balloons.length > 10 && figureClass !== 'tree') {
      const num = balloons.length - 10;
      if (num % 3 === 0) {
        // console.log(500+num*50)
        return 550 + num * 30;
      }
    } else {
      return 550;
    }
  };
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
      <div className="draw-component-wrapper" style={{ height: `${changeHeight()}px` }}>
        <Plane translate={orderDisplay} className="plane" id={`plane${+dropdown.replace(/^\D+/g, '')}`}>
          <div className={`balloons-container ${type}`}>
            <div className="tree-helper">
              {balloons.map((item) => (
                <Balloon
                  key={Math.random()}
                  setBData={setBData}
                  deleteBalloon={deleteBalloon}
                  randomTarget={randomTarget}
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

DrawComponent.propTypes = {
  type: PropTypes.string.isRequired,
  balloons: PropTypes.arrayOf(BalloonClass).isRequired,
  deleteBalloon: PropTypes.func.isRequired,
  changeBalloonImg: PropTypes.func.isRequired,
  copyBalloon: PropTypes.func.isRequired,
  copiedBalloon: PropTypes.object.isRequired,
  clearBalloonImg: PropTypes.func.isRequired,
  figureClass: PropTypes.string.isRequired,
  orderDisplay: PropTypes.bool.isRequired,

};
const Plane = styled.div`
transform:translateX(${(props) => (props.translate === true ? '-120%' : '0%')});
`;
