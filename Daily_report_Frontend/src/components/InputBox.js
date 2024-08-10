import React from 'react'

function InputBox({text}) {
  return (
    <div className='flex p-2 space-x-4 w-1/2 justify-center items-center' >
    <label className='text-white font-semibold'>{text}:</label>
    <div className='border border-2 rounded ' > 
      <input className='focus:outline-none focus:border-4' />
    </div>
    </div>
  )
}

export default InputBox
