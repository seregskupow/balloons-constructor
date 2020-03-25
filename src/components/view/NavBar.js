import React from 'react'

export default function NavBar() {
    return (
        <div className="navbar">
            <div className="navbar-wrapper">
                <div className="app-name"><p className="flow-text">Шарограф</p></div>
                <div className="reset"><a className="waves-effect waves-light btn">Сбросить все</a></div>
            </div>
        </div>
    )
}
