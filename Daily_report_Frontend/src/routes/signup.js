import React from 'react'
import InputBox from '../components/InputBox';

const Signup = () => {
  return (
    <div className='w-full h-full bg-black '  >
      <div className='w-1/2 md:w-1/3 h-2/3 bg-gray-900 flex flex-col justify-center items-center ' style={{top:"50%", left:"50%" ,transform:"translate(-50%,-50%)",position:"absolute" }}>
        <InputBox text="username"/>
        <InputBox text="email"/>
        <InputBox text="password"/>
      </div>
    </div>
  )
}

export default Signup;
