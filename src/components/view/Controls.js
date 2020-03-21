import React, { useEffect, useContext, useState } from "react";
import { MainContext } from "../../context/context";
import Balloon from "../drawPanelElements/Balloon";
import BalloonContextMenu from "../drawPanelElements/BalloonContextMenu";
export default function Controls({
  createFigure,
  saveCart,
  totalPrice,
  balloonsCount
}) {
  const { balloonCategories } = useContext(MainContext);
  const [startValue, setStartValue] = useState("Выберите вид композиции");
  const [sliderValue, setSValue] = useState(3);
  const [figureClass, setFC] = useState("");
  const categories = [
    { name: "Букет", value: "bouquet" },
    { name: "Каскад", value: "cascade" },
    { name: "Фонтан", value: "fontaine" },
    { name: "Фигура", value: "figure" },
    { name: "Цифра", value: "numeral" },
    { name: "Число", value: "number" },
    { name: "Ходилка", value: "walker" }
  ];
  let randomTarget = Math.random();
  const initializeDropDown = () => {
    var elems = document.querySelectorAll(".dropdown-trigger");
    var instances = window.M.Dropdown.init(elems, {
      closeOnClick: true
    });
    // var script = document.createElement("script");
    // script.src = "../src/additional/nouislider.js";
    // document.getElementsByTagName("head")[0].appendChild(script);
  };
  useEffect(() => {
    initializeDropDown();
  }, []);
  return (
    <div className="controls-panel">
      <div className="controls-panel-wrapper">
        <div className="control-panel-item dropdown">
          <a
            class="dropdown-trigger btn"
            href="#"
            data-target={randomTarget}
            style={{ width: "300px" }}
          >
            {startValue}
          </a>
          <ul id={randomTarget} className="dropdown-contentt">
            {categories.map((item, index) => (
              <>
                <li
                  onClick={() => {
                    let itemClass = categories[index].value;
                    console.log(itemClass);
                    if (
                      itemClass === "numeral" ||
                      itemClass === "walker" ||
                      itemClass === "figure"
                    ) {
                      setSValue(1);
                      createFigure(1, itemClass);
                    } else if (itemClass === "number") {
                      setSValue(2);
                      createFigure(2, itemClass);
                    } else {
                      if (balloonsCount >= 3) {
                        createFigure(balloonsCount, itemClass);
                      } else {
                        createFigure(3, itemClass);
                        setSValue(3);
                      }
                    }
                    setStartValue(item.name);
                    setFC(itemClass);
                  }}
                >
                  <a href="#!">{item.name}</a>
                </li>
                <li class="divider" tabindex="-1"></li>
              </>
            ))}
          </ul>
        </div>
        <div className="control-panel-item">
          <form action="#">
            <p class="range-field">
              <input
                type="range"
                disabled={
                  startValue === "Выберите вид композиции" ||
                  figureClass === "numeral" ||
                  figureClass === "number" ||
                  figureClass === "walker" ||
                  figureClass === "figure"
                }
                id="test5"
                value={balloonsCount}
                step={figureClass === "cascade" ? 2 : 1}
                min={
                  figureClass === "numeral" ||
                  figureClass === "number" ||
                  figureClass === "walker" ||
                  figureClass === "figure"
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
          <a
            class="waves-effect waves-light btn"
            onClick={() => {
              setStartValue("Выберите вид композиции");
              setSValue(3);
              createFigure(0);
            }}
          >
            Очистить
          </a>
        </div>
        <div className="control-panel-item">
          <a class="waves-effect waves-light btn" onClick={saveCart}>
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
