import {createContext} from 'react'
function noop() {}
export const MainContext = createContext({
    balloonsImages:[],
    balloonCategories:[],
    dropdown:""

})