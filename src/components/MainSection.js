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
            cart:[]
           
        };
        this.createFigure = this.createFigure.bind(this);
        this.deleteBalloon = this.deleteBalloon.bind(this);
        this.saveCart = this.saveCart.bind(this);
        this.changeBalloonImg = this.changeBalloonImg.bind(this);
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
        balloons.push({type,img:"",index:i})
      }
    }
    else if(count<legitCount){
      balloons.splice(count,legitCount-count)
    }
    this.setState({type:type,balloons:balloons,count})
}
changeBalloonImg(id,src){
  console.log(id)
let balloons = this.state.balloons;
 balloons[id].img=src;
 this.setState({balloons})
 console.log(this.state.balloons)
}
deleteBalloon(index){
  let balloons = this.state.balloons;
}
  render() {
    return (
      <section id="app-body" className="grey lighten-5">
        <NavBar cart={this.state.cart}/>
        <div className="app-main-container">
            <DrawComponent  changeBalloonImg={this.changeBalloonImg}BadeleteBalloon={this.deleteBalloon} balloons={this.state.balloons} type={this.state.type}/>
             <Controls  cart={this.state.cart} saveCart={this.saveCart} createFigure={this.createFigure}/>  
        </div>
      </section>
    );
  }
}
