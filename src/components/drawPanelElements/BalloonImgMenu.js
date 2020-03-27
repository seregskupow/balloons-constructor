import React, { useContext } from "react";
import styled from "styled-components";
import { MainContext } from "../../context/context";
export default function BalloonImgMenu({
  balloonData = {},
  display = false,
  category,
  setDisplay = function() {},
  changeBalloonImg
}) {
  const { id, img, price, type, index } = balloonData;
  const { balloonsImages } = useContext(MainContext);
  category = category.includes('special') ? category.split('.').shift() : category; 
  return (
    <BalloonsOptions displayMenu={display}>
      <div className="close-btn">
        <a
          href="#!"
          className="waves-effect waves-light btn"
          onClick={() => setDisplay(false)}
        >
          Закрыть
        </a>
      </div>

      {category &&
        balloonsImages[category].categories.map(item => (
          <div key={Math.random()} className="menu-container">
            <div className="menu-item">
              {item.categoryName === "standart" ? null : (
                <h3>{item.categoryName}</h3>
              )}
              <div className="menu-item-imgs">
                {item.imgs.map(img => (
                  <div key={img.id} className="img-container" data-id={img.id}>
                    <img
                      src={img.src}
                      alt=""
                      onClick={() => {
                        changeBalloonImg(index, id, img.src, img.price);
                        setDisplay(false);
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
    </BalloonsOptions>
  );
}
const BalloonsOptions = styled.div`
  display: ${props => (props.displayMenu === false ? `none` : `flex`)};
  flex-direction: column;
  overflow: auto;
  /* height: 40vh; */
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 100;
  top: 0;
  left: 0;
  background: #e9e9e9;
  border: 2px dotted #2bbbad;
  border-radius: 10px;
`;
