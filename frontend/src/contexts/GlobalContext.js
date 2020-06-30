import {createContext} from 'react'

const defaultState = {
    cart: {
        
    },
    search: '',
    anchors: {
        q: '',
        categoryId: '',
        offset: ''
    },
    changeAnchors: () => {},
    changeSearch: () => {}
}

const GlobalContext = createContext(defaultState)

export default GlobalContext