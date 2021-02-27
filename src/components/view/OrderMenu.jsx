import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import { MainContext } from '../../context/context';
import { ReactComponent as Curve1 } from '../../data/samplesImgs/curve1.svg';
import { ReactComponent as Curve2 } from '../../data/samplesImgs/curve2.svg';
import { ReactComponent as Curve3 } from '../../data/samplesImgs/curve3.svg';

export default function OrderMenu({
  orderDisplay = false,
  setOrderDisplay,
  clearAll,
  balloons,
  totalPrice,
  type,
}) {
  const initialForm = { name: '', email: '', phone: '' };
  const { dropdown } = useContext(MainContext);
  const [form, setForm] = useState(initialForm);
  const [nameError, setNameError] = useState('');
  const [phoneError, setPassError] = useState('');
  const [emailError, setEmailError] = useState('');
  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };
  const validateForm = (type, value) => {
    if (type === 'name') {
      if (value.length <= 6) setNameError('Мінімальна довжина 6 символів');
      else if (value.length > 30) { setNameError('Максимальна довжина 30 символів'); } else setNameError('');
    }
    if (type === 'email') {
      // eslint-disable-next-line
      let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!re.test(String(value).toLowerCase()) && value !== '') { setEmailError('Email має виглядати так example@email.com'); } else setEmailError('');
    }
    if (type === 'phone') {
      // eslint-disable-next-line
      let re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
      if (!re.test(String(value)) && value !== '') setPassError('Перевірте формат телефону');
      else setPassError('');
    }
  };
  const submitHandle = async () => {
    if (nameError === '' && phoneError === '' && emailError === '' && form.email !== '' && form.name !== '' && form.phone !== '') {
      try {
        const res = await fetch('http://reco.fun:1337/api/uploadtotal', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            customerData: form, balloons, totalPrice, type,
          }),
        });
        const response = await res.json();
        if (response) {
          setForm(initialForm);
          clearAll();
          setOrderDisplay();
        }
      } catch (e) {

      }
    }
  };
  const errorStyle = {
    color: 'red',
    fontSize: '15px',
    zIndex: '3',
  };
  useEffect(() => {
  }, [balloons]);
  return (
    <OrderMenuComponent display={orderDisplay} className="order-menu">
      <Curve1 className="curve curve-1" />
      <Curve2 className="curve curve-2" />
      <Curve3 className="curve curve-3" />
      <div className="order-menu-wrapper">
        <a className="waves-effect waves-light btn" onClick={setOrderDisplay}>
          Закрыть
        </a>
        <form action="" className="col s12">
          <div className="row">
            <div className="input-field col s12">
              <input
                name="name"
                onChange={(e) => {
                  changeHandler(e);
                  validateForm('name', e.target.value);
                }}
                value={form.name}
                id={`name${dropdown}`}
                type="text"
                className="validate"
              />
              <label htmlFor={`name${dropdown}`}>Ваше ФИО</label>
            </div>
            <span style={errorStyle} className="error-message">
              {nameError}
            </span>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <input
                name="phone"
                onChange={(e) => {
                  changeHandler(e);
                  validateForm('phone', e.target.value);
                }}
                value={form.phone}
                id={`phone${dropdown}`}
                type="text"
                className="validate"
              />
              <label htmlFor={`phone${dropdown}`}>Телефон</label>
            </div>
            <span style={errorStyle} className="error-message">
              {phoneError}
            </span>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <input
                name="email"
                onChange={(e) => {
                  changeHandler(e);
                  validateForm('email', e.target.value);
                }}
                value={form.email}
                id={`email${dropdown}`}
                type="email"
                className="validate"
              />
              <label htmlFor={`email${dropdown}`}>Email</label>
            </div>
            <span style={errorStyle} className="error-message">
              {emailError}
            </span>
          </div>
          <div className="row">
            <div className="col s12 submit-container">
              <button
                className="btn waves-effect waves-light"
                name="action"
                onClick={(e) => {
                  e.preventDefault();
                  submitHandle();
                }}
              >
                Заказать
                <i className="material-icons right"></i>
              </button>
            </div>
          </div>
        </form>
      </div>
    </OrderMenuComponent>
  );
}

const OrderMenuComponent = styled.div`
  /* left:50%;  */
  left: ${(props) => (props.display ? '50%' : '150%')};
`;
