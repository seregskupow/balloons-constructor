import React, { Component } from "react";
import NavBar from "./view/NavBar";
import { MainContext } from "../context/context";
//import Balloon from './drawPanelElements/Balloon'
import Controls from "./view/Controls";
import DrawComponent from "./view/DrawComponent";
import OrderMenu from "./view/OrderMenu";
import menuEvent from '../additional/script'
export default class MainSection extends Component {
  static contextType = MainContext;
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      type: "",
      balloons: [],
      cart: [],
      copiedBalloon: { img: "", price: "", id: "" },
      totalPrice: 0,
      figureClass: "",
      orderDisplay:false
    };
    this.createFigure = this.createFigure.bind(this);
    this.deleteBalloon = this.deleteBalloon.bind(this);
    this.saveCart = this.saveCart.bind(this);
    this.changeBalloonImg = this.changeBalloonImg.bind(this);
    this.copyBalloon = this.copyBalloon.bind(this);
    this.clearBalloonImg = this.clearBalloonImg.bind(this);
    this.setFigureClass = this.setFigureClass.bind(this);
    this.orderHandle = this.orderHandle.bind(this);
    this.setOrderDisplay = this.setOrderDisplay.bind(this);
    this.clearAll = this.clearAll.bind(this);
  }
  componentDidMount(){
    menuEvent();
  }
  setFigureClass(classToSet) {
    this.setState({ figureClass: classToSet });
  }
  saveCart() {
    this.setState({ cart: this.state.balloons });
  }
  createFigure(count, type,max=30) {
    let balloons;
    let legitCount;
    let price = this.state.totalPrice;
    console.log({count});
    if (
      type === this.state.type ||
      (type === "bouquet" &&
        (this.state.type === "cascade" || this.state.type === "fontaine")) ||
      (type === "fontaine" &&
        (this.state.type === "cascade" || this.state.type === "bouquet")) ||
      (type === "cascade" &&
        (this.state.type === "bouquet" || this.state.type === "fontaine"))
    ) {
      balloons = this.state.balloons;
      legitCount = this.state.count;
    } else {
      balloons = [];
      legitCount = 0;
      price = 0;
    }
    if (count > legitCount) {
      for (let i = legitCount; i < count; i++) {
        balloons.push({ type, img: "", index: i, price: "", id: "" });
      }
    }else if(legitCount - count > 1){
      console.log('hahas')
      console.log({legitCount});
      for(let i = count;i<legitCount;i++){
        price -= balloons[i].price;
      }
      balloons.splice(count, legitCount - count);
    } else if (count < legitCount) {
      price -= balloons[count].price;
      balloons.splice(count, legitCount - count);
    } 
    if (count === 0) price = 0;
    this.setState({ type: type, balloons: balloons, count, totalPrice: price });
  }
  clearBalloonImg(index) {
    let balloons = this.state.balloons,
      shouldChange = balloons.find(item => item.index === index),
      itemIndex = balloons.indexOf(shouldChange),
      price = shouldChange.price;
    shouldChange = {
      index,
      img: "",
      price: "",
      id: "",
      type: balloons[index].type
    };
    balloons[itemIndex] = shouldChange;
    this.setState({ balloons, totalPrice: this.state.totalPrice - price });
  }
  changeBalloonImg(index, id, src, price, type) {
    let balloons = this.state.balloons,
      shouldChange = balloons.find(item => item.index === index),
      itemIndex = balloons.indexOf(shouldChange),
      addPrice = 0;
    if (shouldChange && shouldChange.img !== src) {
      shouldChange.img = src;
      shouldChange.id = id;
      shouldChange.price = price;
      shouldChange.type = type;
      addPrice = price;
    }
    balloons[itemIndex] = shouldChange;
    this.setState({ balloons, totalPrice: this.state.totalPrice + addPrice });
  }
  deleteBalloon(index) {
    let balloons = this.state.balloons,
      shouldDelete = balloons.find(item => item.index === index);
    if (balloons.length > 3) {
      this.setState({
        balloons: balloons.filter(item => item.index !== index),
        totalPrice: this.state.totalPrice - shouldDelete.price
      });
    }
  }
  copyBalloon(id, img, price, type) {
    this.setState({ copiedBalloon: { img, price, id, type } });
  }
  setOrderDisplay(){
    this.setState({orderDisplay:!this.state.orderDisplay})
  }
  orderHandle(){
  let checkIfEmptyBalloon = this.state.balloons.filter(item=>item.img==="");
  if(checkIfEmptyBalloon.length>0 || this.state.balloons.length===0){
    alert('Виберите все шарики');
    return false;
  }
  
  else{
    // this.setOrderDisplay();
    return true
  }
  }
  clearAll(){
    this.createFigure(0);
    this.setState({copiedBalloon:{ img: "", price: "", id: "" }})
  }
  render() {
    return (
      <section id="app-body" className="">
        <div className="bg-curve"></div>
        <NavBar totalPrice={this.state.totalPrice} />       
        <div className="app-main-container">
          <OrderMenu setOrderDisplay={this.setOrderDisplay} clearAll={this.clearAll} type={this.state.type} totalPrice={this.state.totalPrice} orderDisplay={this.state.orderDisplay} balloons={this.state.balloons}/>
          <DrawComponent
            figureClass={this.state.figureClass}
            clearBalloonImg={this.clearBalloonImg}
            copiedBalloon={this.state.copiedBalloon}
            copyBalloon={this.copyBalloon}
            changeBalloonImg={this.changeBalloonImg}
            deleteBalloon={this.deleteBalloon}
            balloons={this.state.balloons}
            type={this.state.type}
            orderDisplay={this.state.orderDisplay}
          />
          <Controls
          balloons={this.state.balloons}
            figureClass={this.state.figureClass}
            setFigureClass={this.setFigureClass}
            balloonsCount={this.state.balloons.length}
            totalPrice={this.state.totalPrice}
            saveCart={this.saveCart}
            createFigure={this.createFigure}
            orderHandler={this.orderHandle}
          />
        </div>
      </section>
    );
  }
}
