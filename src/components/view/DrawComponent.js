import React from 'react'
import Round from '../drawPanelElements/Balloon'
import BalloonContextmenu from '../drawPanelElements/BalloonContextMenu'
export default function DrawComponent({count}) {
    console.log('rgg',count)
    return (
        <div className="draw-component-wrapper">
            <div className="plane">
                <div className="balloons-container bouquet">
                    {count>0 && Array(+count).fill(<Round/>)}
                    
                </div>
            </div>
        </div>
    )
}
