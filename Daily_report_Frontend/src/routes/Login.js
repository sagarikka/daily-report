import React from 'react'
import InputBox from '../components/InputBox';
import Button from '../components/Button';
import { makeUnAuthenticatedPostRequest } from '../utils/fetchConfig';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
function Login() {
  const [userName,setUserName]=useState("");
  const [password,setPassword]=useState("");
  const [errorMessage,setErrorMessage]=useState("");
  const [cookie,setCookie]=useCookies(["token"]);

  const userNameIP=(data)=>{
    console.log(data);
    setUserName(data);
    console.log(userName);
  }
  const passwordIP=(data)=>{
    console.log(data);
    setPassword(data);
    console.log(password);
  }
  const createUser=async()=>{
    const userData={userName,password};
    try{
    const result=await makeUnAuthenticatedPostRequest("/auth/login",userData);
    console.log(result);
    if(result.message){
      setErrorMessage(result.message);
      return false;
    }
     else{
      console.log("login successful")
      const token=result.token;
      const date=new Date();
      date.setDate(date.getDate()+30);
      setCookie("token",token,{path:'/',expires:date});
      return true;
     }
    }
    catch(error){
      console.log("error in making unauthenticated post request");
      console.log(error.message);
      return false;
    }
  }

  return (
    <div>
      <div className='w-screen h-screen bg-gray-900 '  >
      <div className=' w-4/5  md:w-1/2 lg:w-1/3 border-2 border-green-200 lg:1/3 h-2/3 bg-gray-800 flex flex-col justify-center items-center ' style={{top:"50%", left:"50%" ,transform:"translate(-50%,-50%)",position:"absolute" }} >
      {errorMessage!==""&&<div className='text-red-600 text-sm p-2  underline'>{errorMessage}</div>}
        <InputBox text="username" value={userName} setValue={userNameIP} />
        <InputBox text="password" value={password} setValue={passwordIP}/>
        <Button create={createUser} buttontext="LogIn"/>
        <div className='text-gray-400 m-2 font-semibold text-sm'>Don't have any account? <span className='text-green-500 underline hover:text-green-800 hover:font-bold cursor-pointer'><Link to="/signup">Signup</Link></span></div>
      </div>
      
    </div>
    </div>
  )
}

export default Login;
