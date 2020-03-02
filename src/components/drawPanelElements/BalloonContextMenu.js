import React, { useContext, useState } from "react";
import styled from "styled-components";
import { MainContext } from "../../context/context";
export default function BalloonContextMenu({balloonId,changeBalloonImg}) {
  const { balloonCategories, balloonsImages } = useContext(MainContext);
  const [display, setDisplay] = useState(false);
  const [category, setCategory] = useState("");
  return (
    <>
      {/* <div
        className="dropdown-trigger"
        data-target="dropdown2"
        style={{ width: "300px" }}
      >
        Виберите тип шара
      </div> */}
      <ul id="dropdown2" className="dropdown-content" style={{position:"absolute"}}>
        {balloonCategories.map(item => (
          <>
            <li
              //class="collection-item"
              onClick={() => {
                if (category === item.type) {
                  setDisplay(!display);
                } else {
                  setDisplay(true);
                }
                setCategory(item.type);
              }}
              type={item.type}
            >
              <a href="#!">{item.name}</a>
            </li>
            <li class="divider" tabindex="-1"></li>
          </>
        ))}
        <li
          onClick={() => {
            setDisplay(false);
          }}
        >
          Закрыть{" "}
        </li>
      </ul>
      <BalloonsOptions display={display}>
        <a
          class="waves-effect waves-light btn"
          onClick={() => setDisplay(false)}
        >
          Закрыть
        </a>
        {category &&
          balloonsImages[category].categories.map(item => (
            <div className="menu-container">
              <div className="menu-item">
                {item.categoryName === "standart" ? null : (
                  <h3>{item.categoryName}</h3>
                )}
                <div className="menu-item-imgs">
                  {item.imgs.map(img => (
                    <div className="img-container" data-id={img.id} >
                      <img src={img.src} alt="" onClick={()=>{changeBalloonImg(balloonId,img.src);setDisplay(false)}}/>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
      </BalloonsOptions>
    </>
  );
}

const BalloonsOptions = styled.div`
  display: ${props => (props.display === false ? `none` : `flex`)};
  flex-wrap: wrap;
  max-height: 300px;
  overflow: auto;
  /* height: 40vh; */
  width: 30vw;
  position:absolute;
  z-index:100;
  top: 0;
  left: 0;
  background: #e9e9e9;
  border: 2px dotted #2bbbad;
  border-radius: 10px;
`;
