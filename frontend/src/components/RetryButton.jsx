import React from 'react'

const RetryButton = ({retry}) => {
    return (
        <div className='text-center col'>
          <p>Что-то пошло не так!</p>
          <button className="btn btn-outline-danger" onClick={() => retry()}>
            Повторить загрузку
          </button>
        </div>
    )
}

export default RetryButton
