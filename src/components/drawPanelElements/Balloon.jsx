import React, { useContext } from 'react';
import { ReactComponent as Round } from '../../data/samplesImgs/ball.svg';
import { ReactComponent as Number } from '../../data/samplesImgs/num.svg';
import { ReactComponent as Figure } from '../../data/samplesImgs/pony.svg';
import { MainContext } from '../../context/context';

export default function Balloon({ balloon, setBData }) {
  const { img, index, type = '' } = balloon;
  const { dropdown } = useContext(MainContext);
  let balloonType;
  if (type.includes('number') || type.includes('numeral')) {
    balloonType = <Number />;
  } else if (type.includes('figure') || type.includes('walker')) {
    balloonType = <Figure />;
  } else {
    balloonType = <Round />;
  }
  if (img !== null) {
    balloonType = <img className="balloon-img" alt="ballon-img" src={img} height="160px" />;
  }
  const findAncestor = (el, cls) => {
    while ((el = el.parentElement) && !el.classList.contains(cls));
    return el;
  };
  const positionMenu = (el) => {
    const drop = document.getElementById(dropdown);
    drop.style.display = 'block';
    const rect = el.getBoundingClientRect();
    const container = findAncestor(el, 'balloon');
    const menuParent = findAncestor(drop, 'app-main-container');
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    let posTop = Math.abs(container.offsetTop + 320);
    let posLR = container.offsetLeft;
    const differenceTop = menuParent.offsetHeight - posTop;
    const differenceLR = menuParent.offsetWidth - posLR;
    if (differenceTop < drop.offsetHeight) {
      posTop -= drop.offsetHeight - differenceTop + 15;
    }
    if (differenceLR < drop.offsetWidth) {
      posLR -= drop.offsetWidth - differenceLR;
    }
    drop.style.top = `${posTop}px`;
    drop.style.left = `${posLR + 15}px`;
  };
  return (
    <>
      <button
        type="button"
        className="balloon dropdown-triggerr"
        data-target={dropdown}
        data-index={index}
        onClick={(e) => {
          setBData(balloon);
          positionMenu(e.target);
        }}
      >
        <div className="balloon-inner">
          {balloonType}
        </div>
      </button>
    </>
  );
}
