import React from 'react'
import Round from '../drawPanelElements/Balloon'
import BalloonContextmenu from '../drawPanelElements/BalloonContextMenu'
export default function DrawComponent({count,type}) {
    console.log('rgg',count)
    return (
        <div className="draw-component-wrapper">
            <div className="plane">
                <div className={`balloons-container ${type}`}>
                    {count>0 && Array(+count).fill(<Round/>)}
                    {/* {Array(13).fill(<Round/>)} */}
                </div>
            </div>
        </div>
    )
}
