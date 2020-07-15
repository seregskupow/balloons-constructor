import React, { useState } from "react";
import {MdClear} from 'react-icons/md'
import {FiShoppingCart} from 'react-icons/fi'
import BalloonContextMenu from "../drawPanelElements/BalloonContextMenu";
export default function Controls({
  createFigure,
  saveCart,
  totalPrice,
  balloonsCount,
  figureClass,
  setFigureClass,
  orderHandler
}) {
  const [startValue, setStartValue] = useState("Оберіть вид композиції");
  const categories = [
    { name: "Букет", value: "bouquet" },
    { name: "Каскад", value: "cascade" },
    { name: "Фонтан", value: "fontaine" },
    { name: "Фигура", value: "figure.special/1" },
    { name: "Цифра", value: "numeral.special&standart/1" },
    { name: "Число", value: "number.special/2" },
    { name: "Ходилка", value: "walker.special/1" }
  ];
  let randomTarget = Math.random();
  const clearBalloons = () => {
    setStartValue("Оберіть вид композиції");
    createFigure(0);
    document.getElementById(randomTarget).value = "default";
  };
  const selectChangeHandler = e => {
    let itemClass = e.target.value;
    if (itemClass.includes("special")) {
      createFigure(+itemClass.split("/").pop(), itemClass);
    } else {
      if (balloonsCount >= 3) {
        createFigure(balloonsCount, itemClass);
      } else {
        createFigure(3, itemClass);
      }
    }
    setStartValue("");
    setFigureClass(itemClass);
  };
  return (
    <div className="controls-panel">
      <div className="controls-panel-wrapper">
        <div className="control-panel-item">
          <select
            id={randomTarget}
            className="balloon-select"
            onChange={e => selectChangeHandler(e)}
          >
            <option value="default" selected disabled hidden>
              {startValue}
            </option>
            {categories.map((item, index) => (
              <option key={index} value={item.value}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
        <div className="control-panel-item">
          <form action="#">
            <p className="range-field">
              <input
                type="range"
                disabled={
                  startValue === "Оберіть вид композиції" ||
                  figureClass.includes("special")
                }
                id="test5"
                value={balloonsCount}
                //figureClass === "cascade" ? 2 : 
                step={1}
                min={figureClass.includes("special") ? 1 : 3}
                max={15}
                onChange={e => {
                  //setSValue(+e.target.value);
                  createFigure(+e.target.value, figureClass);
                }}
              />
              <label htmlFor="test5">{balloonsCount}</label>
            </p>
          </form>
        </div>
        <div className="control-panel-item">
          <a
            className="waves-effect waves-light btn flow-text"
            onClick={clearBalloons}
          >
            Очистити <span className="control-item-icon"><MdClear/></span>
          </a>
          <a
            className="waves-effect waves-light btn flow-text"
            onClick={orderHandler}
          >
            Замовити <span className="control-item-icon"><FiShoppingCart/></span> 
          </a>
        </div>
        <div className="control-panel-item save-btn">
          <p className="flow-text total">Всього: {totalPrice} грн.</p>
        </div>

        <div className="control-panel-item">
          <BalloonContextMenu />
        </div>
      </div>
    </div>
  );
}
