import React, { useEffect, useContext, useState } from "react";
import { MainContext } from "../../context/context";
export default function Controls() {
  const { balloonCategories } = useContext(MainContext);
  const [startValue, setStartValue] = useState("Выберите вид композиции");
  const [sliderValue,setSValue]=useState(3);
  const categories = [{name:"Букет",value:"bouquet"},{name:"Каскад",value:"cascade"},{name:"Фонтан",value:"fountain"},{name:"Фигура",value:"figure"},{name:"Цифра",value:"numeral"},{name:"Число",value:"number"},{name:"Ходилка",value:"walker"}]
  const initializeDropDown = () => {
    var elems = document.querySelectorAll(".dropdown-trigger");
    var instances = window.M.Dropdown.init(elems, {
      closeOnClick: true
    });
    var script = document.createElement('script');
    script.src = "../src/additional/nouislider.js";
document.getElementsByTagName('head')[0].appendChild(script);

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
            {categories.map(item => (
              <>
                <li 
                  onClick={() => {
                    setStartValue(item.name);
                    //createFigure(item.value,sliderValue)
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
              <input type="range" id="test5" value={sliderValue} min="3" max="9" onChange={e=>setSValue(e.target.value)}/>
                <label htmlFor="test5">{sliderValue}</label>
            </p>
          </form>
        </div>
        <div className="control-panel-item">
          <a
            class="waves-effect waves-light btn"
            onClick={() => {
              setStartValue("Выберите вид композиции");
            }}
          >
            Создать еще
          </a>
        </div>
        <div className="control-panel-item">
          <a class="waves-effect waves-light btn">Сохранить</a>
        </div>
        <div className="control-panel-item save-btn">
          <p className="flow-text">Всего:</p>
        </div>
      </div>
    </div>
  );
}
