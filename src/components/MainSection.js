import React, { Component } from "react";
import NavBar from "./view/NavBar";
import Controls from "./view/Controls";
import DrawComponent from "./view/DrawComponent";
export default class MainSection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count:0
        };
        this.createFigure = this.createFigure.bind(this);
      }
createFigure(count){
    console.log(+count)
    this.setState({count})
}
    
  render() {
    return (
      <section id="app-body" className="grey lighten-5">
        <NavBar />
        <div className="app-main-container">
            <DrawComponent count={this.state.count}/>
             <Controls createFigure={this.createFigure}/>  
        </div>
      </section>
    );
  }
}
