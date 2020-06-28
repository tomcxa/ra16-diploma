import React from 'react'
import Banner from './Banner'

const Main = ({children}) => {
    return (
        <main className="container">
      <div className="row">
        <div className="col">
          <Banner />
          {children}
        </div>
      </div>
    </main>
    )
}

export default Main
