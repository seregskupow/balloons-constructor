import React, { useState, useContext } from 'react';
import { MdClear } from 'react-icons/md';
import { FiShoppingCart } from 'react-icons/fi';
import html2canvas from 'html2canvas';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { RiErrorWarningLine } from 'react-icons/ri';
import MainContext from '../../context/context';
import sendOrder from '../../additional/sendOrderToOP';
import BalloonClass from '../Balloon';

export default function Controls({
  createFigure,
  totalPrice,
  balloonsCount,
  figureClass,
  setFigureClass,
  orderHandler,
  balloons,
}) {
  const [startValue, setStartValue] = useState('Оберіть вид композиції');
  const [showPop, setShowPop] = useState(false);
  const { dropdown } = useContext(MainContext);
  const categories = [
    { name: 'Букет', value: 'bouquet' },
    { name: 'Каскад', value: 'cascade' },
    { name: 'Фонтан', value: 'fontaine' },
    { name: 'Фигура', value: 'figure.special/1' },
    { name: 'Цифра', value: 'numeral.special&standart/1' },
    { name: 'Число', value: 'number.special/2' },
    { name: 'Ходилка', value: 'walker.special/1' },
    { name: 'Елочка', value: 'tree' },
  ];

  const randomTarget = Math.floor(Math.random() * (999999 - 10000 + 1)) + 10000;
  const clearBalloons = () => {
    setStartValue('Оберіть вид композиції');
    createFigure(0);
    document.getElementById(randomTarget).value = 'default';
  };
  const selectChangeHandler = (e) => {
    const itemClass = e.target.value;
    if (itemClass.includes('special')) {
      createFigure(+itemClass.split('/').pop(), itemClass);
    } else if (balloonsCount >= 3) {
      createFigure(Math.min(Math.max(parseInt(balloonsCount, 10), 3),
        setMax(itemClass)), itemClass);
    } else {
      createFigure(3, itemClass);
    }
    setStartValue('');
    setFigureClass(itemClass);
  };
  const setMax = (figure = '') => {
    if (figure.includes('fontaine')) return 10;
    if (figure.includes('cascade')) return 20;
    if (figure.includes('tree')) return 28;
    return 30;
  };
  const renderImage = async () => {
    try {
      document.querySelector(
        `#plane${+dropdown.replace(/^\D+/g, '')}`,
      ).style.boxShadow = 'none';
      const elem = document.getElementById(
        `plane${+dropdown.replace(/^\D+/g, '')}`,
      );
      const positionToScroll = window.scrollY;
      if (/(iPad|iPhone|iPod)/g.test(navigator.userAgent)) {
        window.scrollTo(0, 0);
      }

      await html2canvas(
        elem,
        {
          useCORS: true,
          logging: true,
          scrollY: (positionToScroll + 30) * -1,
          width: elem.offsetWidth,
          height: elem.offsetHeight,
          scrollX: 0,

        },
      ).then((canvas) => {
        if (/(iPad|iPhone|iPod)/g.test(navigator.userAgent)) {
          window.scrollTo(0, positionToScroll);
        }
        const imgURL = canvas.toDataURL('image/jpeg');
        if (window.confirm('Завантажити зображення?')) {
          const a = document.createElement('a');
          a.href = imgURL;
          a.download = 'Композиція.jpg';
          a.click();
          a.remove();
        }
        sendOrder(balloons, imgURL);
      });
      document.querySelector(
        `#plane${+dropdown.replace(/^\D+/g, '')}`,
      ).style.boxShadow = '0 1px 4px rgba(0, 0, 0, 0.116), 0 1px 4px rgba(0, 0, 0, 0.144)';
      setShowPop(true);
      setTimeout(() => { setShowPop(false); }, 10000);
    } catch (e) {
      alert('Нажаль виникла помилка');
    }
  };

  return (
    <div className="controls-panel">
      <Popup show={showPop} className={`popup popup${randomTarget}`}>
        <div className="popup-wrapper">
          <p>Ваше замовлення додане до корзини</p>
          <p>Перейдіть у Каталог та відкрийте кошик</p>
          <a onClick={() => setShowPop(false)} className="waves-effect waves-light btn flow-text">Закрити</a>
        </div>
      </Popup>
      <div className="controls-panel-wrapper">
        <div className="control-panel-item control-select">
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
        <div className="control-panel-item control-range">
          <form action="#">
            <p className="range-field">
              <input
                type="range"
                disabled={
                  startValue === 'Оберіть вид композиції'
                  || figureClass.includes('special')
                }
                id="test5"
                value={balloonsCount}
                // figureClass === "cascade" ? 2 :
                step={1}
                min={figureClass.includes('special') ? 1 : 3}
                max={setMax(figureClass)}
                onChange={(e) => {
                  // setSValue(+e.target.value);
                  createFigure(+e.target.value, figureClass);
                }}
              />
              <label htmlFor="test5">{balloonsCount}</label>
            </p>
          </form>
        </div>
        <div className="control-panel-item control-buttons">
          <button
            type="button"
            className="control-btn rnd-button btn__click"
            onClick={clearBalloons}
          >
            Очистити
            {' '}
            <span className="control-item-icon">
              <MdClear />
            </span>
          </button>
          <button
            type="button"
            className="control-btn rnd-button btn__click"
            id={`canv${+dropdown.replace(/^\D+/g, '')}`}
            onClick={() => { if (orderHandler() === true) { renderImage(); clearBalloons(); } }}
          >
            Замовити
            {' '}
            <span className="control-item-icon">
              <FiShoppingCart />
            </span>
          </button>
        </div>
        <div className="control-panel-item total">
          <p className="flow-text">
            Всього:
            {' '}
            {totalPrice}
            {' '}
            грн.
          </p>
        </div>
        <div className="price-warning">
          <RiErrorWarningLine />
          {' '}
          <span>Ціни в конструкторі можуть відрізнятися від цін в магазині</span>
        </div>
      </div>
    </div>
  );
}
Controls.propTypes = {
  createFigure: PropTypes.func.isRequired,
  totalPrice: PropTypes.number.isRequired,
  balloonsCount: PropTypes.number.isRequired,
  figureClass: PropTypes.string.isRequired,
  setFigureClass: PropTypes.func.isRequired,
  orderHandler: PropTypes.func.isRequired,
  balloons: PropTypes.arrayOf(BalloonClass).isRequired,
};
const Popup = styled.div`
top:${(props) => (props.show === true ? '10px' : '-100%')}
`;
