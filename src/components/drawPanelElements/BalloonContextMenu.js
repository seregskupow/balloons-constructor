import React,{useContext} from 'react'
import { MainContext } from '../../context/context'
export default function BalloonContextMenu() {
    const { balloonCategories } = useContext(MainContext);
    return (
        <ul class="collection">
        {balloonCategories.map(item=>(
            <li class="collection-item" type={item.type}>{item.name}</li>
        ))}
     
        
    </ul>
    )
}
