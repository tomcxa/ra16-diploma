import React, { useState } from 'react'
import GlobalContext from './GlobalContext'

const GlobalProvider = ({children}) => {
    const defaultAnchors = {
        q: '',
        categoryId: '',
        offset: 0
    }

    const [search, setSearch] = useState('')

    const [ anchors, setAnchors ] = useState(defaultAnchors)

    function changeAnchors(newValue) {
        setAnchors(prev => ({...prev, ...newValue}))
    }

    function changeSearch(input) {
        setSearch(input)
    }

    return (
        <GlobalContext.Provider value={{anchors, changeAnchors, search, changeSearch}}>
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalProvider
