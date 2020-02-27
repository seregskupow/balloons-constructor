import React, { Component } from 'react'
import NavBar from './view/NavBar'
import Controls from './view/Controls'
import DrawComponent from './view/DrawComponent'
export default class MainSection extends Component {
    render() {
        return (
            <section id="app-body" className="grey lighten-5">
                <NavBar/>
                <Controls/>
                <DrawComponent/>
            </section>
        )
    }
}
