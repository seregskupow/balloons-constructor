import React, { useEffect, useContext, useState } from "react";
import { MainContext } from "../../context/context";
import Balloon from '../drawPanelElements/Balloon'
export default function Controls({createFigure,saveCart,cart}) {
  const { balloonCategories } = useContext(MainContext);
  const [startValue, setStartValue] = useState("Выберите вид композиции");
  const [sliderValue, setSValue] = useState(3);
  const [figureClass,setFC] = useState("");
  const categories = [
    { name: "Букет", value: "bouquet" },
    { name: "Каскад", value: "cascade" },
    { name: "Фонтан", value: "fontaine" },
    { name: "Фигура", value: "figure" },
    { name: "Цифра", value: "numeral" },
    { name: "Число", value: "number" },
    { name: "Ходилка", value: "walker" }
  ];
  const initializeDropDown = () => {
    var elems = document.querySelectorAll(".dropdown-trigger");
    var instances = window.M.Dropdown.init(elems, {
      closeOnClick: true
    });
    var script = document.createElement("script");
    script.src = "../src/additional/nouislider.js";
    document.getElementsByTagName("head")[0].appendChild(script);
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
            data-target="dropdown1"
            style={{ width: "300px" }}
          >
            {startValue}
          </a>
          <ul id="dropdown1" class="dropdown-content">
            {categories.map((item,index) => (
              <>
                <li
                  onClick={() => {
                    let itemClass = categories[index].value;
                    console.log(itemClass)
                    if(itemClass==="numeral"||itemClass==="walker"||itemClass==="figure"){
                      setSValue(1)
                      createFigure(1,itemClass);
                    }
                    else if(itemClass==="number"){
                      setSValue(2);
                      createFigure(2,itemClass);
                    }
                    else{
                      if(sliderValue>=3){
                        createFigure(sliderValue,itemClass);
                      }
                      else{
                        createFigure(3,itemClass);
                         setSValue(3);
                      }
                      
                      
                    }
                    setStartValue(item.name);
                    console.log(sliderValue)
                    setFC(itemClass)
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
                disabled={startValue === "Выберите вид композиции"||figureClass==="numeral"||figureClass==="number"||figureClass==="walker"||figureClass==="figure"}
                id="test5"
                value={sliderValue}
                step={figureClass==="cascade"?2:1}
                min={figureClass==="numeral"||figureClass==="number"||figureClass==="walker"||figureClass==="figure"?1:3}
                max={13}
                onChange={e => {
                  setSValue(+e.target.value);
                  createFigure(+e.target.value,figureClass);
                }}
              />
              <label htmlFor="test5">{sliderValue}</label>
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
            Создать новую
          </a>
        </div>
        <div className="control-panel-item">
          <a class="waves-effect waves-light btn" onClick={saveCart}>Сохранить</a>
        </div>
        <div className="control-panel-item save-btn">
          <p className="flow-text">Всего: {cart.length}</p>
        </div>
      </div>
    </div>
  );
}
