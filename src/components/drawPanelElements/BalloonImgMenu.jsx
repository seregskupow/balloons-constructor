import React, { useContext, useRef } from 'react';
import styled from 'styled-components';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { MainContext } from '../../context/context';
import 'react-lazy-load-image-component/src/effects/blur.css';
import Loader from '../Loader';

export default function BalloonImgMenu({
  balloonData = {},
  display = false,
  category = '',
  setDisplay = function () {},
  changeBalloonImg,
}) {
  const container = useRef();
  const { index } = balloonData;
  const { balloonsImages } = useContext(MainContext);
  category = category.includes('special')
    ? category.split('.').shift()
    : category;
  category = category === 'number' ? 'numeral' : category;
  return (
    <BalloonsOptions ref={container} className="balloon-img-menu" displayMenu={display}>
      <div className="balloon-img-menu-wrapper">
        <div className="close-btn">
          <a
            href="#!"
            className="waves-effect waves-light btn"
            onClick={() => {
              setDisplay(false);
              document.querySelector('.plane').style.boxShadow = '0 6px 15px rgba(0, 0, 0, 0.068), 0 6px 15px rgba(0, 0, 0, 0.054)';
            }}
          >
            Закрити
          </a>
        </div>

        {category
          && balloonsImages[category].categories.map((item) => (
            <div key={Math.random()} className="menu-container">
              <div className="menu-item">
                {item.categoryName === 'standart' ? <h3>Стандарт</h3> : (
                  <h3>{item.categoryName}</h3>
                )}
                <div className="menu-item-imgs">
                  {item.imgs.map((img) => (
                    <div
                      key={img.id}
                      className="img-container"
                      data-id={img.id}
                    >
                      <LazyLoadImage
                        alt="шар"
                        effect="blur"
                        src={img.src}
                        placeholderSrc="/loader.jpg"
                        placeholder={<p style={{ color: 'red!important', zIndex: 10 }}>adasda</p>}
                        wrapperClassName="lazy-img-preloader"
                        onClick={() => {
                          changeBalloonImg(index, img.id, img.src, img.price, category);
                          setDisplay(false);
                        }}
                      />
                      {/* <LazyLoad
                        scrollContainer=".balloon-img-menu-wrapper"
                        placeholder={(
                          <h1 onClick={() => {
												  console.log(container.current);
                          }}
                          >
                            Sasat
                          </h1>
)}
                        once

                      >
                        <img
                          src={img.src}
                          alt=""
                          onClick={() => {
                            changeBalloonImg(index, img.id, img.src, img.price, category);
                            setDisplay(false);
                          }}
                        />
                      </LazyLoad> */}
                      <PriceTag>
                        {img.price}
                        {' '}
                        грн
                      </PriceTag>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
      </div>
    </BalloonsOptions>
  );
}
const PriceTag = styled.p`
  font-weight:bolder;
`;
const BalloonsOptions = styled.div`
  /* display: ${(props) => (props.displayMenu === false ? 'none' : 'flex')}; */
  /* transform:translate(${(props) => (props.displayMenu === false ? '-50%,100%' : '-50%,0%')}); */
    bottom:${(props) => (props.displayMenu === false ? '-100%' : '0')};
`;
