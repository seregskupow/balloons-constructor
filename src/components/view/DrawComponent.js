import React from 'react'
import Balloon from '../drawPanelElements/Balloon'
import BalloonContextmenu from '../drawPanelElements/BalloonContextMenu'
export default function DrawComponent({type,balloons,deleteBalloon}) {
    return (
        <div className="draw-component-wrapper">
            <div className="plane">
                <div className={`balloons-container ${type}`}>
                    {/* <BalloonContextmenu/> */}
                    {/* {count>0 && Array(+count).fill(<Balloon type={type}/>)} */}
                    {/* {Array(13).fill(<Round/>)} */}
                    {balloons.map(item=>(
                        <Balloon deleteBalloon = {deleteBalloon} index = {item.index} type={item.type} img={item.img}/>
                    ))}
                </div>
            </div>
        </div>
    )
}
