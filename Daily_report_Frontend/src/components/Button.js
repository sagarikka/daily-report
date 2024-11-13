import React from 'react'
import {useNavigate } from "react-router-dom";


function Button({create,buttontext}) {
  const navigate=useNavigate ();
  return (
   
    <div className='bg-green-600 py-2 px-4 flex justify-center hover:font-bold hover:bg-green-800 cursor-pointer items-center font-semibold rounded-full'
     onClick={()=>{ 
      create().then((success)=>{
        console.log(success);
        if(success){
          navigate("/");
        }
      });
     }}>
     {buttontext}</div>
  
  )
}

export default Button
