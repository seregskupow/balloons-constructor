import React, { useContext, useState } from "react";
import { MainContext } from "../../context/context";
export default function BalloonContextMenu({
  display=false,
  balloonData={},
  changeBalloonImg,
  copyBalloon,
  deleteBalloon,
  clearBalloonImg,
  copiedBalloon={},
  setDisplay=function(){},
  setCategory=function(){},
  category="",
  figureClass="" 
}) {
  const { balloonCategories, balloonsImages,dropdown } = useContext(MainContext);
  const { id, img, price, type,index } = balloonData;
  const [menuDisplay,setMenuDisplay]=useState(false)
  let menuToRender=[];
  if(figureClass.includes('special')){
    menuToRender=balloonCategories.filter(item=>item.type===figureClass)
  }else{
    menuToRender = balloonCategories.filter(item=>!item.type.includes('special') || item.type.includes('standart'))
  }
  return (
    <>
      <ul
        id={dropdown}
        className="ball-context-menu"
        style={{zIndex:"30",display:menuDisplay === false ? `none` : `block`}}
      >
        {img && (
          <>
            <li onClick={() => copyBalloon(id, img, price, type)}>
              <p>Копировать</p> 
            </li>
            <li class="divider" tabindex="-1"></li>
          </>
        )}
        {copiedBalloon.img && (
          <>
            <li onClick={() => changeBalloonImg(index,copiedBalloon.id, copiedBalloon.img, copiedBalloon.price, copiedBalloon.type)}>
              <p>Вставить</p> 
            </li>
            <li class="divider" tabindex="-1"></li>
          </>
        )}
        {img && (
          <>
            <li onClick={() => clearBalloonImg(index)}>
              <p>Удалить картинку</p>  
            </li>
            <li class="divider" tabindex="-1"></li>
          </>
        )}
        <li onClick={() => deleteBalloon(index)}>
             <p>Удалить шарик</p> 
            </li>
            <li className="divider" tabIndex="-1"></li>
        {menuToRender.map(item => (
          <>
            <li
              //class="collection-item"
              onClick={() => {
                if(balloonsImages[item.type.split('.').shift()]!==undefined){
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
              <p>{item.name}</p> 
            </li>
            <li className="divider" tabIndex="-1"></li>
          </>
        ))}
        <li
          onClick={() => {
            setDisplay(false);
          }}
        >
          <p>Закрыть</p> 
        </li>
      </ul>
    </>
  );
}

