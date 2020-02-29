import React, { Component } from "react";
import NavBar from "./view/NavBar";
import Controls from "./view/Controls";
import DrawComponent from "./view/DrawComponent";
export default class MainSection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count:0,
            type:""
        };
        this.createFigure = this.createFigure.bind(this);
      }
createFigure(count,type){
  console.log(type)
    this.setState({count,type})
}
    
  render() {
    return (
      <section id="app-body" className="grey lighten-5">
        <NavBar />
        <div className="app-main-container">
            <DrawComponent count={this.state.count} type={this.state.type}/>
             <Controls createFigure={this.createFigure}/>  
        </div>
      </section>
    );
  }
}
