import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import MainContext from '../../context/context';
import BalloonClass from '../Balloon';

export default function BalloonContextMenu({
  display = false,
  balloonData = {},
  changeBalloonImg,
  copyBalloon,
  deleteBalloon,
  clearBalloonImg,
  copiedBalloon = {},
  setDisplay = function () {},
  setCategory = function () {},
  category = '',
  figureClass = '',
}) {
  const { balloonCategories, balloonsImages, dropdown } = useContext(MainContext);
  const {
    id, img, price, type, index,
  } = balloonData;
  let menuToRender = [];
  if (figureClass.includes('special')) {
    menuToRender = balloonCategories.filter((item) => item.type === figureClass);
  } else if (figureClass.includes('cascade')) {
    menuToRender = balloonCategories.filter((item) => !item.type.includes('numeral'));
  } else {
    menuToRender = balloonCategories.filter((item) => !item.type.includes('special') || item.type.includes('standart'));
  }
  const unavailableStyle = {
    color: 'white',
    background: '#fa7c73',
    textDecoration: 'line-through',
    pointerEvents: 'none',
  };
  return (
    <>
      <ul
        id={dropdown}
        className="ball-context-menu"
        style={{ zIndex: '30', display: display === false ? 'none' : 'block' }}
      >
        {img && (
          <>
            <li onClick={() => copyBalloon(id, img, price, type)}>
              <p>Копіювати</p>
            </li>
            <li className="divider" tabIndex="-1"></li>
          </>
        )}
        {copiedBalloon.img && (
          <>
            <li onClick={() => changeBalloonImg(index, copiedBalloon.id, copiedBalloon.img, copiedBalloon.price, copiedBalloon.type)}>
              <p>Вставити</p>
            </li>
            <li className="divider" tabIndex="-1"></li>
          </>
        )}
        {img && (
          <>
            <li onClick={() => clearBalloonImg(index)}>
              <p>Видалити картинку</p>
            </li>
            <li className="divider" tabIndex="-1"></li>
          </>
        )}
        <li onClick={() => deleteBalloon(index)}>
          <p>Видалити шарик</p>
        </li>
        <li className="divider" tabIndex="-1"></li>
        {menuToRender.map((item) => (
          <>
            <li
              style={balloonsImages[item.type.split('.').shift()] === undefined ? unavailableStyle : null}
              onClick={(e) => {
                if (balloonsImages[item.type.split('.').shift()] !== undefined) {
                  if (category === item.type) {
                    setDisplay(!display);
                  } else {
                    setDisplay(true);
                  }
                  setCategory(item.type);
                }
              }}
              type={item.type}
            >
              <p style={{ color: balloonsImages[item.type.split('.').shift()] === undefined ? 'white' : null }}>{item.name}</p>
            </li>
            <li className="divider" tabIndex="-1"></li>
          </>
        ))}
        <li
          onClick={() => {
            setDisplay(false);
          }}
        >
          <p>Закрити</p>
        </li>
      </ul>
    </>
  );
}

BalloonContextMenu.propTypes = {
  display: PropTypes.bool.isRequired,
  balloonData: PropTypes.instanceOf(BalloonClass).isRequired,
  changeBalloonImg: PropTypes.func.isRequired,
  copyBalloon: PropTypes.func.isRequired,
  deleteBalloon: PropTypes.func.isRequired,
  clearBalloonImg: PropTypes.func.isRequired,
  copiedBalloon: PropTypes.instanceOf(BalloonClass).isRequired,
  setDisplay: PropTypes.func.isRequired,
  setCategory: PropTypes.func.isRequired,
  category: PropTypes.string.isRequired,
  figureClass: PropTypes.string.isRequired,
};
