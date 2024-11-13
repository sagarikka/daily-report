import React from 'react'

function InputBox({text,value,setValue}) {
  console.log(value)
  return (
    <div className='flex p-2 w-4/5 space-x-4 justify-center items-center' >
    <label className='text-white text-lg font-semibold w-1/5'>{text}:</label>
    <div className='border border-2 rounded  w-3/5' > 
      <input className='focus:outline-gray-800 focus:border-4  w-full py-1' onChange={(e)=>{setValue(e.target.value)}} />
    </div>
    </div>
  )
}

export default InputBox
