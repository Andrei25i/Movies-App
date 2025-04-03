import React, { useEffect } from 'react'

const Loading = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  return (
    <div className='loading-container'>
        <div className='loading-spin'></div>
    </div>
  )
}

export default Loading
