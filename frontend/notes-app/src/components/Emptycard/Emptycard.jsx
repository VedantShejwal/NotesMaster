import React from 'react'

const Emptycard = ({message}) => {
  return (
    <div className='item-center justify-center py-20'>
    <p className='text-xl font-medium text-slate-700 text-center leading-7 py-40'>{message}</p>
    </div>
  )
}

export default Emptycard