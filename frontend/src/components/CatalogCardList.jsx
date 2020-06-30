import React from 'react'
import CatalogCard from './CatalogCard'
import Loader from './Loader'

const CatalogCardList = ({ data, loading, error }) => {
    
    return (
        <div className='row'>
            {data.map((item) => (
                <CatalogCard key={item.id} card={item} />
            ))}
            {loading && <Loader />}
        </div>
    )
}

export default CatalogCardList
