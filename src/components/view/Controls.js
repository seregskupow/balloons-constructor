import React, {useState } from "react";
import BalloonContextMenu from "../drawPanelElements/BalloonContextMenu";
export default function Controls({
  createFigure,
  saveCart,
  totalPrice,
  balloonsCount,
  figureClass,
  setFigureClass
}) {
  const [startValue, setStartValue] = useState("Выберите вид композиции");
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
  
 
  return (
    <div className="controls-panel">
      <div className="controls-panel-wrapper">
        <div className="control-panel-item">
          <select id={randomTarget} className="balloon-select"
          onChange={(e) => {
            let itemClass = e.target.value;
            if (itemClass.includes('special')) {
              createFigure(+itemClass.split('/').pop(), itemClass);
            } 
            // else if (itemClass === "number") {
              
            //   createFigure(2, itemClass);
            // } 
            else {
              if (balloonsCount >= 3) {
                createFigure(balloonsCount, itemClass);
              } else {
                createFigure(3, itemClass);
                
              }
            }
            setStartValue("");
            setFigureClass(itemClass);
          }}>
            <option value="default" selected disabled hidden>{startValue}</option>
            {categories.map((item, index) => (  
                <option key={index} value = {item.value}>
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
                  startValue === "Выберите вид композиции" ||
                  figureClass.includes('special')
                }
                id="test5"
                value={balloonsCount}
                step={figureClass === "cascade" ? 2 : 1}
                min={
                  figureClass.includes('special')
                    ? 1
                    : 3
                }
                max={13}
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
          <a href="#!"
            className="waves-effect waves-light btn"
            onClick={() => {
              setStartValue("Выберите вид композиции");
              createFigure(0);
              document.getElementById(randomTarget).value="default";
            }}
          >
            Очистить
          </a>
        </div>
        <div className="control-panel-item">
          <a className="waves-effect waves-light btn" href="#!" onClick={saveCart}>
            Добавить в корзину
          </a>
        </div>
        <div className="control-panel-item save-btn">
          <p className="flow-text">Всего: {totalPrice} руб.</p>
        </div>
        <div className="control-panel-item">
          <BalloonContextMenu />
        </div>
      </div>
    </div>
  );
}
