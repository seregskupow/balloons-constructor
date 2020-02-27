import {createContext} from 'react'
import baloonCategories from './balloonCategories'
export const AuthContext = createContext({
    baloonsImages:[],
    baloonCategories
})