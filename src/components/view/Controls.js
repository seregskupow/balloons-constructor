import React, { useState, useContext } from "react";
import { MdClear } from "react-icons/md";
import { FiShoppingCart } from "react-icons/fi";
import BalloonContextMenu from "../drawPanelElements/BalloonContextMenu";
import html2canvas from "html2canvas";
import { MainContext } from "../../context/context";
import sendOrder from '../../additional/sendOrderToOP';
import styled from 'styled-components';
export default function Controls({
  createFigure,
  saveCart,
  totalPrice,
  balloonsCount,
  figureClass,
  setFigureClass,
  orderHandler,
}) {
  const [startValue, setStartValue] = useState("Оберіть вид композиції");
  const [showPop, setShowPop] = useState(false);
  const { dropdown } = useContext(MainContext);
  const categories = [
    { name: "Букет", value: "bouquet" },
    { name: "Каскад", value: "cascade" },
    { name: "Фонтан", value: "fontaine" },
    { name: "Фигура", value: "figure.special/1" },
    { name: "Цифра", value: "numeral.special&standart/1" },
    { name: "Число", value: "number.special/2" },
    { name: "Ходилка", value: "walker.special/1" },
  ];
  let randomTarget = Math.floor(Math.random() * (999999 - 10000 + 1)) + 10000;
  const clearBalloons = () => {
    setStartValue("Оберіть вид композиції");
    createFigure(0);
    document.getElementById(randomTarget).value = "default";
  };
  const selectChangeHandler = (e) => {
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
  const renderImage = async () => {
    try{
      document.querySelector(
        `#plane${+dropdown.replace(/^\D+/g, "")}`
      ).style.boxShadow = "none";
      let elem =  document.getElementById(
        `plane${+dropdown.replace(/^\D+/g, "")}`
      );
      await html2canvas(
       elem,
        {
          useCORS: true,
          logging: true,
          scrollY: (window.pageYOffset+30) * -1,
          width:elem.offsetWidth,
          height:elem.offsetHeight,
          scrollX:0
          
        }
      ).then(function (canvas) {
        let imgURL = canvas.toDataURL("image/jpeg").replace("image/jpeg", "image/octet-stream");
        console.log(imgURL);
        var a = document.createElement('a');
        a.href = imgURL;
        a.download = 'Композиція.jpg';
        a.click();
      });
      document.querySelector(
        `#plane${+dropdown.replace(/^\D+/g, "")}`
      ).style.boxShadow =
        "0 6px 15px rgba(0, 0, 0, 0.068), 0 6px 15px rgba(0, 0, 0, 0.054)";
        setShowPop(true)
        setTimeout(()=>{setShowPop(false)},10000)
    }catch(e){
      alert('Нажаль виникла помилка')
    }
    
      
  };
  const managePopup = ()=>{

  }
  return (
    <div className="controls-panel">
      <Popup show = {showPop} className={`popup popup${randomTarget}`}>
        <div className="popup-wrapper">
          <p>Ваше замовлення додане до корзини</p>
          <p>Перейдіть у Каталог та відкрийте кошик</p>
          <a onClick={()=>setShowPop(false)}className="waves-effect waves-light btn flow-text">Закрити</a>
        </div>
      </Popup>
      <div className="controls-panel-wrapper">
        <div className="control-panel-item">
          <select
            id={randomTarget}
            className="balloon-select"
            onChange={(e) => selectChangeHandler(e)}
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
                max={31}
                onChange={(e) => {
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
            Очистити{" "}
            <span className="control-item-icon">
              <MdClear />
            </span>
          </a>
          <a
            className={`waves-effect waves-light btn flow-text`}
            id={`canv${+dropdown.replace(/^\D+/g, "")}`}
            onClick={()=>{if(orderHandler()=== true) {renderImage();clearBalloons()}}}
          >
            Замовити{" "}
            <span className="control-item-icon">
              <FiShoppingCart />
            </span>
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
const Popup = styled.div`
top:${props=>props.show === true?"10px":"-100%"}
`;