import React, { useEffect, useContext, useRef } from 'react';
import styled from 'styled-components';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { RiCloseFill } from 'react-icons/ri';
import { MainContext } from '../../context/context';
import 'react-lazy-load-image-component/src/effects/blur.css';

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
  const closeMenu = () => {
    setDisplay(false);
    document.querySelector('.plane').style.boxShadow = '0 6px 15px rgba(0, 0, 0, 0.068), 0 6px 15px rgba(0, 0, 0, 0.054)';
  };
  const handleClick = (e) => {
    if (container.current.contains(e.target)) {
      // inside click
      return;
    }
    // outside click
    closeMenu();
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClick);
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, []);
  return (
    <BalloonsOptions ref={container} className="balloon-img-menu" displayMenu={display}>
      <div className="balloon-img-menu-wrapper">

        <div className="close-btn-container">
          <button
            type="button"
            className="close-btn btn__click"
            onClick={() => {
              closeMenu();
            }}
          >
            <RiCloseFill />
          </button>

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
                    <button
                      type="button"
                      key={img.id}
                      className="img-container btn__click"
                      data-id={img.id}
                      onClick={() => {
                        changeBalloonImg(index, img.id, img.src, img.price, category);
                        setDisplay(false);
                      }}
                    >
                      <LazyLoadImage
                        alt="шар"
                        effect="blur"
                        src={img.src}
                        placeholderSrc="/loader.jpg"
                        placeholder={<p style={{ color: 'red!important', zIndex: 10 }}>adasda</p>}
                        wrapperClassName="lazy-img-preloader"
                      />
                      <PriceTag>
                        {img.price}
                        {' '}
                        грн
                      </PriceTag>
                    </button>
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
