import React, { Component } from "react";
import NavBar from "./view/NavBar";
import { MainContext } from '../context/context'
//import Balloon from './drawPanelElements/Balloon'
import Controls from "./view/Controls";
import DrawComponent from "./view/DrawComponent";
export default class MainSection extends Component {
  static contextType = MainContext
    constructor(props) {
        super(props);
        this.state = {
            count:0,
            type:"",
            balloons:[],
            cart:[],
            copiedBalloon:{img:"",price:"",id:""},
            totalPrice:0
           
        };
        this.createFigure = this.createFigure.bind(this);
        this.deleteBalloon = this.deleteBalloon.bind(this);
        this.saveCart = this.saveCart.bind(this);
        this.changeBalloonImg = this.changeBalloonImg.bind(this);
        this.copyBalloon = this.copyBalloon.bind(this)
        this.clearBalloonImg = this.clearBalloonImg.bind(this)
      }
saveCart(){
  this.setState({cart:this.state.balloons})
}
createFigure(count,type){
  let balloons;
  let legitCount;
  if(type===this.state.type||(type==="bouquet"&&(this.state.type==="cascade"||this.state.type==="fontaine"))||(type==="fontaine"&&(this.state.type==="cascade"||this.state.type==="bouquet"))||(type==="cascade"&&(this.state.type==="bouquet"||this.state.type==="fontaine"))){
    balloons=this.state.balloons;
    legitCount = this.state.count;
  }
  else{
    balloons=[];
    legitCount=0;
  }
    if(count>legitCount){
      for(let i=legitCount;i<count;i++){
        balloons.push({type,img:"",index:i,price:"",id:""})
      }
    }
    else if(count<legitCount){
      balloons.splice(count,legitCount-count)
    }
    this.setState({type:type,balloons:balloons,count})
}
clearBalloonImg(index){
  let balloons = this.state.balloons,
  shouldChange =balloons.find(item=>item.index===index),
  itemIndex = balloons.indexOf(shouldChange),
  price = shouldChange.price;
  shouldChange={index,img:"",price:"",id:"",type: balloons[index].type};
  balloons[itemIndex] = shouldChange;
  this.setState({balloons,totalPrice:this.state.totalPrice-price})
}
changeBalloonImg(index,id,src,price,type){
let balloons = this.state.balloons,
shouldChange =balloons.find(item=>item.index===index),
itemIndex = balloons.indexOf(shouldChange);
if(shouldChange){
  shouldChange.img=src;
  shouldChange.id=id;
  shouldChange.price=price;
  shouldChange.type=type;
}
 balloons[itemIndex] = shouldChange;
 this.setState({balloons,totalPrice:this.state.totalPrice+price})

}
deleteBalloon(index){
  let balloons = this.state.balloons,
  shouldDelete =balloons.find(item=>item.index===index);
  if(balloons.length>3){  
    this.setState({balloons:balloons.filter(item=>item.index!==index),totalPrice:this.state.totalPrice-shouldDelete.price})
  }
  
}
copyBalloon(id,img,price,type){
  this.setState({copiedBalloon:{img,price,id,type}})
  console.log('cpyed',this.state.copiedBalloon)
}
  render() {
    return (
      <section id="app-body" className="grey lighten-5">
        <NavBar totalPrice={this.state.totalPrice}/>
        <div className="app-main-container">
            <DrawComponent clearBalloonImg={this.clearBalloonImg} copiedBalloon={this.state.copiedBalloon} copyBalloon={this.copyBalloon} changeBalloonImg={this.changeBalloonImg} deleteBalloon={this.deleteBalloon} balloons={this.state.balloons} type={this.state.type}/>
             <Controls  balloonsCount = {this.state.balloons.length} totalPrice={this.state.totalPrice} saveCart={this.saveCart} createFigure={this.createFigure}/>  
        </div>
      </section>
    );
  }
}
