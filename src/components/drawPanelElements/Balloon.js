import React from 'react'
import BalloonSVG from '../../data/samplesImgs/round.svg'

export default function Balloon() {
    return (
        <div className="balloon"> 
             <svg onClick={(e)=>{e.target.style.fill="blue"}} style={{maxHeight:"200px"}}id="Слой_1" data-name="Слой 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 54.5 82.46"><title>balloon2</title><ellipse cx="27.25" cy="39.25" rx="26.75" ry="38.75" fill="#f0f1f1" stroke="#797a7c" stroke-miterlimit="10"/><path d="M136.19,337.81l-5.36,2.92a.27.27,0,0,0,.13.51l10.3.22a.4.4,0,0,0,.2-.75Z" transform="translate(-108.5 -259.5)" fill="#f0f1f1" stroke="#797a7c" stroke-miterlimit="10"/></svg>
        </div>
       
        
    )
}
